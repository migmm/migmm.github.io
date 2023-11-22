CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    projec_name VARCHAR(255),
    project_status VARCHAR(255),
    show_in_land_page BOOLEAN,
    git_url VARCHAR(255),
    url_github_repo VARCHAR(255),
    deploy_url VARCHAR(255),
    tags VARCHAR(255),
    cover_image VARCHAR(255),
    editor_html VARCHAR(255),
    use_from_git BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);