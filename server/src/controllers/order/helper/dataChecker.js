


const dataChecker = (req, response) => {

    //Get the data for checking 
    const { section, sectionData } = req?.body ?? {};

    try {

        switch (true) {

            case (section === 'cart'):

                console.log(`Data input : ${JSON.stringify(req?.session?.cart?.cartList, null, 2)}`);

                const result = Object.keys(req?.session?.cart?.cartList ?? {}).length > 0;

                if (result) {
                    return true;
                } else {
                    response.setMessage(`Empty Cart Items`);
                    return false;
                }

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