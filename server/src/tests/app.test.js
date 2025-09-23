
/***************Import external Modules****************** */
const request = require('supertest');

/***************Import Internal Modules****************** */
const app = require('../app'); // App going to test 
const dbHelper = require('./helper/dbHelper');
const { usersData, cartData } = require('./data/testingData.json');


describe('Server App Testing', () => {

    //Testing Hook for User DB 
    beforeAll(async () => {
        await dbHelper.clear('users');
    })

    afterAll(async () => {
        await dbHelper.end();
    })

    describe('Local User Routine Test (Without Login)', () => {

        it('It should be able to create a new user and auto Login', async () => {

            //Expected and Input 
            const { userName, email, password } = usersData.uerInfo01

            //Trigger the routine 
            const response = await request(app)
                .post('/api/users/local/create')
                .send({ userName, email, password });

            //Assertion 
            expect(response.status).toBe(200);
            expect(response.body.path).toBe(process.env.AUTH_SUCCESS_URL);
            // Optionally check for session cookie
            expect(response.headers['set-cookie']).toBeDefined();


        })
    })

})