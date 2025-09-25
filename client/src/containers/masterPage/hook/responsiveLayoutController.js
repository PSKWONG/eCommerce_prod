
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

const useResponsiveController = () => {

    //States for Menu Item Control 
    //const [pageWidth, setPageWidth] = useState(window.innerWidth);
    const [layout, setLayout] = useState('desktop');


    useEffect(() => {


        //Helper Function on updating the layout State
        const layoutUpdate = () => {

            //Get the value from HTML document 
            const pageWidth = window.innerWidth;
            const body = document.body;

            // Clear previous layout classes
            body.classList.remove('mobile', 'tablet', 'desktop');


            //Update the layout when it match the breakpoint of responsive layout 
            switch (true) {
                case (pageWidth <= responsiveGuide['mobile']):
                    body.classList.add('mobile');
                    setLayout('mobile');
                    break;

                case (pageWidth <= responsiveGuide['tablet']):
                    body.classList.add('tablet');
                    setLayout('tablet');
                    break;


                default:
                    body.classList.add('desktop');
                    setLayout('desktop');
                    break;

            }
        }

        //Add a Event Listener for the Windows Resize
        window.addEventListener('resize', layoutUpdate);

        layoutUpdate();


    }, [])


    //Exported Data 
    return {
        data: {
            layout
        }
    }

}


export default useResponsiveController; 