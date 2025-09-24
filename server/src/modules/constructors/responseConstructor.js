/*
Response Constuctor 
- Function: Standardise structure of response  
- Front End can standarise on digesting the information from API response 
*/



const responseConstructor = () => {

    //Structure of the reponse object 

    const defaultReponse = (
        {
            info: {}, //default to be a JS obkect
            path: '', //default to be a String
            message: [] // default to be a array of string 
        }
    )

    //Basic Structure of the response object 
    const response = defaultReponse;

    //Actions for mutating 
    const setInfo = (type, inputData) => {


        //Default catergories of Information passed
        //>>>>>>> Avoid the miss using of keywords on getting information 
        const whiteList = ['users', 'products', 'authen', 'cart', 'order'];

        //Edge Case Handling - Miss using Keywords 
        if (!whiteList.includes(type)) {
            throw Error(`Error in Response Constructor / Set Info. Invalid data type ${type}. Allowed types: ${whiteList.join(', ')}`);
        }

        response.info[type] = inputData;
    }

    const setMessage = (inputMessage) => {

        if (typeof inputMessage !== 'string') {
            throw Error('Error in Response Constructor/ Set Message. Message must be a string');
        }

        response.message.push(inputMessage);
    }

    const setPath = (inputPath) => {

        if (typeof inputPath !== 'string') {
            throw Error('Error in Response Constructor / Set Path. Path must be a string');
        }

        response.path = inputPath;
    }

    const build = () => response;

    return {
        setInfo,
        setMessage,
        setPath,
        build
    };
}

module.exports = responseConstructor;






