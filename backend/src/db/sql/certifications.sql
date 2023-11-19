CREATE TABLE certifications (
    id SERIAL PRIMARY KEY,
    course_title VARCHAR(255),
    description VARCHAR(255),
    vendor VARCHAR(255),
    issue_date DATE,
    url_check VARCHAR(255),
    course_image VARCHAR(255)[],
    type VARCHAR(255),
    storage VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);