
/*
*/

/***************Import external Modules****************** */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


/***************Import Internal Modules****************** */
import styles from '../../../../components/pageTemplate/styles/shaddowContainer.module.css'; 
import basic from '../../../../components/pageTemplate/styles/page.module.css'; 

const errorHandlingComponent = (props) => {

    //Data from props
    const errMsg = props?.errorController?.data?.errorMessage ?? [];

    let errorContent = (errMsg ?? []).map((msg)=>{
        return <li>{msg}</li> ; 
    })


    return (
        <div className={`${styles.section} ${basic.orangeStyles}`}>
            {errorContent}
        </div>
    )


};

export default errorHandlingComponent; 