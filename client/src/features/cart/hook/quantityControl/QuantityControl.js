/***************Import external Modules****************** */
import React from 'react';

/***************Import Internal Modules****************** */
import styles from './QuantityControl.module.css'; 

/*
This component is expecting to import the following 
<Component data= {controller object from the hook} />
*/

const QuantityControlComponent = React.memo((props) => {

    //Destructure props for information 
    const { data , actions } = props.data; 
    const { quantity } = data; 
    const { handleAddBtn, handleMinusBtn } = actions

    return (
        <div className={`${styles.contentWrapper}`}>
            <button onClick={handleMinusBtn}>-</button>
            <strong>{quantity}</strong>
            <button onClick={handleAddBtn}>+</button>
        </div>
    )

})

export default QuantityControlComponent; 