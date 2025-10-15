/*
*/

/***************Import external Modules****************** */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


/***************Import Internal Modules****************** */
import { selectErrorMsg } from '../../orderSlice';
import ErrorHandlingComponent from '../errorHandling/errorHandlingComponent';


const ErrorHandlingContainer = () => {

    const [isError, setIsError] = useState(false);
    const errorMessage = useSelector(selectErrorMsg);

    /*************** Set Error Data ****************** */
    useEffect(() => {

        if (errorMessage.length > 0) {
            setIsError(true);
        }

        return () => setIsError(false);

    }, [errorMessage]);

    /*************** Export Data ****************** */
    const exportData = {
        data: {
            errorMessage
        }
    }

    return (<>
        {
            isError && <ErrorHandlingComponent errorController={exportData} />
        }
    </>);



};

export default ErrorHandlingContainer; 