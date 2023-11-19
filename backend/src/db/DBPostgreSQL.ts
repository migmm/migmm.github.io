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
}

export default DBPostgres;
