const request = require('supertest');
const app = require('./app');
describe('API Tests', () => {
    test('GET / should return welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toContain('CI/CD Pipeline');
    });
    test('GET /health should return healthy status', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('healthy');
    });
    test('GET /api/users should return users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
    test('POST /api/users should create user', async () => {
        const user = { name: 'Test User', email: 'test@example.com' };
        const response = await request(app)
            .post('/api/users')
            .send(user);
        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe(user.name);
        expect(response.body.email).toBe(user.email);
    });
    test('POST /api/users should validate required fields', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ name: 'Test User' });
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Name and email are required');
    });
});


