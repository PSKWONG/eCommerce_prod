/*
Container to control the menu items from Order features
*/

/***************Import external Modules****************** */
import React, { useState, useEffect } from 'react';

/***************Import Internal Modules****************** */
import menuItems from '../../data/menuItems.json'; 
import MenuListComponent from './menuListComponent'; 


const MenuListContainer = ()=>{

    /***************Data for controlling menu items ****************** */
    //Store the index of selected item 
    const [selectedIndex , setSelectedIndex] = useState(0); 
    const [updatedMenuItems , setUpdatedMenuItems] = useState(menuItems); 


    /*************** Update Menu Item ****************** */
    useEffect(()=>{
        
        const updatedItems = [...menuItems]; 
        updatedItems[selectedIndex].selected = true; 
        setUpdatedMenuItems(updatedItems); 

    },[selectedIndex]); 

    /*************** Export Menu Item ****************** */
    const exportData= {
        data:{
            updatedMenuItems
        }
    }; 


    return <MenuListComponent menuListData={exportData} />




}; 

export default MenuListContainer; 
