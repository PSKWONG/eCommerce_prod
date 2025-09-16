/***************Import External Modules****************** */
import { useState, useEffect } from 'react';


/*
Window Observer Hook 
- Get the "Windows Size" State 
- By adding Event Listener 
*/

const useWindowObserver =()=>{

    //Set Variable to record the size of window
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    
    
    useEffect(()=>{
        //Helper Function on updating the Windows Size State
        const sizeUpdate = ()=>{
            setWindowSize(window.innerWidth); 
        }

        //Add a Event Listener for the Windows Resize
        window.addEventListener('resize', sizeUpdate)
    }, [])

    return windowSize; 

}

export default useWindowObserver; 