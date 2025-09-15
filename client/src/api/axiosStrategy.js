/*************** Import external Modules ****************** */
import axios from 'axios';

/*************** Axios Strategy Configuration ****************** */
const api = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const normaliseResponse = async (httpRequest) => {


    try {
        const response = await httpRequest;

        return {
            success: true,
            status: response.status,
            data: response.data
        }


    } catch (err) {
        const response = err.response || {};

        return {
            success: false,
            status: response.status || 500,
            data: response.data || {message:['Server Error. Please try again']}
        }

    }

}


const axiosStrategy = {
    get: (url) => normaliseResponse(api.get(url)),
    post: (url, data) => normaliseResponse(api.post(url, data)),
    put: (url, data) => normaliseResponse(api.put(url, data)),
    delete: (url, data) => normaliseResponse(api.delete(url, { data }))
}

export default axiosStrategy; 