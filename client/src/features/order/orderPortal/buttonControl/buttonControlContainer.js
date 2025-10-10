/*
Container for processing data for buttons for Order Process
Logic: 
# Forward Action: 
    Be Avaliable, after: 
    1) Checking the position of selected page 
    2) Completeness of the current page 
#Backward Action : 
    Be Avaliable before comformation
# Cancel Action: 
    Be avaliable before confirmation 
# Extra Action: 
    Avaliable for hook 
*/

/***************Import external Modules****************** */
import {useState} from 'react'; 
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import process from '../../data/menuItems.json';
import PageComponent from './buttonControlComponent'; 



const ButtonControlContainer = (props) => {



    /*************** Position ****************** */
    const currentIndex = 0; 

    /***************Button Actions****************** */
    const handleCancellation = (event)=>{
        event.preventDefault(); 
    };

    const handleForward = (event)=>{
        event.preventDefault(); 
    };

    const handleBackward = (event)=>{
        event.preventDefault(); 
    };
    

    /***************Export data****************** */
    const exportedData = {
        data:{
            forward: process[currentIndex]?.instructions[1] ?? null,
            backward: process[currentIndex]?.instructions[0] ?? null,
            status:{

            }
        },
        actions:{
            handleCancellation,
            handleForward,
            handleBackward
        }

    }

    return <PageComponent controller = {exportedData}/>

};

export default ButtonControlContainer; 