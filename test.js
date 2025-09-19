const request = require('supertest');
const app = require('./server');

describe('Qibla API Tests', () => {
    
    // Test health endpoint
    describe('GET /api/health', () => {
        it('should return healthy status', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.status).toBe('healthy');
            expect(response.body.version).toBe('1.0.0');
        });
    });

    // Test Qibla calculation endpoint
    describe('GET /api/qibla', () => {
        it('should calculate Qibla direction for New York', async () => {
            const response = await request(app)
                .get('/api/qibla?lat=40.7128&lng=-74.0060')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.data).toHaveProperty('qibla_direction');
            expect(response.body.data).toHaveProperty('compass_bearing');
            expect(response.body.data).toHaveProperty('distance_km');
            expect(response.body.data.location.latitude).toBe(40.7128);
            expect(response.body.data.location.longitude).toBe(-74.0060);
        });

        it('should calculate Qibla direction for London', async () => {
            const response = await request(app)
                .get('/api/qibla?lat=51.5074&lng=-0.1278')
                .expect(200);
            
            expect(response.body.success).toBe(true);
            expect(response.body.data.qibla_direction).toBeGreaterThan(0);
            expect(response.body.data.qibla_direction).toBeLessThan(360);
        });

        it('should handle missing parameters', async () => {
            const response = await request(app)
                .get('/api/qibla')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Missing required parameters');
        });

        it('should handle invalid latitude', async () => {
            const response = await request(app)
                .get('/api/qibla?lat=100&lng=-74.0060')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Invalid coordinates');
        });

        it('should handle invalid longitude', async () => {
            const response = await request(app)
                .get('/api/qibla?lat=40.7128&lng=200')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Invalid coordinates');
        });

        it('should handle non-numeric coordinates', async () => {
            const response = await request(app)
                .get('/api/qibla?lat=abc&lng=def')
                .expect(400);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Invalid coordinates');
        });
    });

    // Test documentation endpoint
    describe('GET /api/docs', () => {
        it('should return API documentation', async () => {
            const response = await request(app)
                .get('/api/docs')
                .expect(200);
            
            expect(response.body.title).toBe('Qibla Direction API Documentation');
            expect(response.body.version).toBe('1.0.0');
            expect(response.body.endpoints).toHaveProperty('qibla');
        });
    });

    // Test 404 handling
    describe('GET /nonexistent', () => {
        it('should return 404 for undefined routes', async () => {
            const response = await request(app)
                .get('/nonexistent')
                .expect(404);
            
            expect(response.body.success).toBe(false);
            expect(response.body.error).toBe('Endpoint not found');
        });
    });
});