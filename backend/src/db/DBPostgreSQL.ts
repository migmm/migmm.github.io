import * as fs from 'fs';
import * as path from 'path';
import { Pool, PoolClient } from 'pg';


class DBPostgres {
    private static pool: Pool;

    private static async init() {
        if (!DBPostgres.pool) {
            DBPostgres.pool = new Pool({
                connectionString: process.env.POSTGRES_STRING,
            });
        }
    }

    static async getClient(): Promise<PoolClient> {
        await DBPostgres.init();
        const client = await DBPostgres.pool.connect();
        return client;
    }

    static async createTablesIfNotExist() {
        const client = await DBPostgres.getClient();

        try {
            await client.query('BEGIN');

            const sqlFolderPath = path.join(__dirname, 'sql');

            const files = fs.readdirSync(sqlFolderPath).filter(file => file.endsWith('.sql'));

            for (const file of files) {
                const filePath = path.join(sqlFolderPath, file);
                const query = fs.readFileSync(filePath, 'utf-8');
                await client.query(query);
            }

            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async initializeDatabase() {
        try {
            await DBPostgres.createTablesIfNotExist();
            console.log('Tables created successfully.');
        } catch (error) {
            console.error('Error creating tables:', error);
        }
    }
}

DBPostgres.initializeDatabase();

export default DBPostgres;
