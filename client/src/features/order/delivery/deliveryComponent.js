

/***************Import external Modules****************** */
import React from 'react';


/***************Import Internal Modules****************** */
import styles from './delivery.module.css';
import formStyles from '../../../components/pageTemplate/styles/form.module.css';




const DeliveryComponent = (props) => {

    //Get the Sharing Data 
    const { data, action } = props
    const { deliveryData } = data;
    const { handleOnChange } = action;

    const { deliveryDate } = deliveryData ?? {};

    return (
        <div className={` ${styles.contentWrapper}`}>

                <h1>Delivery Information</h1>
                <form className={formStyles.formWrapper}>
                    <div>
                        <label>Delivery Date : </label>
                        <input name="deliveryDate" type="date" value={deliveryDate} onChange={handleOnChange} />
                    </div>
                </form>

        </div>
    )

};

export default DeliveryComponent; 