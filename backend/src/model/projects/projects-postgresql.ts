import { QueryResult } from 'pg';
import DBPostgres from '../../db/DBPostgreSQL';
import convertSnakeCaseToCamelCase from '../../utils/convertSnakeCaseToCamelCase';


class ProjectModelPostgres {
    // CRUD - C: CREATE
    async createProject(project: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows } = await client.query(
                'INSERT INTO projects(project_name, project_status, git_url, url_github_repo, deploy_url, tags, cover_image, editor_html, use_from_git, header_line, category, last_update, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
                [
                    project.projecName,
                    project.projectStatus,
                    project.gitURL,
                    project.urlGithubRepo,
                    project.deployURL,
                    project.tags,
                    project.coverImage,
                    project.editorHtml,
                    project.useFromGit,
                    project.headerLine,
                    project.category,
                    project.lastUpdate,
                    project.created_at,
                    project.modified_at,
                ]
            );

            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error adding project: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - R: READ
    async readProjects() {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM projects');
            return rows.map(convertSnakeCaseToCamelCase);
        } catch (error: any) {
            console.error(`Error getting projects: ${error.message}`);
            return [];
        } finally {
            client.release();
        }
    }

    async readProject(id: number) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('SELECT * FROM projects WHERE id = $1', [id]);
            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error getting project: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    async getProjectsByTags(tags: string[]) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query(
                'SELECT * FROM projects WHERE tags @> $1',
                [tags]
            );

            return rows.map(convertSnakeCaseToCamelCase);
        } catch (error: any) {
            console.error(`Error getting projects by tags: ${error.message}`);
            return [];
        } finally {
            client.release();
        }
    }

    // CRUD - U: UPDATE
    async updateProject(id: number, project: any) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query(
                'UPDATE projects(project_name, project_status, git_url, url_github_repo, deploy_url, tags, cover_image, editor_html, use_from_git, header_line, category, last_update, created_at, modified_at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *',
                [
                    id,
                    project.projecName,
                    project.projectStatus,
                    project.gitURL,
                    project.urlGithubRepo,
                    project.deployURL,
                    project.tags,
                    project.coverImage,
                    project.editorHtml,
                    project.useFromGit,
                    project.headerLine,
                    project.category,
                    project.lastUpdate,
                    project.created_at,
                    project.modified_at,
                ]
            );

            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error updating project: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }

    // CRUD - D: DELETE
    async deleteProject(id: number) {
        const client = await DBPostgres.getClient();

        try {
            const { rows }: QueryResult = await client.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
            return convertSnakeCaseToCamelCase(rows[0]);
        } catch (error: any) {
            console.error(`Error deleting project: ${error.message}`);
            return {};
        } finally {
            client.release();
        }
    }
}

export default ProjectModelPostgres;
