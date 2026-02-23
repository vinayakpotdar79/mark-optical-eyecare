import Redis from 'ioredis';
import { ENV } from '../utils/env.js';

const redis = new Redis({
    password: ENV.REDIS_PASSWORD,
    host: ENV.REDIS_HOST,
    port: ENV.REDIS_PORT
});

export default redis;
