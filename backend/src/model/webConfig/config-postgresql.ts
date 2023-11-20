import { QueryResult } from 'pg';
import DBPostgres from '../../db/DBPostgreSQL';
import convertSnakeCaseToCamelCase from '../../utils/convertSnakeCaseToCamelCase';

class ConfigModelPostgres {
    // CRUD - C: CREATE
    async createWebConfig(config: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows } = await client.query(
                'INSERT INTO configs(name, job_title, location, github_url, linedin_url, email, whatsapp_number, ctelegram_id, youtube_channel, logo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                [
                    config.name,
                    config.jobTitle,
                    config.location,
                    config.githubURL,
                    config.linkedinURL,
                    config.email,
                    config.whatsappNumber,
                    config.telegramId,
                    config.youtubeChannel,
                    config.logo,
                ]
            );

            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error adding config: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - R: READ
    async readWebConfigs() {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM configs');
            return rows.map(convertSnakeCaseToCamelCase);
        } catch (error: any) {
            console.error(`Error getting configs: ${error.message}`);
            return [];
        } finally {
            client.release();
        }
    }

    async readWebConfig(id: number) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM configs WHERE id = $1', [id]);
            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error getting config: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    async findByAny(field: string, value: string) {
        const client = await DBPostgres.getClient();

        try {
            const query = `SELECT * FROM configs WHERE ${field} = $1`;
            const { rows }: QueryResult = await client.query(query, [value]);

            return rows.map(convertSnakeCaseToCamelCase);
        } catch (error: any) {
            console.error(`Error finding by ${field}: ${error.message}`);
            return [];
        } finally {
            client.release();
        }
    }

    // CRUD - U: UPDATE
    async updateWebConfig(id: number, config: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query(
                'UPDATE configs(name, job_title, location, github_url, linedin_url, email, whatsapp_number, ctelegram_id, youtube_channel, logo) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                [
                    id,
                    config.name,
                    config.jobTitle,
                    config.location,
                    config.githubURL,
                    config.linkedinURL,
                    config.email,
                    config.whatsappNumber,
                    config.telegramId,
                    config.youtubeChannel,
                    config.logo,
                ]
            );

            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error updating config: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - D: DELETE
    async deleteWebConfig(id: number) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('DELETE FROM configs WHERE id = $1 RETURNING *', [id]);
            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error deleting config: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }
}

export default ConfigModelPostgres;
