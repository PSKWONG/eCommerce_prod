/* 
A Hook for exporting the required controller on using quantityControl
*/



/***************Import external Modules****************** */
import { useState } from 'react';

const useQunatityController = () => {

    //States for quantity control
    const [quantity, setQuantity] = useState();


    /*************** Button Actions ****************** */
    //Handle "Add" Button
    const handleAddBtn = (event) => {
        event.preventDefault();
        setQuantity(prev => prev + 1);
    }

    //Handle "Minus" Button
    const handleMinusBtn = (event) => {
        event.preventDefault();
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    }

    //Exporting Controlling Object fro component
    const exportedData = {
        data:{
            quantity
        },
        actions: {
            setQuantity,
            handleAddBtn,
            handleMinusBtn
        }
    }

    return exportedData;

}

export default useQunatityController; 