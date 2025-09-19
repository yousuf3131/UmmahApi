const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Islamic Services API',
      version: '2.0.0',
      description: `
# Islamic Services API

A comprehensive, free REST API providing essential Islamic services for the global Muslim ummah.

## Services Available

### Qibla Direction
Calculate the prayer direction towards the Kaaba in Mecca from any location on Earth using precise spherical trigonometry.

### Prayer Times
Get accurate prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any location with multiple calculation methods supported.

### Islamic Calendar
Convert between Gregorian and Hijri dates, get current Islamic date, and access Islamic months and events information.

### 99 Names of Allah (Asma ul Husna)
Access the beautiful names of Allah with Arabic text, transliteration, meanings, and daily recitation suggestions.

## Features

- **Global coverage** - works worldwide
- **Real-time calculations** with high accuracy
- **Smart rate limiting** to ensure fair usage
- **Mobile-friendly** JSON responses
- **Completely free** for everyone
- **Multiple calculation methods** for prayer times
- **Comprehensive Islamic data** 

## Islamic Accuracy

- **Kaaba Coordinates**: 21.4225°N, 39.8262°E (Masjid al-Haram, Mecca)
- **Prayer Time Methods**: 11+ calculation methods (MuslimWorldLeague, Egyptian, Karachi, ISNA, etc.)
- **Calendar System**: Accurate Hijri calendar conversions using moment-hijri
- **Qibla Calculation**: Great circle bearing using spherical trigonometry

## Fair Usage & Rate Limits

Rate limits ensure fair access:
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
        url: 'https://your-api-domain.com',
        description: 'Production server',
      },
    ],
    tags: [
      {
        name: 'Qibla',
        description: 'Calculate prayer direction towards Mecca',
      },
      {
        name: 'Prayer Times',
        description: 'Get accurate prayer times for any location',
      },
      {
        name: 'Islamic Calendar',
        description: 'Hijri calendar conversions and Islamic dates',
      },
      {
        name: 'Asma ul Husna',
        description: '99 Beautiful Names of Allah',
      },
      {
        name: 'Health',
        description: 'API health and status monitoring',
      },
      {
        name: 'Information',
        description: 'API documentation and rate limit information',
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
                  example: 58.48,
                  description: 'Bearing in degrees (0-360°) where 0° is North',
                },
                compass_bearing: {
                  type: 'string',
                  example: 'ENE',
                  description: 'Compass direction',
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
                  description: 'Distance to Kaaba in kilometers',
                },
              },
            },
            timestamp: { type: 'string' },
            api_info: { type: 'object' },
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
                numeral_system: { type: 'string', example: 'english', description: 'Numeral system used: english (0-9) or arabic (٠-٩)' },
                prayer_times: {
                  type: 'object',
                  properties: {
                    fajr: { type: 'string', example: '05:30', description: 'Fajr prayer time (format depends on numeral_system)' },
                    sunrise: { type: 'string', example: '06:45', description: 'Sunrise time' },
                    dhuhr: { type: 'string', example: '12:30', description: 'Dhuhr prayer time' },
                    asr: { type: 'string', example: '15:45', description: 'Asr prayer time' },
                    maghrib: { type: 'string', example: '18:15', description: 'Maghrib prayer time' },
                    isha: { type: 'string', example: '19:30', description: 'Isha prayer time' },
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
                    },
                  },
                },
              },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
        HealthResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            status: { type: 'string', example: 'healthy' },
            timestamp: { type: 'string' },
            uptime: { type: 'number' },
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
      '/': {
        get: {
          tags: ['Information'],
          summary: 'API root information',
          description: 'Get general information about the Islamic Services API and available endpoints.',
          responses: {
            200: {
              description: 'API information',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: { type: 'string' },
                      description: { type: 'string' },
                      services: { type: 'object' },
                      endpoints: { type: 'object' },
                      version: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/qibla': {
        get: {
          tags: ['Qibla'],
          summary: 'Calculate Qibla direction',
          description: 'Calculate the prayer direction (Qibla) towards the Kaaba in Mecca from any location using precise spherical trigonometry.',
          parameters: [
            {
              name: 'lat',
              in: 'query',
              required: true,
              schema: { type: 'number', minimum: -90, maximum: 90 },
              description: 'Latitude of your location (-90 to 90)',
              example: 40.7128,
            },
            {
              name: 'lng',
              in: 'query',
              required: true,
              schema: { type: 'number', minimum: -180, maximum: 180 },
              description: 'Longitude of your location (-180 to 180)',
              example: -74.0060,
            },
          ],
          responses: {
            200: {
              description: 'Successful Qibla calculation',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/QiblaResponse' },
                },
              },
            },
            400: {
              description: 'Invalid parameters',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/prayer-times': {
        get: {
          tags: ['Prayer Times'],
          summary: 'Get prayer times',
          description: 'Calculate accurate prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any location with multiple calculation methods.',
          parameters: [
            {
              name: 'lat',
              in: 'query',
              required: true,
              schema: { type: 'number', minimum: -90, maximum: 90 },
              description: 'Latitude of your location',
              example: 40.7128,
            },
            {
              name: 'lng',
              in: 'query',
              required: true,
              schema: { type: 'number', minimum: -180, maximum: 180 },
              description: 'Longitude of your location',
              example: -74.0060,
            },
            {
              name: 'date',
              in: 'query',
              required: false,
              schema: { type: 'string', format: 'date' },
              description: 'Date in YYYY-MM-DD format (defaults to today)',
              example: '2025-09-19',
            },
            {
              name: 'method',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                enum: ['MuslimWorldLeague', 'Egyptian', 'Karachi', 'UmmAlQura', 'Dubai', 'MoonsightingCommittee', 'NorthAmerica', 'ISNA', 'Kuwait', 'Qatar', 'Singapore'],
              },
              description: 'Calculation method (defaults to MuslimWorldLeague)',
              example: 'MuslimWorldLeague',
            },
            {
              name: 'numerals',
              in: 'query',
              required: false,
              schema: {
                type: 'string',
                enum: ['english', 'arabic'],
              },
              description: 'Numeral system: "english" for 0-9 or "arabic" for ٠-٩ (defaults to english)',
              example: 'english',
            },
          ],
          responses: {
            200: {
              description: 'Successful prayer times calculation',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/PrayerTimesResponse' },
                },
              },
            },
          },
        },
      },
      '/api/prayer-methods': {
        get: {
          tags: ['Prayer Times'],
          summary: 'Get available calculation methods',
          description: 'Get list of available prayer time calculation methods with descriptions.',
          responses: {
            200: {
              description: 'List of calculation methods',
            },
          },
        },
      },
      '/api/hijri-date': {
        get: {
          tags: ['Islamic Calendar'],
          summary: 'Convert Gregorian to Hijri date',
          description: 'Convert a Gregorian date to Islamic (Hijri) calendar date with Islamic events.',
          parameters: [
            {
              name: 'date',
              in: 'query',
              required: false,
              schema: { type: 'string', format: 'date' },
              description: 'Gregorian date in YYYY-MM-DD format (defaults to today)',
              example: '2025-09-19',
            },
          ],
          responses: {
            200: {
              description: 'Successful date conversion',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/HijriDateResponse' },
                },
              },
            },
          },
        },
      },
      '/api/gregorian-date': {
        get: {
          tags: ['Islamic Calendar'],
          summary: 'Convert Hijri to Gregorian date',
          description: 'Convert an Islamic (Hijri) calendar date to Gregorian date.',
          parameters: [
            {
              name: 'year',
              in: 'query',
              required: true,
              schema: { type: 'integer', minimum: 1 },
              description: 'Hijri year',
              example: 1447,
            },
            {
              name: 'month',
              in: 'query',
              required: true,
              schema: { type: 'integer', minimum: 1, maximum: 12 },
              description: 'Hijri month (1-12)',
              example: 3,
            },
            {
              name: 'day',
              in: 'query',
              required: true,
              schema: { type: 'integer', minimum: 1, maximum: 30 },
              description: 'Hijri day (1-30)',
              example: 15,
            },
          ],
          responses: {
            200: {
              description: 'Successful date conversion',
            },
          },
        },
      },
      '/api/today-hijri': {
        get: {
          tags: ['Islamic Calendar'],
          summary: 'Get current Islamic date',
          description: 'Get today\'s date in the Islamic (Hijri) calendar.',
          responses: {
            200: {
              description: 'Current Islamic date',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/HijriDateResponse' },
                },
              },
            },
          },
        },
      },
      '/api/islamic-months': {
        get: {
          tags: ['Islamic Calendar'],
          summary: 'Get Islamic months information',
          description: 'Get information about all 12 Islamic months with names and significance.',
          responses: {
            200: {
              description: 'Islamic months information',
            },
          },
        },
      },
      '/api/islamic-events': {
        get: {
          tags: ['Islamic Calendar'],
          summary: 'Get Islamic events',
          description: 'Get information about major Islamic events and observances.',
          responses: {
            200: {
              description: 'Islamic events information',
            },
          },
        },
      },
      '/api/asma-ul-husna': {
        get: {
          tags: ['Asma ul Husna'],
          summary: 'Get all 99 Names of Allah',
          description: 'Get all 99 beautiful names of Allah (Asma ul Husna) with Arabic text, transliteration, and meanings.',
          responses: {
            200: {
              description: 'All 99 names of Allah',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/AsmaUlHusnaResponse' },
                },
              },
            },
          },
        },
      },
      '/api/asma-ul-husna/{number}': {
        get: {
          tags: ['Asma ul Husna'],
          summary: 'Get specific name by number',
          description: 'Get a specific name of Allah by its number (1-99).',
          parameters: [
            {
              name: 'number',
              in: 'path',
              required: true,
              schema: { type: 'integer', minimum: 1, maximum: 99 },
              description: 'Name number (1-99)',
              example: 1,
            },
          ],
          responses: {
            200: {
              description: 'Specific name of Allah',
            },
          },
        },
      },
      '/api/asma-ul-husna/random': {
        get: {
          tags: ['Asma ul Husna'],
          summary: 'Get random name',
          description: 'Get a random name of Allah for daily reflection.',
          responses: {
            200: {
              description: 'Random name of Allah',
            },
          },
        },
      },
      '/api/asma-ul-husna/search': {
        get: {
          tags: ['Asma ul Husna'],
          summary: 'Search names',
          description: 'Search names of Allah by meaning or transliteration.',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: true,
              schema: { type: 'string' },
              description: 'Search query',
              example: 'merciful',
            },
          ],
          responses: {
            200: {
              description: 'Search results',
            },
          },
        },
      },
      '/api/asma-ul-husna/daily/{day}': {
        get: {
          tags: ['Asma ul Husna'],
          summary: 'Get names for daily recitation',
          description: 'Get names of Allah recommended for specific days of the week.',
          parameters: [
            {
              name: 'day',
              in: 'path',
              required: true,
              schema: { type: 'integer', minimum: 1, maximum: 7 },
              description: 'Day of week (1=Monday, 7=Sunday)',
              example: 1,
            },
          ],
          responses: {
            200: {
              description: 'Names for daily recitation',
            },
          },
        },
      },
      '/api/health': {
        get: {
          tags: ['Health'],
          summary: 'API health check',
          description: 'Check the health status of the API and all services.',
          responses: {
            200: {
              description: 'API is healthy',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/HealthResponse' },
                },
              },
            },
          },
        },
      },
      '/api/limits': {
        get: {
          tags: ['Information'],
          summary: 'Get rate limit information',
          description: 'Get information about current rate limits and usage policies.',
          responses: {
            200: {
              description: 'Rate limit information',
            },
          },
        },
      },
    },
  },
  apis: ['./server.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;