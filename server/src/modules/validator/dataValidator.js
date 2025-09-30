/* 
Helper function on checking / Santilising data
*/

const dataValidator = {

    checking: {
        isEmptyArray: (data) => {
            return !data || !Array.isArray(data) || data.length === 0
        },
        isEmptyObject: (data) => {
            return !data || typeof data !== 'object' || Object.keys(data).length === 0
        }
    }
}

module.exports = dataValidator; 