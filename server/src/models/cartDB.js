// Import Query function from db.js
const { dbQuery } = require('./db');

const cartDB = {

    // ---------------------- Local Strategy -----------
    create: async (user_id, product_id, quantity) => {

        try {

            const query = (
                `INSERT INTO users_carts (user_id,product_id,quantity)
                VALUES ($1,$2,$3) 
                RETURNING *`
            );

            const result = await dbQuery(query, [user_id, product_id, quantity]);

            return result.rows.length ? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in Cart DB Connection: Cart DB / Create Item in Cart  :
                - Input: 
                    * User ID: ${user_id}
                    * Product ID: ${product_id}
                    * Quantity: ${quantity}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },

    update: async (user_id, product_id, quantity) => {


        try {

            const query = (
                `UPDATE users_carts 
                 SET 
                    quantity = $3
                 WHERE
                    user_id = $1
                 AND
                    product_id = $2
                RETURNING *`
            );

            const result = await dbQuery(query, [user_id, product_id, quantity]);
            return result.rows.length ? result.rows[0] : null;

        } catch (err) {
            console.log(
                `
                Error in Cart DB Connection: Cart DB / Update Item in Cart  :
                - Input: 
                    * User ID: ${user_id}
                    * Product ID: ${product_id}
                    * Quantity: ${quantity}
                - Error : ${err}
                `
            );
            throw (err);
        }

    },

    delete: async (user_id, product_id) => {

        try {
            const query = (
                `DELETE FROM users_carts 
                 WHERE
                    user_id = $1
                 AND
                    product_id = $2
                `
            );
            const result = await dbQuery(query, [user_id, product_id]);

        } catch (err) {

            console.log(
                `
                Error in Cart DB Connection: Cart DB / Delete Item in Cart  :
                - Input: 
                    * User ID: ${user_id}
                    * Product ID: ${product_id}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },

    getItemsByUserId: async (user_id) => {

        try {

            const query = (
                `
                SELECT products.*, quantity
                FROM users_carts, products
                WHERE 
                    users_carts.product_id = products.id
                AND
                    user_id = $1
             `
            );

            const result = await dbQuery(query, [user_id]);

            return result.rows.length ? result.rows : null;

        } catch (err) {

            console.log(
                `
                Error in Cart DB Connection: Cart DB / Get Items in Cart by User ID :
                - Input: 
                    * User ID: ${user_id}
                - Error : ${err}
                `
            );

            throw (err);
        }

    },

    deleteItemsbyUserId: async (user_id) => {

        try {

            const query = (
                `
                DELETE 
                FROM users_carts
                WHERE
                    user_id = $1;
             `
            );

            const result = await dbQuery(query, [user_id]);

        } catch (err) {
            console.log(
                `
                Error in Cart DB Connection: Cart DB / Delete Items in Cart by user ID  :
                - Input: 
                    * User ID: ${user_id}
                - Error : ${err}
                `
            );
            throw (err);
        }

    }


};

module.exports = cartDB ; 