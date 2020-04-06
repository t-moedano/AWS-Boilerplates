const request = require('supertest');
const server = require('../app/server/server.js');

describe('HelloWorld', () => {

    afterAll(() => {
        server.close();
    });
    it('Should get all five posts', async() => {
        const response = await request(server)
        .get('/api/posts');
        expect(response.body).toHaveLength(6);
    });
})