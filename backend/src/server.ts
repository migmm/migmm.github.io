import express from 'express';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = 3000;
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
server.on('error', error => console.log('Error starting Express server: ' + error.message));
