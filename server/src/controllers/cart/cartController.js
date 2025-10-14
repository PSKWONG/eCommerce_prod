/*
Controller fro cart server functions 
- Cart Sync between server and frontend
*/


/***************Import Internal Modules****************** */
const cartDB = require('../../models/cartDB');
const cartHelper = require('../cart/cartHelper');
const responseConstructor = require('../../modules/constructors/responseConstructor');



const cartController = {

    sessionSync: async (req, res, next) => {
        /*
        Data Sync is a middleware for
        - Choose data ( Cart List ) between frontend and session data 
        #Logic 
        - Get uploaded local cartlist from frontend
        - Get session data from server 
        - Choose data from both source 
            * save data to session 
        */

        /*************** Local Data ****************** */
        const localData = req?.body?.data ?? null;

        /*************** Server Data ****************** */
        const remoteData = req?.session?.cart ?? null

        /*************** Update Data ****************** */
        if (!localData && !remoteData) {

            //###### Edge Case --- Both sources are not avaliable (new customer)
            req.session.cart = null;
            next();

        } else {
            const localVersion = localData?.version ?? 0;
            const remoteVersion = remoteData?.version ?? 0;

            //Internal Log - Checking 
            console.log(
                `
                The cart data of ${localVersion > remoteVersion ? 'Local' : ' Remote'} is choosen.
                `)

            req.session.cart = localVersion > remoteVersion ? localData : remoteData;

            next();

        }

    },
    cartDBSync: async (req, res, next) => {
        /*
        Helper function for registered user to sync with database ( Cart List ) 
        #Logic
        * Checking whether it is a login user
        * Get the informaion of 
            - Session Data 
            - Database Data 
        * Merge data from databse and session 
            - Condition 1: Both are NULL ( Default )
                * New sessions request from new user 
                * Return an empty template
            - Condition 2: Session is Null while DB Data is avaliable 
                * Convert DB data into Store format 
                * Return the updated object 
            *   
        */


        /*************** Registered User ****************** */
        //Checking Login in Status 
        const isAuthenticated = req?.user ? true : false;
        const userId = req?.user?.id?? null;


        //### Edge Case - Not a registered user
        if (!isAuthenticated) {
            next();
            return;
        }


        /*************** Session Data ****************** */
        const sessionData = req?.session?.cart ?? null;
        const sessionCartList = sessionData?.cartList ?? null;


        //Checking
            console.log(`Server / cartController / Session List
                Input : ${JSON.stringify(sessionCartList, null, 2)}
                `)

        /*************** Database Data (CartList) ****************** */
        let dbCartList = null;
        try {

            dbCartList = await cartDB.getItemsByUserId(userId);

        } catch (err) {
            //Internal Log 
            console.log(
                `
                Error in Cart Controller / Cart DB Sync / Cannot get cart items from cart DB
                #Input: userId (${userId})
                #Error: ${err}  
                `
            );
        }

        /*************** Merge Data (Cart List) ****************** */
        let updatedCartList;
        let updatedSteps = 0;

        switch (true) {

            case (Object.keys(sessionCartList) === 0 && dbCartList.length > 0 ):
                console.log('Cart Controller / Data handling / Only Database')
                updatedCartList = cartHelper.dataConvertor.dbToStore(dbCartList);
                break;

            case (Object.keys(sessionCartList) !== 0 ):
                console.log('Cart Controller / Data handling / Merge Data')
                cartHelper.dataMerge(sessionCartList, dbCartList, userId);
                updatedCartList = sessionCartList; 
                updatedSteps += 1;
                break;

            default:
                console.log('Cart Controller / Data handling / Default')
                updatedCartList = null;
                break;
        }

        /*************** Exported Object ****************** */
        const previousData = (sessionData || req?.body?.template) ?? null;
        const updatedData = previousData ?
            {
                ...previousData,
                cartList: updatedCartList ? updatedCartList : previousData.cartList,
                version: previousData.version + updatedSteps
            } : null;

        req.session.cart = updatedData;

        next();

        return;


    },
    exportSyncResult: async (req, res, next) => {

        /*
        Updated session data is sent out. 
        Logic: 
        # If session data is not avaliable, return "null". Frontend will handle the null situation. 
        */

        const response = responseConstructor();
        response.setInfo('cart', req?.session?.cart ?? null);

        res.status(200).json(response.build());

    }

}

module.exports = cartController; 