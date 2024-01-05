# MIGUEDEV
## React, Node,JS, Express, MongoDB, PostgreSQL, AWS, Typescript.

 <img src="https://github.com/migmm/migmm.github.io/blob/main/frontend/public/logo512.png" alt="Logo"/>


### Personal web project using React, Node,JS, Express, MongoDB, PostgreSQL, AWS.

### Technologies Used

In the frontend, React was employed alongside Styled Components using TypeScript.

In the backend, NodeJS was utilized with Express, Mongoose, Pg, and both MongoDB and PostgreSQL.

### Features

- Possibility to monitoring project deploys in order to know when a project is down.

- The ability to choose, through the .env file, the database to store information is provided MongoDB or PostgreSQL and also can be modified to work with other databases.

- Users can also choose where to store objects, with options including disk, AWS, or database.

### Testing

Testing is included in both the frontend and the backend, each with its respective command:

    npm run test

Jest was used for the frontend, and Mocha with Chai for the backend.

The NYC library is also included for test coverage, displaying everything automatically after the test is conducted.

### .env Files

There is a .env file for each stage:

    .env.development for running it in local development mode
    .env.production for production
    .env.test for running tests

Each .env file can be configured with the necessary parameters for each stage, allowing more flexibility when performing different actions.

### Security

Regarding security, roles and session cookies with a configurable expiration time are implemented.

### Running the Project

Firstly, install the dependencies for both the frontend and the backend:

    npm install

Then, to run the project locally, execute the following commands:
In the Frontend

    npm run start

In the Backend

    npm run dev

### Deploy

For deployment, the project is configured to build in Full stack.

Create a folder, in the same location as the frontend and backend, named dist. Inside that folder, create another one called public. Then, first, execute the backend build with:

    npm run build

Afterwards, run the frontend build with:

    npm run build

The order is set up to ensure that backend files are saved in the dist folder and frontend files are stored in the public folder.