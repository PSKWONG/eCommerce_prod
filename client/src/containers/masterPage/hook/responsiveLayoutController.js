
/*
Aim: 
- Set the Body Style as a reference for responsive style  

Logic: 
- Change the ClassList of Body Element according to the Windows Size 
1. Get the DOM element 
2. Set the Conditions 
    - Mobile 
    - Tablet
    - Desktop 

*/

/***************Import External Modules****************** */
import { useState, useEffect } from 'react';

/***************Import Internal Modules****************** */
import responsiveGuide from '../data/responsiveGuide.json';




const useResponsiveController = (windowSize) => {

    //States for Menu Item Control 
    const [pageWidth, setPageWidth] = useState(window.innerWidth);

    //Response to change of window size 
    useEffect(() => {
        if (windowSize) {
            setPageWidth(windowSize);
        }
    }, [windowSize])

    //Set Body Class List 

    useEffect(()=>{

        const body = document.body;

        switch (true){
            case (pageWidth <= responsiveGuide['mobile']):
                body.classList.add('mobile');
                break;

            case (pageWidth <= responsiveGuide['tablet']):
                body.classList.add('tablet');
                break;


            default:
                body.classList.add('desktop');
                break;

        }


        //Reset the class list of the body element 
        return ()=>{
            body.classList.remove('mobile', 'tablet', 'desktop')
        }

    }, [pageWidth])


}

export default useResponsiveController; 