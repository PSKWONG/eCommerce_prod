

/* 
Reference: 
Updated Date : 30/09/2026

# Structure of Cart from Store  : 
{
    data:{
        cartList:{
            [productId]:{
                product:{
                    id:(number),
                    ...
                },
                quantity: (number)
            }
        }
        version: (number)
    },
    ...
}


# Structure of Cart List from Database  : 
- (id) refer to the product id from table of "Product" 
[
    {
        id,
        quantity,
        ....
    }
]


*/


/***************Import Internal Modules****************** */
const dataValidator = require('../../modules/validator/dataValidator');
const cartDB = require('../../models/cartDB');


const cartHelper = {

    dataConvertor: {
        /*
            Helper function on converting structures of data(cartList) to appropiate structure 
        */
        dbToStore: (data) => {

            //Data Checking - Make sure the data from Database is avaliable
            const { isEmptyArray } = dataValidator.checking;
            if (isEmptyArray(data)) {
                return null;
            }

            //Data is converted from database format to Store format


            try {

                let storeData = {};

                data.forEach((item) => {
                    const { quantity, ...product } = item
                    storeData[item.id] = { product, quantity }
                });

                return storeData;

            } catch (err) {

                //Internal Error
                console.log(
                    `
                    Error in Data Conversion / Database to Store 
                    # Input : ${data}
                    # Error : ${err}
                    `
                )

                return null;

            }
        }

    },
    dataMerge: async (session, database, userId) => {

        console.log(
            `Start of data merge:
            # Session: ${session}
            # Database: ${database}
            # user ID : ${userId}
            `)

        //Data Checking - Make sure the data is avaliable
        const { isEmptyObject } = dataValidator.checking;
        if (isEmptyObject(session), !userId) {
            return null;
        }

        //Session Data 
        const sessionCartList = session;
        const sessionListItems = Object.keys(sessionCartList);

        //Database Data
        const databaseCartList = database ? cartHelper.dataConvertor.dbToStore(database) : null;
        const databaseListItems = databaseCartList ? Object.keys(databaseCartList) : [];

        //Items to be modified  
        const itemsToBeDeleted = databaseListItems.filter(item => !sessionListItems.includes(item));
        const itemsToBeAdded = sessionListItems.filter(item => !databaseListItems.includes(item));
        const itemsToBeUpdated = databaseListItems.filter(item => sessionListItems.includes(item));

        //Items to be deleted
        if (itemsToBeDeleted.length > 0 ) {
            for (const item of itemsToBeDeleted) {
                const productId = Number(item);
                await cartDB.delete(userId, productId);
            }
        };

        //Items to be added
        if (itemsToBeAdded.length > 0) {
            for (const item of itemsToBeAdded) {
                const productId = Number(item);
                const quantity = sessionCartList[item].quantity;
                await cartDB.create(userId, productId, quantity);
            }
        };

        if (itemsToBeUpdated.length > 0) {
            for (const item of itemsToBeUpdated) {
                const productId = Number(item);
                const sessionQuantity = sessionCartList[item].quantity;
                await cartDB.update(userId, productId, sessionQuantity);

            }
        };

    }

}

module.exports = cartHelper; 