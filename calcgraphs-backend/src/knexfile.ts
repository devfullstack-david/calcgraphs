import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config()

const config: { [key: string]: Knex.Config } = {
    development: {
        client: "mssql",
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            options: {
                encrypt: false,
                trustServerCertificate: true,
                enableArithAbort: true
            }
        },
        migrations: {
            tableName: "knex_migrations",
            directory: "./src/database/migrations"
        },
        seeds: {
            directory: "./src/database/seeds"
        }
    }
};

export default config;