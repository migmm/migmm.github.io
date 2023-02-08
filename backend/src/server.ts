import express from 'express';
import config from './config';
import routerProjects from './router/projects';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/projects', routerProjects);

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
server.on('error', error => console.log('Error starting Express server: ' + error.message));
