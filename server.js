require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { calculateQibla, validateCoordinates } = require('./qibla');
const { calculatePrayerTimes, getCalculationMethods, validatePrayerTimesRequest } = require('./prayer-times');
const { 
    gregorianToHijri, 
    hijriToGregorian, 
    getCurrentIslamicDate, 
    getIslamicMonths, 
    getIslamicEvents,
    validateDateRequest,
    validateHijriDate 
} = require('./islamic-calendar');
const { 
    getAllNames, 
    getNameByNumber, 
    getRandomName, 
    searchNames, 
    getNamesForDay,
    validateNameNumber 
} = require('./asma-ul-husna');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware (with Swagger-friendly CSP)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS configuration for public API access
app.use(cors({
    origin: '*', // Allow all origins for public API
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Enhanced Rate limiting to prevent abuse
// General API rate limit - generous for normal use, strict for abuse
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // 200 requests per 15 minutes (generous for legitimate use)
    message: {
        success: false,
        error: 'Rate limit exceeded',
        message: 'Too many requests from this IP, please try again later',
        retry_after: '15 minutes',
        limit_info: {
            max_requests: 200,
            window_minutes: 15,
            note: 'This API is free for everyone. Rate limits help ensure fair usage.'
        }
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Skip rate limiting for health check and docs
    skip: (req) => {
        return req.path === '/api/health' || req.path === '/api/docs';
    }
});

// Stricter rate limit specifically for calculations (Qibla, Prayer times)
const calculationLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // 30 calculations per minute (prevents rapid-fire abuse)
    message: {
        success: false,
        error: 'Calculation rate limit exceeded',
        message: 'Too many calculations. Please wait before making more requests.',
        retry_after: '1 minute',
        limit_info: {
            max_requests: 30,
            window_minutes: 1,
            tip: 'For bulk calculations, consider implementing client-side caching or contact us for higher limits.'
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Very strict rate limit for potential abuse patterns
const strictLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1000, // 1000 requests per hour (catches serious abuse)
    message: {
        success: false,
        error: 'Hourly rate limit exceeded',
        message: 'Your IP has exceeded the hourly rate limit. This suggests automated usage.',
        retry_after: '1 hour',
        contact: 'If you need higher limits for legitimate use, please contact the API maintainers',
        limit_info: {
            max_requests: 1000,
            window_minutes: 60
        }
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Abuse detection middleware
const abuseDetection = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    const userAgent = req.headers['user-agent'] || 'Unknown';
    
    // Detect potential abuse patterns
    const suspiciousPatterns = [
        userAgent.toLowerCase().includes('bot'),
        userAgent.toLowerCase().includes('crawler'),
        userAgent.toLowerCase().includes('spider'),
        userAgent.toLowerCase().includes('scraper'),
        !userAgent.includes('Mozilla') && req.path.includes('/api/')
    ];
    
    if (suspiciousPatterns.some(pattern => pattern)) {
        console.log(`🚨 Suspicious activity detected - IP: ${ip}, User-Agent: ${userAgent}, Path: ${req.path}`);
    }
    
    // Check for rapid sequential requests (potential automation)
    const now = Date.now();
    if (!req.app.locals.requestTimes) req.app.locals.requestTimes = {};
    if (!req.app.locals.requestTimes[ip]) req.app.locals.requestTimes[ip] = [];
    
    const ipRequests = req.app.locals.requestTimes[ip];
    // Keep only requests from last 10 seconds
    req.app.locals.requestTimes[ip] = ipRequests.filter(time => now - time < 10000);
    req.app.locals.requestTimes[ip].push(now);
    
    // If more than 10 requests in 10 seconds from same IP, log it
    if (req.app.locals.requestTimes[ip].length > 10) {
        console.log(`⚠️  Rapid requests detected - IP: ${ip} made ${req.app.locals.requestTimes[ip].length} requests in 10 seconds`);
    }
    
    next();
};

// Apply rate limiting middleware
app.use('/api', abuseDetection); // Detect abuse patterns
app.use('/api', strictLimiter); // Applied first - catches serious abuse
app.use('/api', generalLimiter); // General limit for all API endpoints
app.use('/api/qibla', calculationLimiter); // Specific limit for Qibla calculations
app.use('/api/prayer-times', calculationLimiter); // Specific limit for Prayer time calculations

// Middleware
app.use(express.json({ limit: '10mb' })); // Prevent huge payloads

// Request logging middleware (for monitoring abuse patterns)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${ip}`);
    
    // Log suspicious patterns
    if (req.path.includes('/api/')) {
        const userAgent = req.headers['user-agent'] || 'Unknown';
        // Log if it looks like automated requests
        if (!userAgent.includes('Mozilla') && !userAgent.includes('curl')) {
            console.log(`⚠️  Potential automated request - User-Agent: ${userAgent}`);
        }
    }
    
    next();
});

// Serve static files (for test.html)
app.use(express.static(__dirname));

// Swagger UI setup
const swaggerOptions = {
    customCss: `
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info .title { color: #2c5530; }
        .swagger-ui .scheme-container { background: #f8f9fa; padding: 20px; border-radius: 5px; }
        .swagger-ui .btn.authorize { background-color: #4a7c59; border-color: #4a7c59; }
        .swagger-ui .btn.execute { background-color: #4a7c59; border-color: #4a7c59; }
    `,
    customSiteTitle: 'Islamic Services API Documentation',
    customfavIcon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NSIgZmlsbD0iIzRhN2M1OSIvPjx0ZXh0IHg9IjUwIiB5PSI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJBcmlhbCI+QVBJPC90ZXh0Pjwvc3ZnPg==',
    swaggerOptions: {
        persistAuthorization: false,
        displayRequestDuration: true,
        docExpansion: 'list',
        filter: true,
        showExtensions: true,
        showCommonExtensions: true,
    }
};

// Swagger documentation routes
app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', swaggerUi.setup(swaggerSpec, swaggerOptions));

// Alternative documentation routes
app.get('/docs', (req, res) => res.redirect('/api/docs'));
app.get('/swagger', (req, res) => res.redirect('/api/docs'));

// Swagger JSON spec endpoint
app.get('/api/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Islamic Services API',
        description: 'Comprehensive free Islamic services for the global Muslim ummah',
        sadaqah_jariah: 'May Allah accept this service for the benefit of the ummah',
        services: {
            qibla: 'Find prayer direction to Mecca from anywhere',
            prayer_times: 'Accurate prayer times for any location',
            islamic_calendar: 'Hijri date conversions and Islamic events', 
            asma_ul_husna: '99 Beautiful Names of Allah with meanings',
            general: 'Various Islamic utilities and information'
        },
        endpoints: {
            qibla: '/api/qibla?lat={latitude}&lng={longitude}',
            prayer_times: '/api/prayer-times?lat={latitude}&lng={longitude}&date={YYYY-MM-DD}',
            hijri_date: '/api/hijri-date?date={YYYY-MM-DD}',
            asma_ul_husna: '/api/asma-ul-husna',
            health: '/api/health',
            interactive_docs: '/api/docs (Swagger UI)',
            limits: '/api/limits'
        },
        rate_limits: {
            general: '200 requests per 15 minutes',
            calculations: '30 calculations per minute',
            protection: '1000 requests per hour'
        },
        github: 'https://github.com/yourusername/islamic-services-api',
        version: '2.0.0'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '2.0.0',
        services: ['qibla', 'prayer-times', 'islamic-calendar', 'asma-ul-husna']
    });
});

// Rate limit status endpoint
app.get('/api/limits', (req, res) => {
    res.json({
        success: true,
        rate_limits: {
            general_api: {
                max_requests: 200,
                window_minutes: 15,
                description: 'General API usage limit'
            },
            calculations: {
                max_requests: 30,
                window_minutes: 1,
                description: 'Qibla and Prayer time calculation specific limit'
            },
            hourly_protection: {
                max_requests: 1000,
                window_minutes: 60,
                description: 'Hourly abuse protection limit'
            }
        },
        note: 'Rate limits are applied per IP address',
        fair_use: 'This is a free sadaqah jariah service. Please use responsibly.',
        current_ip: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']
    });
});

// 🧭 QIBLA DIRECTION ENDPOINT
app.get('/api/qibla', (req, res) => {
    try {
        const { lat, lng, latitude, longitude } = req.query;
        const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
        
        // Support both lat/lng and latitude/longitude parameter names
        const userLat = lat || latitude;
        const userLng = lng || longitude;
        
        // Check if parameters are provided
        if (!userLat || !userLng) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
                message: 'Please provide both latitude and longitude',
                example: '/api/qibla?lat=40.7128&lng=-74.0060',
                required_params: {
                    lat: 'Latitude (-90 to 90)',
                    lng: 'Longitude (-180 to 180)'
                }
            });
        }
        
        // Convert to numbers
        const parsedLat = parseFloat(userLat);
        const parsedLng = parseFloat(userLng);
        
        // Validate coordinates
        const validation = validateCoordinates(parsedLat, parsedLng);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Invalid coordinates',
                message: validation.error,
                provided: {
                    latitude: userLat,
                    longitude: userLng
                }
            });
        }
        
        // Calculate Qibla direction
        const qiblaData = calculateQibla(parsedLat, parsedLng);
        
        res.json({
            success: true,
            service: 'qibla',
            data: qiblaData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah',
                usage: 'Free for everyone'
            }
        });
        
    } catch (error) {
        console.error('Error calculating Qibla:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to calculate Qibla direction'
        });
    }
});

// 🕌 PRAYER TIMES ENDPOINT
app.get('/api/prayer-times', (req, res) => {
    try {
        const { lat, lng, latitude, longitude, date, method, madhab } = req.query;
        
        // Support both lat/lng and latitude/longitude parameter names
        const userLat = lat || latitude;
        const userLng = lng || longitude;
        
        // Check if parameters are provided
        if (!userLat || !userLng) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
                message: 'Please provide both latitude and longitude',
                example: '/api/prayer-times?lat=40.7128&lng=-74.0060&date=2025-09-19',
                required_params: {
                    lat: 'Latitude (-90 to 90)',
                    lng: 'Longitude (-180 to 180)'
                },
                optional_params: {
                    date: 'Date in YYYY-MM-DD format (defaults to today)',
                    method: 'Calculation method (defaults to MuslimWorldLeague)',
                    madhab: 'Islamic jurisprudence school: "Hanafi" or "Shafi" (defaults to Shafi)'
                }
            });
        }
        
        // Convert to numbers
        const parsedLat = parseFloat(userLat);
        const parsedLng = parseFloat(userLng);
        
        // Validate request
        const validation = validatePrayerTimesRequest(parsedLat, parsedLng, date, method, madhab);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Invalid parameters',
                message: validation.error,
                available_methods: Object.keys(getCalculationMethods())
            });
        }
        
        // Calculate prayer times
        const prayerData = calculatePrayerTimes(parsedLat, parsedLng, date, method, madhab);
        
        res.json({
            success: true,
            service: 'prayer-times',
            data: prayerData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah',
                usage: 'Free for everyone'
            }
        });
        
    } catch (error) {
        console.error('Error calculating prayer times:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to calculate prayer times'
        });
    }
});

// Get available prayer time calculation methods
app.get('/api/prayer-methods', (req, res) => {
    try {
        const methods = getCalculationMethods();
        
        res.json({
            success: true,
            service: 'prayer-methods',
            data: {
                methods: methods,
                default_method: 'MuslimWorldLeague',
                usage: 'Add ?method=MethodName to /api/prayer-times endpoint'
            },
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Error getting prayer methods:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get prayer methods'
        });
    }
});

// 📅 ISLAMIC CALENDAR ENDPOINTS

// Convert Gregorian to Hijri date
app.get('/api/hijri-date', (req, res) => {
    try {
        const { date } = req.query;
        
        // Use today if no date provided
        const targetDate = date || new Date().toISOString().split('T')[0];
        
        // Validate date
        const validation = validateDateRequest(targetDate);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Invalid date',
                message: validation.error,
                example: '/api/hijri-date?date=2025-09-19'
            });
        }
        
        // Convert date
        const hijriData = gregorianToHijri(targetDate);
        
        res.json({
            success: true,
            service: 'hijri-date',
            data: hijriData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error converting to Hijri date:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to convert to Hijri date'
        });
    }
});

// Convert Hijri to Gregorian date
app.get('/api/gregorian-date', (req, res) => {
    try {
        const { year, month, day } = req.query;
        
        if (!year || !month || !day) {
            return res.status(400).json({
                success: false,
                error: 'Missing required parameters',
                message: 'Please provide Hijri year, month, and day',
                example: '/api/gregorian-date?year=1447&month=3&day=15',
                required_params: {
                    year: 'Hijri year (e.g., 1447)',
                    month: 'Hijri month (1-12)',
                    day: 'Hijri day (1-30)'
                }
            });
        }
        
        const hijriYear = parseInt(year);
        const hijriMonth = parseInt(month);
        const hijriDay = parseInt(day);
        
        // Validate Hijri date
        const validation = validateHijriDate(hijriYear, hijriMonth, hijriDay);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Invalid Hijri date',
                message: validation.error
            });
        }
        
        // Convert date
        const gregorianData = hijriToGregorian(hijriYear, hijriMonth, hijriDay);
        
        res.json({
            success: true,
            service: 'gregorian-date',
            data: gregorianData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error converting to Gregorian date:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to convert to Gregorian date'
        });
    }
});

// Get current Islamic date
app.get('/api/today-hijri', (req, res) => {
    try {
        const todayHijri = getCurrentIslamicDate();
        
        res.json({
            success: true,
            service: 'today-hijri',
            data: todayHijri,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error getting current Islamic date:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get current Islamic date'
        });
    }
});

// Get Islamic months information
app.get('/api/islamic-months', (req, res) => {
    try {
        const monthsData = getIslamicMonths();
        
        res.json({
            success: true,
            service: 'islamic-months',
            data: monthsData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error getting Islamic months:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get Islamic months'
        });
    }
});

// Get Islamic events
app.get('/api/islamic-events', (req, res) => {
    try {
        const eventsData = getIslamicEvents();
        
        res.json({
            success: true,
            service: 'islamic-events',
            data: eventsData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error getting Islamic events:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get Islamic events'
        });
    }
});

// 📿 ASMA UL HUSNA ENDPOINTS

// Get all 99 names of Allah
app.get('/api/asma-ul-husna', (req, res) => {
    try {
        const namesData = getAllNames();
        
        res.json({
            success: true,
            service: 'asma-ul-husna',
            data: namesData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error getting Asma ul Husna:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get Asma ul Husna'
        });
    }
});

// Get specific name by number
app.get('/api/asma-ul-husna/:number', (req, res) => {
    try {
        const { number } = req.params;
        
        // Validate number
        const validation = validateNameNumber(number);
        if (!validation.isValid) {
            return res.status(400).json({
                success: false,
                error: 'Invalid name number',
                message: validation.error,
                example: '/api/asma-ul-husna/1'
            });
        }
        
        const nameData = getNameByNumber(validation.number);
        
        res.json({
            success: true,
            service: 'asma-ul-husna-specific',
            data: nameData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error getting specific name:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get specific name'
        });
    }
});

// Get random name
app.get('/api/asma-ul-husna/random', (req, res) => {
    try {
        const randomNameData = getRandomName();
        
        res.json({
            success: true,
            service: 'asma-ul-husna-random',
            data: randomNameData,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error getting random name:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get random name'
        });
    }
});

// Search names
app.get('/api/asma-ul-husna/search', (req, res) => {
    try {
        const { q, query } = req.query;
        const searchQuery = q || query;
        
        if (!searchQuery) {
            return res.status(400).json({
                success: false,
                error: 'Missing search query',
                message: 'Please provide a search query',
                example: '/api/asma-ul-husna/search?q=merciful',
                parameter: 'q or query - search term'
            });
        }
        
        const searchResults = searchNames(searchQuery);
        
        res.json({
            success: true,
            service: 'asma-ul-husna-search',
            data: searchResults,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error searching names:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to search names'
        });
    }
});

// Get names for daily recitation
app.get('/api/asma-ul-husna/daily/:day', (req, res) => {
    try {
        const { day } = req.params;
        const dayNumber = parseInt(day);
        
        if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 7) {
            return res.status(400).json({
                success: false,
                error: 'Invalid day',
                message: 'Day must be between 1 and 7 (1=Monday, 7=Sunday)',
                example: '/api/asma-ul-husna/daily/1'
            });
        }
        
        const dailyNames = getNamesForDay(dayNumber);
        
        res.json({
            success: true,
            service: 'asma-ul-husna-daily',
            data: dailyNames,
            timestamp: new Date().toISOString(),
            api_info: {
                sadaqah_jariah: 'This API is provided as sadaqah jariah for the Muslim ummah'
            }
        });
        
    } catch (error) {
        console.error('Error getting daily names:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
            message: 'Failed to get daily names'
        });
    }
});

// Legacy JSON documentation endpoint (redirects to Swagger)
app.get('/api/docs/json', (req, res) => {
    res.json({
        title: 'Islamic Services API Documentation',
        version: '2.0.0',
        description: 'Comprehensive free Islamic services API for the global Muslim ummah',
        interactive_docs: `${req.protocol}://${req.get('host')}/api/docs`,
        swagger_json: `${req.protocol}://${req.get('host')}/api/swagger.json`,
        message: 'For interactive documentation, visit /api/docs',
        sadaqah_jariah: 'This API is provided as continuous charity for the Muslim ummah'
    });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        message: 'The requested endpoint does not exist',
        available_services: [
            'Qibla Direction: /api/qibla',
            'Prayer Times: /api/prayer-times',
            'Islamic Calendar: /api/hijri-date',
            '99 Names of Allah: /api/asma-ul-husna',
            'API Documentation: /api/docs'
        ]
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error('Unhandled error:', error);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong'
    });
});

// Export the app for Vercel's serverless runtime
module.exports = app;

// Only start a listener in local/dev (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🕋 Islamic Services API Server running on http://localhost:${PORT}`);
    console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
    console.log(`📚 Interactive Docs (Swagger): http://localhost:${PORT}/api/docs`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔧 Test Interface: http://localhost:${PORT}/test.html`);
    console.log(`\n🌟 Available Services:`);
    console.log(`   🧭 Qibla Direction: /api/qibla`);
    console.log(`   🕌 Prayer Times: /api/prayer-times`);
    console.log(`   📅 Islamic Calendar: /api/hijri-date`);
    console.log(`   📿 99 Names of Allah: /api/asma-ul-husna`);
    console.log(`\n🤲 Sadaqah Jariah - May Allah accept this service for the ummah`);
    console.log(`\n───────────────────────────────────────────────────────────────`);
  });
}
