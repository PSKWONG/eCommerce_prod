
/***************Import Internal Modules****************** */
const requestValidation = require('../../../modules/validator/requestValidator');


const dataChecker = async (req, response) => {

    //Get the data for checking 
    const { section, sectionData } = req?.body ?? {};

    //Cehcking if session is ready for update 
    if (!req.session.order) {
        req.session.order = {};
        req.session.order.process = {};
    }

    try {

        switch (true) {

            case (section === 'cart'):

                //console.log(`Data input : ${JSON.stringify(req?.session?.cart?.cartList, null, 2)}`);

                const result = Object.keys(req?.session?.cart?.cartList ?? {}).length > 0;

                if (result) {
                    return true;
                } else {
                    response.setMessage(`Empty Cart Items`);
                    return false;
                }

            case (section === 'profile'):

                //check if profile section is ready 
                if (!req.session.order.profile) {
                    req.session.order.profile = {};
                }

                //Check user authentication 
                const regestedUserInfo = req?.user ?? null;

                if (regestedUserInfo) {

                    //Update session information 
                    req.session.order.profile = { user_id: regestedUserInfo.id };

                    return true;

                }



                //Check the upload information for non-registered user 

                // Run validations for each section
                const inputs = sectionData;
                const schema = requestValidation.order.users;
                const validationErrors = await requestValidation.getValidationErrors(schema, inputs);


                //## Edge Case - Validation is not passed; 
                if (validationErrors?.length > 0) {

                    validationErrors.forEach(({ msg }) => {
                        response.setMessage(msg);
                    });

                    return false;

                }

                //Update session information 
                req.session.order.profile = { ...sectionData };

                return true;

            default:
                response.setMessage(`Internal Error. Please try again later.`);
                return false;
        }


    } catch (err) {

        //Internal Log 
        console.log(
            `
            Error in Order Data Checking / Data Checker 
            #Input: 
                - section: ${JSON.stringify(section, null, 2)}
                - sectionData: ${JSON.stringify(sectionData, null, 2)}
                #Error: ${err}
            `
        );

        response.setMessage(`Internal Error. Please try again later.`);
        return false;

    }

};

module.exports = dataChecker; 