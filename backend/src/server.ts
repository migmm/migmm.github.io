import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import corsOptions from './config/cors';
import config from './config/server';

import routerProjects from './router/projects';
import routerCertifications from './router/certifications';
import routerUsers from './router/users';
import routerAuth from './router/auth';
import routerforgotPassword from './router/forgotPassword';
import routerResetPassword from './router/resetPassword';
import routerFavourite from './router/favorites';
import routerImages from './router/aws';
import routerWebConfig from './router/webConfig';
import routerContact from './router/contact';
import checkWebsOnline from './utils/cron';

import path from 'path';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

checkWebsOnline();

const buildPath = path.join(__dirname, 'public');
/* const buildPath = path.join(__dirname, 'public'); */

app.use(express.static(buildPath));


app.get('/', function (_req, res) {
    res.sendFile(path.join(buildPath, 'index.html'));
}); 

app.use('/api/projects', routerProjects);
app.use('/api/certifications', routerCertifications);

app.use('/api/users', routerUsers);
app.use('/api/auth', routerAuth);

app.use('/api/auth/forgotpassword', routerforgotPassword);
app.use('/api/auth/resetpassword', routerResetPassword);

app.use('/api/addfavourite', routerFavourite);
app.use('/api/removefavourite', routerFavourite);

app.use('/api/images', routerImages);

app.use('/api/webconfig', routerWebConfig);

app.use('/api/contact', routerContact);


// in case of using another route
app.all('*', (_req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
server.on('error', (error) => console.log('Error starting Express server: ' + error.message));


export default { server } ;
