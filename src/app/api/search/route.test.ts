import { createMocks } from 'node-mocks-http';
import handler from './route';

describe('/api/search', () => {
    it('should return cards matching HP', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: { hp: '5' },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
        const data = JSON.parse(res._getData());
        expect(data.total_cards).toBeGreaterThan(0);
        expect(Array.isArray(data.data)).toBe(true);
    });

    it('should return 400 for invalid hp parameter', async () => {
        const { req, res } = createMocks({
            method: 'GET',
            query: { hp: 'invalid' },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(400);
        const data = JSON.parse(res._getData());
        expect(data.error).toBe('Invalid parameter: hp');
    });

    it('should
