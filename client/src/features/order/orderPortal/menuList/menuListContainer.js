/*
Container to control the menu items from Order features
*/

/***************Import external Modules****************** */
import React, { useState, useEffect, useContext } from 'react';

/***************Import Internal Modules****************** */
import menuItems from '../../data/menuItems.json';
import MenuListComponent from './menuListComponent';
import { OrderPortalDataSharing } from '../orderPortalContainer';



const MenuListContainer = () => {

    /***************Data for controlling menu items ****************** */
    //Store the index of selected item 
    const [updatedMenuItems, setUpdatedMenuItems] = useState(menuItems);

    /*************** Get selected Index ****************** */
    const { data } = useContext(OrderPortalDataSharing).portalProgressData ?? {};
    const currentIndex = data?.currentIndex ?? 0;

    /*************** Update Menu Item ****************** */
    useEffect(() => {

        if (currentIndex >= 0 && menuItems.length > 0) {
            let updatedItems = (menuItems ?? []).map(item => ({ ...item }));
            updatedItems[currentIndex].selected = true;
            setUpdatedMenuItems(updatedItems);
        }

    }, [currentIndex]);

    /*************** Export Menu Item ****************** */
    const exportData = {
        data: {
            updatedMenuItems
        }
    };


    return <MenuListComponent menuListData={exportData} />

};

export default MenuListContainer; 
