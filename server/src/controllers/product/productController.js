/*
Product Controller 
## Aim: 
Handle information for actions related to Product databse
- Update product category
- Get Product list according to the product category 
*/

/***************Import Internal Modules****************** */
const productDB = require('../../models/productDB');
const requestValidation = require('../../modules/validator/requestValidator');
const responseConstructor = require('../../modules/constructors/responseConstructor');

const productController = {

    filteredByCategoryID: async (req, res) => {

        // Construct Response Object
        const response = responseConstructor();

        // Run validations for each inputs
        // The default category ID is 2 
        const inputs = req?.body;
        const schema = requestValidation.products.listing;
        const validationErrors = await requestValidation.getValidationErrors(schema, inputs);


        if (validationErrors?.length > 0) {

            validationErrors.forEach(({ msg }) => {
                response.setMessage(msg);
            })

            //Return the reponse with status code and response objects 
            console.log(`
                Validation Errors: Product / Update Category ID  
                Input: ${JSON.stringify(inputs, null, 2)},
                Error: ${JSON.stringify(validationErrors, null, 2)}
                `);
            res.status(400).json(response.build());
            return;
        }

        //Update the category ID 
        //Destructuring the request body
        const { categoryId } = inputs;
        req.products = { categoryId: categoryId || 2 };

        res.status(204).send();

        return;

    },

    getProductListbyCategoryID: async (req, res, next) => {

        // Construct Response Object
        const response = responseConstructor();

        // Get the category ID from request object 
        const catID = req?.products?.categoryId ?? 2;

        

        try {

            //Start get product List 
            const result = await productDB.findByCategory(catID);

            //Checking
            console.log(
                `
                Input : ${catID}
                Result : ${result}
                `
            )

            // Construct Response Object
            response.setInfo('products', result);
            res.status(200).json(response.build());
            return;



        } catch (err) {

            //Internal Log 
            console.log(`
                Error in controller: Product / Get Product List by Category ID  
                Input: ${catID},
                Error: ${err}
                `);
            next(err);
            return;
        }

    }


}

module.exports = productController; 