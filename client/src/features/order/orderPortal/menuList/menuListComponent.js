/***************Import External Modules****************** */
import React from 'react';

/***************Import Internal Modules****************** */
import './orderMenu.css'; 
import MenuItemCompnent from '../../../../components/masterPage/menuItem/MenuItemComponent';


const MenuListComponent = (props) => {

    //Get the menu items
    const menuItems = props?.menuListData?.data?.updatedMenuItems ?? null; 

    //Navigation Menu 
    let portalMenuContent = [];
    portalMenuContent = (menuItems ?? []).map((item, index) => {
        return <MenuItemCompnent key={`O_menu_${index}`} type={'icon'} data={item} />
    })


    return (
        <div className={`orderMenuWrapper`}>
            {portalMenuContent}
        </div>
    )

};

export default MenuListComponent; 