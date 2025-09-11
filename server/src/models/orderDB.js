/********* Import External Modules *********** */
// Import Query function from db.js
const { dbQuery } = require('./db');

const orderDB = {

    create: async (user_id, cart, delivery_date, cost) => {

        try {

            const query = (
                `
                INSERT INTO orders (
                    order_date, 
                    delivery_date,
                    user_id,
                    cart_record,
                    cost
                )
                VALUES ( NOW(), $1, $2, $3 , $4 )
                RETURNING *
                `
            );

            const result = await dbQuery(query, [delivery_date, user_id, cart, cost]);

            return result.rows.length ? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in Order DB Connection: Order DB / Create order :
                - Input: 
                    * Delivery Date: ${delivery_date}
                    * User ID: ${user_id}
                    * Cart Data : ${cart}
                    * Cost: ${cost}
                - Error : ${err}
                `
            )

            throw (err);
        }
    },

    getOrdersbyUserID: async (userId) => {
        try {

            const query = (
                `
                SELECT 
                    *
                FROM orders
                WHERE 
                    user_id = $1
                AND
                    payment_id IS NOT NULL
                `
            );

            const result = await dbQuery(query, [userId]);
            return result.rows.length ? result.rows : null;

        } catch (err) {

            console.log(
                `
                Error in Order DB Connection: Order DB / Get orders by User ID :
                - Input: 
                    * User ID: ${userId}
                - Error : ${err}
                `
            )

            throw (err);
        }
    },

    getItemsbyOrderID: async (orderID) => {
        try {

            const query = (
                `
                SELECT 
                    product*
                FROM orders_products , products
                WHERE 
                    orders_products.product_id = products.id
                AND
                    order_id = $1
                `
            );

            const result = await dbQuery(query, [orderID]);

            return result.rows.length ? result.rows : null;

        } catch (err) {

            console.log(
                `
                Error in Order DB Connection: Order DB / Get Items by order ID  :
                - Input: 
                    * Order ID: ${orderID}
                - Error : ${err}
                `
            );

            throw (err);
        }
    },

    //Checking to avoid duplicated Order
    getOrdersbyPaymentID: async (paymentId) => {
        try {

            const query = (
                `
                SELECT 
                    id
                FROM orders
                WHERE payment_id = $1
                `
            );

            const result = await dbQuery(query, [paymentId]);

            return result.rows.length ? result.rows[0] : null;

        } catch (err) {

            console.log(
                `
                Error in Order DB Connection: Order DB / Get order by Payment ID :
                - Input: 
                    * Payment ID: ${paymentId}
                - Error : ${err}
                `
            )

            throw (err);

        }

    },

    getOrdersbyClientSecret: async (client_secret) => {

        try {

            const query = (
                `
                SELECT 
                    id
                FROM orders
                WHERE client_secret = $1
                `
            );

            const result = await dbQuery(query, [client_secret]);

            return result.rows.length ? result.rows : null;

        } catch (err) {

            console.log(
                `
                Error in Order DB Connection: Order DB / Get order by Client Secret :
                - Input: 
                    * Client Secret: ${client_secret}
                - Error : ${err}
                `
            )

            throw (err);
        }
    },

    updateClientSecretbyOrderID: async (orderID, client_secret) => {
        try {

            const query = (
                `UPDATE orders
                SET
                    client_secret = $2
                WHERE 
                    id = $1
                RETURNING *
                `
            );
            const result = await dbQuery(query, [orderID, client_secret]);
            return result.rows.length ? result.rows[0] : null;
        } catch (err) {
            console.log(
                `
                Error in Order DB Connection: Order DB / update Client Secret :
                - Input: 
                    * Order ID: ${orderID}
                    * Client Secret: ${cost}
                - Error : ${err}
                `
            )

            throw (err);
        }
    },

    updatePaymentIDbyClientSecret: async (client_secret, payment_Id) => {
        try {
            const query = (
                `UPDATE orders
                SET
                    payment_id = $2
                WHERE 
                    client_secret = $1
                RETURNING *
                `
            );
            const result = await dbQuery(query, [client_secret, payment_Id]);

            return result.rows.length ? result.rows[0] : null;

        } catch (err) {
            console.log(
                `
                Error in Order DB Connection: Order DB / Update Payment ID  :
                - Input: 
                    * Payment ID: ${payment_Id}
                    * Client Secret : ${client_secret}
                - Error : ${err}
                `
            )
            throw err;
        }
    },
    moveItemsFromCartToOrder: async (orderId, userId) => {
        try {
            const query = `
                WITH cart AS(
                    SELECT 
                        product_id 
                    FROM users_carts
                    WHERE 
                        user_id = $2
                )
                INSERT INTO orders_products (order_id, product_id)
                SELECT $1, product_id
                FROM cart; 
                `
            const result = await dbQuery(query, [orderId, userId]);

            return  result.rows.length ?  result.rowCount : 0;

        } catch (err) {
            console.log(
                `
                Error in Order DB Connection: Order DB / Create order :
                - Input: 
                    * User ID: ${userId}
                    * Order ID: ${orderId}
                - Error : ${err}
                `
            );
            throw (err);
        }
    }

}

module.exports = { orderDB }