import dotEnvExtended from 'dotenv-extended';
dotEnvExtended.load();


//Log directory
export const LOGS_DIRECTORY = 'logs';

//Time zone to log in log file
export const TIME_ZONE = parseInt(process.env.TIME_ZONE || '-4');

process.env.PERSISTENCE_TYPE