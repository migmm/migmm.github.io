import express from 'express';
import config from './config';

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (_req, res) => {
    console.log('HELLO!!')
    res.send('HELLO!')
})

const PORT = config.PORT;
console.log(PORT)
const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
server.on('error', error => console.log('Error starting Express server: ' + error.message));
