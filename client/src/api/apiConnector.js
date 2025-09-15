/***************Import external Modules****************** */


/***************Import internal Modules****************** */
import axiosStrategy from './axiosStrategy';


/*************** Helper functions ****************** */

/*
**Helper function - API URL Redirect** 
- Background: 
    * Since server serve the static website, all the API URL started with /api/. 
- Purpose:
    *Since the name of the /api/ is subejct to change, the apiURLRedirect for this putpose.  
*/
const apiURLRedirect = (url) => {
    return `/api/${url}`
}




/*************** Connector Function ****************** */
/*
**Connector function - Switching API Fetching Connectors** 
- Background: 
    * Give the flexibity for swicthing API Connections 
- Logic:
    * Strategy Variable store the default Strategy to be used. 
    * Default strategy to be axios 
    * Switching can be made by using the switching Strategy function 
    * The Fetching Command on 
        - GET 
        - POST 
        - PUT
        - DELETE
*/

//Avaliable Strategies 
const strategies = {
    axios: axiosStrategy
}

let strategy = strategies['axios'];

const apiActions = {

    get: (url) => strategy.get(apiURLRedirect(url)),
    post: (url, data) => strategy.post(apiURLRedirect(url), data),
    put: (url, data) => strategy.put(apiURLRedirect(url), data),
    delete: (url, data) => strategy.delete(apiURLRedirect(url), data),
    setStrategy: (appliedStrategy) => {

        //Internal Log
        if (!strategies[appliedStrategy]) {
            console.log(
                `Error in applying Fetching Strategy. The strategy is not avaliable.
                 The avaliable fetching strategies: ${Object.keys(strategies).join(', ')}
                `
            )
        }

        strategy = strategies[appliedStrategy] ? strategies[appliedStrategy] : strategies['axios']
    }

}

export default apiActions; 