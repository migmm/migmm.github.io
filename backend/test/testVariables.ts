import dotEnvExtended from 'dotenv-extended';

dotEnvExtended.load();

const testVariables = {
    USERNAME_ADMIN: process.env.TEST_USERNAME_ADMIN,
    PASSWORD_ADMIN: process.env.TEST_PASSWORD_ADMIN,
    JWT_TOKEN: process.env.JWT_TOKEN,
};

export default testVariables;
