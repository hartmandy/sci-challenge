import { createMocks } from 'node-mocks-http';
import handler from './route';

describe('/api/catalog', () => {
    it('should return a list of HP options', async () => {
        const { req, res } = createMocks({
            method: 'GET',
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._

