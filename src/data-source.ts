import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'user',
    password: 'password',
    database: 'db',
    entities: ['dist/entities/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
});