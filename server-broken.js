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

// Stricter rate limit specifically for Qibla calculations
const qiblaLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // 30 Qibla calculations per minute (prevents rapid-fire abuse)
    message: {
        success: false,
        error: 'Qibla calculation rate limit exceeded',
        message: 'Too many Qibla calculations. Please wait before making more requests.',
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
        !userAgent.includes('Mozilla') && req.path.includes('/api/qibla')
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
app.use('/api/qibla', qiblaLimiter); // Specific limit for Qibla calculations

// Middleware
app.use(express.json({ limit: '10mb' })); // Prevent huge payloads

// Request logging middleware (for monitoring abuse patterns)
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${ip}`);
    
    // Log suspicious patterns
    if (req.path.includes('/api/qibla')) {
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
    customSiteTitle: 'Qibla API Documentation 🕋',
    customfavIcon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🕋</text></svg>',
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
        message: 'Qibla Direction API 🕋',
        description: 'Free public API for calculating prayer direction towards Mecca',
        sadaqah_jariah: 'May Allah accept this service for the benefit of the ummah',
        endpoints: {
            qibla: '/api/qibla?lat={latitude}&lng={longitude}',
            health: '/api/health',
            interactive_docs: '/api/docs (Swagger UI)',
            limits: '/api/limits',
            swagger_json: '/api/swagger.json'
        },
        rate_limits: {
            general: '200 requests per 15 minutes',
            qibla: '30 calculations per minute',
            protection: '1000 requests per hour'
        },
        github: 'https://github.com/yourusername/qibla-api',
        version: '1.0.0'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
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
            qibla_calculations: {
                max_requests: 30,
                window_minutes: 1,
                description: 'Qibla calculation specific limit'
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

// Main Qibla calculation endpoint
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

// Legacy JSON documentation endpoint (redirects to Swagger)
app.get('/api/docs/json', (req, res) => {
    res.json({
        title: 'Qibla Direction API Documentation',
        version: '1.0.0',
        description: 'Free public API for calculating the direction to Kaaba (Qibla) from any location on Earth',
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
        available_endpoints: [
            '/api/qibla?lat={lat}&lng={lng}',
            '/api/health',
            '/api/docs',
            '/'
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

// Start server
app.listen(PORT, () => {
    console.log(`\n🕋 Qibla API Server running on port ${PORT}`);
    console.log(`📍 API Base URL: http://localhost:${PORT}/api`);
    console.log(`📚 Interactive Docs (Swagger): http://localhost:${PORT}/api/docs`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🔧 Test Interface: http://localhost:${PORT}/test.html`);
    console.log(`\n🤲 Sadaqah Jariah - May Allah accept this service for the ummah`);
    console.log(`\nExample usage:`);
    console.log(`curl "http://localhost:${PORT}/api/qibla?lat=40.7128&lng=-74.0060"`);
    console.log(`\n───────────────────────────────────────────────────────────────`);
});

module.exports = app;