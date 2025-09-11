/********* Import Internal Modules *********** */
const { dbQuery } = require('./db');

const userDB = {

    // ---------------------- Local Strategy -----------
    create: async (username, email, password, islocal) => {

        const query = (
            `INSERT INTO users (user_name, email, password, islocal)
            VALUES ($1,$2,$3,$4)
            RETURNING *`
        );
        const input = [username, email, password, islocal];

        try {

            const result = await dbQuery(query, input);
            return result.rows.length ? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in User DB Connection: User DB / Create :
                - Input: 
                    * UserName: ${username}
                    * Email: ${email}
                    * Password: ${password}
                    * isLocal: ${islocal}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },

    findByEmail: async (email) => {

        const query = (
            `SELECT *
            FROM users
            WHERE email=$1`
        );
        const input = [email];


        try {
            const result = await dbQuery(query, input);

            return result.rows.length ? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in User DB Connection: User DB / Find By Email :
                - Input: 
                    * Email: ${email}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },

    findById: async (id) => {

        const query = (
            `SELECT *
            FROM users
            WHERE id=$1`
        );
        const input = [id];


        try {

            const result = await dbQuery(query, input);

            return result.rows.length ? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in User DB Connection: User DB / Find By ID :
                - Input: 
                    * User ID: ${id}
                - Error : ${err}
                `
            );

            throw (err);
        }
    },

    updateUserInfo: async (id, email, username, password, islocal) => {

        const query = (
            `UPDATE users
            SET 
                email=$2,
                user_name=$3, 
                password=$4,
                islocal=$5
            WHERE 
                id=$1
            RETURNING *`

        );
        const input = [id, email, username, password, islocal];


        try {

            const result = await dbQuery(query, input);

            return result.rows.length ? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in User DB Connection: User DB / Update User Info :
                - Input: 
                    * User ID: ${id}
                    * UserName: ${username}
                    * Email: ${email}
                    * Password: ${password}
                    * isLocal: ${islocal}
                - Error : ${err}
                `
            );

            throw (err);
        }
    },

    delete: async (id) => {

        const query = (
            `DELETE FROM users
            WHERE id=$1`
        );

        const input = [id];

        try {

            await dbQuery(query, input);

        } catch (err) {

            console.log(
                `
                Error in User DB Connection: User DB / Delete :
                - Input: 
                    * User ID: ${id}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },

    // ---------------------- 3rd Party Strategy -----------
    findProviderID: async (provider) => {

        try {

            const query = (
                `SELECT *
                FROM providers
                WHERE 
                    provider=$1 
                `
            );

            const result = await dbQuery(query, [provider]);

            return result.rows.length? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in User DB Connection: User DB / Find Provider ID :
                - Input: 
                    * Provider's Name: ${provider}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },


    findByProfileID: async (providerID, profileID) => {
        try {

            const query =
                `SELECT *
                FROM linked_accounts
                WHERE 
                    provider_id=$1 
                    AND
                    profile_id=$2`;

            const result = await dbQuery(query, [providerID, profileID]);

            return result.rows.length? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in User DB Connection: User DB / Find By Profile ID :
                - Input: 
                    * Provider ID: ${providerID}
                    * Profile ID: ${profileID}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },

    createUserByProvider: async (user_id, provider_id, profile_id, data, access_token, refresh_token) => {
        try {
            const query =
                `INSERT INTO linked_accounts (user_id, provider_id, profile_id , profile_data ,  access_token, refresh_token  )
                VALUES ($1,$2, $3, $4, $5, $6)
                RETURNING *`;

            const result = await dbQuery(query, [user_id, provider_id, profile_id, data, access_token, refresh_token]);

            return result.rows[0];

        } catch (err) {
            console.log(
                `
                Error in User DB Connection: User DB / Create User by Provider  :
                - Input: 
                    * User ID: ${user_id}
                    * Provider ID: ${provider_id}
                    * Profile ID: ${profile_id}
                    * Profile Data: ${data}
                    * Access Token: ${access_token}
                    * Refresh Token: ${refresh_token}
                - Error : ${err}
                `
            );

            throw (err);

        }

    },

    updateUserByProvider: async (user_id, provider_id, profile_id, data, access_token, refresh_token) => {
        try {
            const query =
                `UPDATE  linked_accounts 
                SET 
                    user_id = $1,
                    profile_data = $4,
                    access_token = $5,
                    refresh_token = $6
                WHERE
                    provider_id = $2
                    AND
                    profile_id = $3
                RETURNING *`;

            const result = await dbQuery(query, [user_id, provider_id, profile_id, data, access_token, refresh_token]);

            return result.rows[0];

        } catch (err) {
            console.log(
                `
                Error in User DB Connection: User DB / Update User by Provider  :
                - Input: 
                    * User ID: ${user_id}
                    * Provider ID: ${provider_id}
                    * Profile ID: ${profile_id}
                    * Profile Data: ${data}
                    * Access Token: ${access_token}
                    * Refresh Token: ${refresh_token}
                - Error : ${err}
                `
            );

            throw (err);

        }

    }
};

module.exports =  userDB ; 