import { QueryResult } from 'pg';
import DBPostgres from '../../db/DBPostgreSQL';
import convertSnakeCaseToCamelCase from '../../utils/convertSnakeCaseToCamelCase';


class UserModelPostgres {
    // CRUD - C: CREATE
    async createUser(user: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows } = await client.query(
                'INSERT INTO users(username, password, email, role, status, projects, certifications, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                [
                    user.username,
                    user.password,
                    user.email,
                    user.role,
                    user.status,
                    user.projects,
                    user.certifications,
                    user.created_at,
                    user.modified_at,
                ]
            );

            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error adding user: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - R: READ
    async readUsers() {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM users');
            return rows.map(convertSnakeCaseToCamelCase);
        } catch (error: any) {
            console.error(`Error getting users: ${error.message}`);
            return [];
        } finally {
            client.release();
        }
    }

    async readUser(id: string) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM users WHERE id = $1', [id]);
            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error getting user: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - U: UPDATE
    async updateUser(id: string, user: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query(
                'UPDATE users(username, password, email, role, status, projects, certifications, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
                [
                    id,
                    user.username,
                    user.password,
                    user.email,
                    user.role,
                    user.status,
                    user.projects,
                    user.certifications,
                    user.created_at,
                    user.modified_at,
                ]
            );

            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error updating user: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - D: DELETE
    async deleteUser(id: string) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error deleting user: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }
}

export default UserModelPostgres;
