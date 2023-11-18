// certification-model-postgres.ts

import { QueryResult } from 'pg';
import DBPostgres from '../../db/DBPostgreSQL';


class CertificationModelPostgres {
    // CRUD - C: CREATE
    async createCertification(certification: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows } = await client.query(
                'INSERT INTO certifications(courseTitle, description, vendor, issueDate, urlCheck, courseImage, created_at, modified_at, type, storage) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
                [
                    certification.courseTitle,
                    certification.description,
                    certification.vendor,
                    certification.issueDate,
                    certification.urlCheck,
                    certification.courseImage,
                    certification.created_at,
                    certification.modified_at,
                    certification.type,
                    certification.storage,
                ]
            );

            return rows[0];
        } catch (error: any) {
            console.error(`Error adding certification: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - R: READ
    async readCertifications() {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM certifications');
            return rows;
        } catch (error: any) {
            console.error(`Error getting certifications: ${error.message}`);
            return [];
        } finally {
            client.release();
        }
    }

    async readCertification(id: string) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM certifications WHERE id = $1', [id]);
            return rows[0];
        } catch (error: any) {
            console.error(`Error getting certification: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - U: UPDATE
    async updateCertification(id: string, certification: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query(
                'UPDATE certifications SET courseTitle=$2, description=$3, vendor=$4, issueDate=$5, urlCheck=$6, courseImage=$7, created_at=$8, modified_at=$9, type=$10, storage=$11 WHERE id=$1 RETURNING *',
                [
                    id,
                    certification.courseTitle,
                    certification.description,
                    certification.vendor,
                    certification.issueDate,
                    certification.urlCheck,
                    certification.courseImage,
                    certification.created_at,
                    certification.modified_at,
                    certification.type,
                    certification.storage,
                ]
            );

            return rows[0];
        } catch (error: any) {
            console.error(`Error updating certification: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - D: DELETE
    async deleteCertification(id: string) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('DELETE FROM certifications WHERE id = $1 RETURNING *', [id]);
            return rows[0];
        } catch (error: any) {
            console.error(`Error deleting certificationo: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }
}

export default CertificationModelPostgres;
