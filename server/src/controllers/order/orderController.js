/*
Order Controller 
## Aim: 

*/

/***************Import Internal Modules****************** */
const responseConstructor = require('../../modules/constructors/responseConstructor');

const orderController = {
    progressChecking: async (req, res) => {

        //Get the template for checking 
        const template = req?.body ?? null;

        //Initiate response constructor 
        const response = responseConstructor();

        //******* Edge Handling - No template provided ***** */
        if (!template) {
            res.status(400).send();
        }

        try {

            //Progress Checking 
            const result = template.map((aspect) => {
                return req?.session?.order?.process[aspect] ?? false;
            })

            if (result) {
                response.setInfo('order', result);
                return;
            } else {
                //Internal Log
                console.log(`
                    Unexpected Errors: Order / Progress Checking   
                    Input: ${JSON.stringify(template, null, 2)}
                    `)
                res.status(400).send();
                return;
            }



        } catch (err) {
            //Internal Log
            console.log(`
                Unexpected Errors: Order / Progress Checking   
                Input: ${JSON.stringify(template, null, 2)},
                Error: ${JSON.stringify(err, null, 2)}
                `)
            res.status(500).send();
            return;
        }

    }
};

module.exports = orderController; 