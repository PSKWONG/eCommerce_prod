/*
Order Controller 
## Aim: 

*/

/***************Import Internal Modules****************** */
const responseConstructor = require('../../modules/constructors/responseConstructor');
const dataChecker = require('./helper/dataChecker');

const orderController = {
    progressChecking: async (req, res) => {

        //Get the template for checking 
        const template = req?.body?.template ?? null;

        //Initiate response constructor 
        const response = responseConstructor();

        //******* Edge Handling - No template provided ***** */
        if (!template) {
            //Internal Log 
            console.log(`
                    Unexpected Errors: Order / Progress Checking   
                    Input: ${JSON.stringify(template, null, 2)}
                    Error: No template is provided
                    `)
            res.status(400).send();
        }

        try {

            //Progress Checking 
            const result = template.map((aspect) => {
                return req?.session?.order?.process[aspect] ?? false;
            })

            if (result) {
                response.setInfo('order', result);
                res.status(200).json(response.build());
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

    },
    dataChecking: async (req, res) => {

        //Get the data for checking 
        const { section, sectionData } = req?.body ?? {};

        //Initiate response constructor 
        const response = responseConstructor();

        
        try {

            //Initiate the checker process; 
            const isValid = await dataChecker(req, response);

            //Cehcking if session is ready for update 
            if (!req.session.order){
                req.session.order = {}; 
                req.session.order.process = {}; 
            }
            
            //Update the order session
            req.session.order.process[section] = isValid;
            

            if (isValid) {
                res.status(200).send();
                return;
            } else {

                //Internal Log 
                console.log(
                    `
                    Error in Order Data Checking / Data Checker 
                    #Input: 
                        - section: ${JSON.stringify(section, null, 2)}
                        - sectionData: ${JSON.stringify(sectionData, null, 2)}
                    #Error: Validation Fail 
                    `
                );

                res.status(400).json(response.build());
                return;
            }


        } catch (err) {

            //Internal Log 
            console.log(
                `
                    Unexpected Error in Order Data Checking / Data Checker 
                    #Input: 
                        - section: ${JSON.stringify(section, null, 2)}
                        - sectionData: ${JSON.stringify(sectionData, null, 2)}
                    #Error: ${JSON.stringify(err, null, 2)}
                    `
            );

            res.status(400).json(response.build());

            return;

        }

    },
    cancelOrder: async (req,res) =>{

        try {

            //Session Data Resetting 
            let orderData = req?.session?.order ?? null ; 

            if( orderData && typeof orderData === 'object'){
                for ( let section in orderData ){
                    orderData[section] = {}; 
                }
            }

            res.status(200).send();

        } catch (err) {
            //Internal Log
            console.log(`
                Unexpected Errors: Order / Order cancelling    
                Error: ${JSON.stringify(err, null, 2)}
                `)
            res.status(500).send();
            return;
        }

    }

};

module.exports = orderController; 