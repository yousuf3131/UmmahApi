const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Islamic Services API',
      version: '2.0.0',
      description: `
# Islamic Services API 🕋

A comprehensive, free REST API providing essential Islamic services for the global Muslim ummah.

## Sadaqah Jariah Project

This API is created as **sadaqah jariah** - a continuous charity that benefits the Muslim community worldwide by providing accurate Islamic services and calculations.

## Services Available

### 🧭 Qibla Direction
Calculate the prayer direction towards the Kaaba in Mecca from any location on Earth using precise spherical trigonometry.

### 🕌 Prayer Times
Get accurate prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any location with multiple calculation methods supported.

### 📅 Islamic Calendar
Convert between Gregorian and Hijri dates, get current Islamic date, and access Islamic months and events information.

### 📿 99 Names of Allah (Asma ul Husna)
Access the beautiful names of Allah with Arabic text, transliteration, meanings, and daily recitation suggestions.

## Features

- 🌍 **Global coverage** - works worldwide
- ⚡ **Real-time calculations** with high accuracy
- 🔒 **Smart rate limiting** to ensure fair usage
- 📱 **Mobile-friendly** JSON responses
- 🆓 **Completely free** for everyone
- � **Multiple calculation methods** for prayer times
- 📊 **Comprehensive Islamic data** 

## Islamic Accuracy

- **Kaaba Coordinates**: 21.4225°N, 39.8262°E (Masjid al-Haram, Mecca)
- **Prayer Time Methods**: 10+ calculation methods (MuslimWorldLeague, Egyptian, Karachi, etc.)
- **Calendar System**: Accurate Hijri calendar conversions using moment-hijri
- **Qibla Calculation**: Great circle bearing using spherical trigonometry

## Fair Usage & Rate Limits

This API is provided as sadaqah jariah. Rate limits ensure fair access:
- **General API**: 200 requests per 15 minutes
- **Calculations**: 30 calculations per minute
- **Hourly Protection**: 1000 requests per hour

Please use responsibly, cache results when possible, and make dua for the developers and all Muslims.

**May Allah accept this service and benefit the entire ummah. Ameen.**
      `,
      contact: {
        name: 'Islamic Services API Support',
        url: 'https://github.com/yourusername/islamic-services-api',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://ummahapi.com',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Qibla',
        description: '🧭 Calculate prayer direction towards Mecca',
      },
      {
        name: 'Prayer Times',
        description: '🕌 Get accurate prayer times for any location',
      },
      {
        name: 'Islamic Calendar',
        description: '📅 Hijri calendar conversions and Islamic dates',
      },
      {
        name: 'Asma ul Husna',
        description: '📿 99 Beautiful Names of Allah',
      },
      {
        name: 'Health',
        description: '🩺 API health and status monitoring',
      },
      {
        name: 'Information',
        description: '📋 API documentation and rate limit information',
      },
    ],
    components: {
      schemas: {
        QiblaResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            service: { type: 'string', example: 'qibla' },
            data: {
              type: 'object',
              properties: {
                qibla_direction: {
                  type: 'number',
                  format: 'float',
                  minimum: 0,
                  maximum: 360,
                  example: 58.48,
                  description: 'Bearing in degrees (0-360°) where 0° is North',
                },
                compass_bearing: {
                  type: 'string',
                  example: 'ENE',
                  description: 'Compass direction (N, NE, ENE, E, ESE, SE, SSE, S, SSW, SW, WSW, W, WNW, NW, NNW)',
                },
                location: {
                  type: 'object',
                  properties: {
                    latitude: { type: 'number', example: 40.7128 },
                    longitude: { type: 'number', example: -74.0060 },
                  },
                },
                kaaba_coordinates: {
                  type: 'object',
                  properties: {
                    latitude: { type: 'number', example: 21.4225 },
                    longitude: { type: 'number', example: 39.8262 },
                  },
                },
                distance_km: {
                  type: 'number',
                  example: 9534.12,
                  description: 'Great circle distance to Kaaba in kilometers',
                },
              },
            },
            timestamp: { type: 'string', format: 'date-time' },
            api_info: {
              type: 'object',
              properties: {
                sadaqah_jariah: { type: 'string' },
                usage: { type: 'string' },
              },
            },
          },
        },
        PrayerTimesResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            service: { type: 'string', example: 'prayer-times' },
            data: {
              type: 'object',
              properties: {
                date: { type: 'string', example: '2025-09-19' },
                location: {
                  type: 'object',
                  properties: {
                    latitude: { type: 'number', example: 40.7128 },
                    longitude: { type: 'number', example: -74.0060 },
                  },
                },
                calculation_method: { type: 'string', example: 'MuslimWorldLeague' },
                prayer_times: {
                  type: 'object',
                  properties: {
                    fajr: { type: 'string', example: '05:30' },
                    sunrise: { type: 'string', example: '06:45' },
                    dhuhr: { type: 'string', example: '12:30' },
                    asr: { type: 'string', example: '15:45' },
                    maghrib: { type: 'string', example: '18:15' },
                    isha: { type: 'string', example: '19:30' },
                  },
                },
                next_prayer: {
                  type: 'object',
                  properties: {
                    name: { type: 'string', example: 'Maghrib' },
                    time: { type: 'string', example: '18:15' },
                    remaining_minutes: { type: 'number', example: 45 },
                  },
                },
              },
            },
          },
        },
        HijriDateResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            service: { type: 'string', example: 'hijri-date' },
            data: {
              type: 'object',
              properties: {
                gregorian_date: { type: 'string', example: '2025-09-19' },
                hijri_date: {
                  type: 'object',
                  properties: {
                    year: { type: 'number', example: 1447 },
                    month: { type: 'number', example: 3 },
                    day: { type: 'number', example: 15 },
                    month_name: { type: 'string', example: 'Rabi\' al-awwal' },
                    formatted: { type: 'string', example: '15 Rabi\' al-awwal 1447' },
                  },
                },
                day_of_week: { type: 'string', example: 'Friday' },
                islamic_events: {
                  type: 'array',
                  items: { type: 'string' },
                  example: ['Mawlid al-Nabi (Prophet\'s Birthday)'],
                },
              },
            },
          },
        },
        AsmaUlHusnaResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            service: { type: 'string', example: 'asma-ul-husna' },
            data: {
              type: 'object',
              properties: {
                total_names: { type: 'number', example: 99 },
                names: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      number: { type: 'number', example: 1 },
                      arabic: { type: 'string', example: 'الرَّحْمَـنُ' },
                      transliteration: { type: 'string', example: 'Ar-Rahman' },
                      english_meaning: { type: 'string', example: 'The Most Gracious' },
                      detailed_meaning: { type: 'string', example: 'The One who has plenty of mercy for the believers and the blasphemers in this world and especially for the believers in the hereafter.' },
                    },
                  },
                },
              },
            },
          },
        },
        SingleNameResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            service: { type: 'string', example: 'asma-ul-husna-specific' },
            data: {
              type: 'object',
              properties: {
                number: { type: 'number', example: 1 },
                arabic: { type: 'string', example: 'الرَّحْمَـنُ' },
                transliteration: { type: 'string', example: 'Ar-Rahman' },
                english_meaning: { type: 'string', example: 'The Most Gracious' },
                detailed_meaning: { type: 'string' },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Invalid coordinates' },
            message: { type: 'string', example: 'Latitude must be between -90 and 90 degrees' },
          },
        },
        HealthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            status: { type: 'string', example: 'healthy' },
            timestamp: { type: 'string', format: 'date-time' },
            uptime: { type: 'number', example: 3600.45 },
            version: { type: 'string', example: '2.0.0' },
            services: {
              type: 'array',
              items: { type: 'string' },
              example: ['qibla', 'prayer-times', 'islamic-calendar', 'asma-ul-husna'],
            },
          },
        },
      },
    },
    paths: {
      '/api/qibla': {
        get: {
          tags: ['Qibla'],
          summary: 'Calculate Qibla direction',
          description: `
Calculate the prayer direction (Qibla) towards the Kaaba in Mecca from your coordinates.

**Example locations to try:**
- New York: lat=40.7128, lng=-74.0060
- London: lat=51.5074, lng=-0.1278  
- Jakarta: lat=-6.2088, lng=106.8456
- Dubai: lat=25.2048, lng=55.2708
- Tokyo: lat=35.6762, lng=139.6503

**Rate Limits:**
- 30 calculations per minute
- 200 general API requests per 15 minutes
          `,
          parameters: [
            {
              name: 'lat',
              in: 'query',
              required: true,
              schema: {
                type: 'number',
                format: 'float',
                minimum: -90,
                maximum: 90,
                example: 40.7128,
              },
              description: 'Latitude of your location (-90 to 90 degrees)',
            },
            {
              name: 'lng',
              in: 'query',
              required: true,
              schema: {
                type: 'number',
                format: 'float',
                minimum: -180,
                maximum: 180,
                example: -74.0060,
              },
              description: 'Longitude of your location (-180 to 180 degrees)',
            },
            {
              name: 'latitude',
              in: 'query',
              required: false,
              schema: {
                type: 'number',
                format: 'float',
                minimum: -90,
                maximum: 90,
              },
              description: 'Alternative parameter name for latitude',
            },
            {
              name: 'longitude',
              in: 'query',
              required: false,
              schema: {
                type: 'number',
                format: 'float',
                minimum: -180,
                maximum: 180,
              },
              description: 'Alternative parameter name for longitude',
            },
          ],
          responses: {
            200: {
              description: 'Successful Qibla calculation',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/QiblaResponse',
                  },
                },
              },
            },
            400: {
              description: 'Bad request - invalid or missing parameters',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            429: {
              description: 'Rate limit exceeded',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RateLimitResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/health': {
        get: {
          tags: ['Health'],
          summary: 'Health check',
          description: 'Check the API service status and uptime',
          responses: {
            200: {
              description: 'API is healthy',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/HealthResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/limits': {
        get: {
          tags: ['Information'],
          summary: 'Rate limit information',
          description: 'Get current rate limit configuration and your IP address',
          responses: {
            200: {
              description: 'Rate limit information',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: {
                        type: 'boolean',
                        example: true,
                      },
                      rate_limits: {
                        type: 'object',
                        properties: {
                          general_api: {
                            type: 'object',
                            properties: {
                              max_requests: { type: 'number', example: 200 },
                              window_minutes: { type: 'number', example: 15 },
                              description: { type: 'string', example: 'General API usage limit' },
                            },
                          },
                          qibla_calculations: {
                            type: 'object',
                            properties: {
                              max_requests: { type: 'number', example: 30 },
                              window_minutes: { type: 'number', example: 1 },
                              description: { type: 'string', example: 'Qibla calculation specific limit' },
                            },
                          },
                        },
                      },
                      current_ip: {
                        type: 'string',
                        example: '127.0.0.1',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [], // We're defining everything inline above
};

const specs = swaggerJsdoc(options);

module.exports = specs;