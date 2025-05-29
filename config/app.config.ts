import { env } from "process";

export default () => ({
    env: env.NODE_ENV || 'development',
    databae: {
        host: env.DB_HOST || 'localhost',
        port: parseInt(env.DB_PORT, 10) || 5432,
    },
});
