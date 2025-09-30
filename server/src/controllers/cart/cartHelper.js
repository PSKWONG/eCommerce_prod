

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



        //Data Checking - Make sure the data is avaliable
        const { isEmptyObject } = dataValidator.checking;
        if (isEmptyObject(session), isEmptyArray(database), !userId) {
            return null;
        }

        //Session Data 
        const sessionCartList = session; 
        const sessionListItems = Object.keys(sessionCartList); 

        //Database Data
        const databaseCartList = cartHelper.dataConvertor.dbToStore(database); 
        const databaseListItems = Object.keys(databaseCartList); 

        //Items to be modified  
        const itemsToBeDeleted = databaseListItems.filter(item => !sessionListItems.has(item)); 
        const itemsToBeAdded = sessionListItems.filter(item => !databaseListItems.has(item)); 
        const itemsToBeUpdated = databaseListItems.filter(item => sessionListItems.has(item)); 

        //Items to be deleted
        if(itemsToBeDeleted){
            for (const item in itemsToBeDeleted){
                const productId = Number(item); 
                await cartDB.delete(userId, productId); 
            }
        }; 

        //Items to be added
        if(itemsToBeAdded){
            for (const item in itemsToBeAdded){
                const productId = Number(item); 
                const quantity = sessionListItems.cartList[item].quantity; 
                await cartDB.create(userId, productId, quantity); 
            }
        };

        //Items to be added
        let updatedCartList = {...sessionCartList}; 


        if(itemsToBeUpdated){
            for (const item in itemsToBeUpdated){
                const productId = Number(item); 
                const sessionQuantity = sessionListItems.cartList[item].quantity; 
                const dbQuantity = databaseListItems.cartList[item].quantity; 


                switch (true) {

                    case(sessionQuantity > dbQuantity) :
                        await cartDB.update(userId, productId, sessionQuantity); 
                    
                    case(sessionQuantity < dbQuantity) :
                        updatedCartList[item].quantity = dbQuantity; 

                    default:
                        continue;

                }
            }
        };


        //Export Updated Cart List 
        return updatedCartList; 

    }

}

module.exports = cartHelper; 