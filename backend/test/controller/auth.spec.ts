import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import serverObj from '../../src/server';
import testVariables from '../testVariables';

chai.use(chaiHttp);
const expect = chai.expect;

before(async function () {
    serverObj.server;
});

let authToken: any;

describe('Authentication Controller Test', () => {
    describe('POST /login', () => {
        it('Should authenticate user and return access token or throw login limiter error', (done) => {
            chai.request(serverObj.server)
                .post('/api/auth')
                .send({ username: testVariables.USERNAME_ADMIN, password: testVariables.PASSWORD_ADMIN })
                .end((_err, res) => {
                    if (res.status === 201) {
                        expect(res).to.have.status(201);
                        expect(res.body).to.have.property('accessToken');
                        expect(res.body.accessToken).to.be.a('string');
                        authToken = res.body.accessToken;
                        console.log(authToken);
                    } else {
                        expect(res).to.have.status(429);
                        expect(res.body).to.have.property('error', 'Too many login attemps, wait 10 min and tray again.');
                    }
                    done();
                });
        });

        it('Should not authenticate user and return error message', (done) => {
            chai.request(serverObj.server)
                .post('/api/auth')
                .send({ username: testVariables.USERNAME_ADMIN, password: 'testtesttest' })
                .end((_err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message', 'Unauthorized');
                    done();
                });
        });
    });

    describe('POST /logout', () => {
        it('Should clear the jwt cookie on logout', (done) => {
            chai.request(serverObj.server)
                .post('/api/auth/logout')
                .end((_err, res) => {
                    expect(res).to.have.status(204);
                    expect(res).to.not.have.cookie('jwt');
                    done();
                });
        });
    });

    describe('Protected Route for Admin', () => {
        it('Should allow access to a protected route for an admin user', (done) => {

            chai.request(serverObj.server)
                .get('/api/auth/test')
                .set('Cookie', `jwt=${testVariables.JWT_TOKEN}`)
                .end((_err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    after(() => {
        if (serverObj.server.listening) {
            serverObj.server.close((err) => {
                if (err) {
                    console.error('Error closing server:', err);
                    process.exit(1);
                } else {
                    console.log('Server closed successfully.');
                    process.exit(0);
                }
            });
        } else {
            console.log('Server is not running. Nothing to close.');
            process.exit(0);
        }
    });
});
