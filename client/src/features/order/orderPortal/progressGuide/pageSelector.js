

/***************Import external Modules****************** */
import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';

/***************Import Internal Modules****************** */
import pageRegistration from './progressRegistration';
import {setError} from '../../orderSlice'; 

const usePageSelector = (currentIndex, progressGuide) => {

    //Hook Actions
    const dispatch = useDispatch(); 

    //Set the displayment elements according to thee current Index 
    const displayElement = useMemo(() => {

        //Get the reference infromation from the progress guide 
        const reference = progressGuide[currentIndex ?? 0].ref ?? 'cart';

        return React.createElement(pageRegistration[reference]);

    }, [currentIndex, progressGuide])

    //Reset the Error Status when index change 
    useEffect(()=>{
        dispatch(setError([])); 
    }, [currentIndex, dispatch])



    //Return the REACT Component to be displayed according to the index 
    return displayElement

};

export default usePageSelector; 