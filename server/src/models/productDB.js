/********* Import Internal Modules *********** */
// Import Query function from db.js
const { dbQuery } = require('./db');

const productDB = {

    // ---------------------- Local Strategy -----------
    findByCategory: async (id) => {

        try {

            const query = (
                `SELECT products.* 
                FROM products, products_categories 
                WHERE products_categories.product_id = products.id 
                    AND 
                (categories_id = $1 OR $1 IS NULL) 
                ORDER BY product_name ASC`

            );

            const input = [id];

            const result = await dbQuery(query, input);

            return result.rows.length ? result.rows : null;

        } catch (err) {

            console.log(
                `
                Error in Product DB Connection: Product DB / Find Products by catergories  :
                - Input: 
                    * Categories ID: ${id}
                - Error : ${err}
                `
            );

            throw (err);

        }

    },
    findById: async (id) => {

        const query = (
            `SELECT * 
            FROM products 
            WHERE id = $1 `
        )

        try {
            const result = await dbQuery(query, [id]);
            return result.rows.length ? result.rows[0] : null;

        } catch (err) {
            console.log(
                `
                Error in Product DB Connection: Product DB / Find Product by Item ID :
                - Input: 
                    * Item ID: ${id}
                - Error : ${err}
                `
            )

            throw (err); 

        }


    }

};

module.exports = productDB ; 