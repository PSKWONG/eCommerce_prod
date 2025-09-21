/***************Import external Modules****************** */
import React, { useContext } from 'react';
import {Outlet} from 'react-router-dom';


/***************Import Internal Modules****************** */
import './masterPage.css';
import './header.css';
import './mobilemenu.css'; 
import { MasterPageContext } from '../../containers/masterPage/MasterPageContainer';
import IconSet from '../../components/app/iconSet/IconComponents';
import MenuItem from './menuItem/MenuItemComponent';
import logo from './images/companyLogo.png';


/*
Masterpage is mainly composed of the following components
- header 
    * menus 
- Content Wrapper 
    * Display of content 
- Mobile Menu 
    * Visible when the size is suitable 
*/


const MasterPageComponent = () => {

    //Get the data from container 
    const { data, actions } = useContext(MasterPageContext) ?? {};
    const { navMenuItems, funcMenuItems, mobileMenuItems } = data ?? {};
    const { showPortal } = actions ?? {};



    /*
    Generate Navigation Menu Items by feeding information from "navMenuItems"
    */
    let navigationContent;
    navigationContent = (navMenuItems ?? []).map((item, index) => {
        return <MenuItem key={index} type={'text'} data={item} />
    });

    /*
    Generate Functional Menu Items by feeding information from "funcMenuItems"
    */
    let fucntionalContent;
    fucntionalContent = (funcMenuItems ?? []).map((item, index) => {
        const updatedItem = {...item}; 
        return <MenuItem key={index} type={'icon'} data={updatedItem} />
    });

    /*
    Generate Mobile Menu Items by feeding information from "funcMenuItems"
    */
    let mobileContent;
    mobileContent = (mobileMenuItems ?? []).map((item, index) => {
        const updatedItem = {...item}; 
        return <MenuItem key={index} type={'icon'} data={updatedItem} />
    });



    return (
        <>
            <div className={'masterHeaderWrapper'}>
                <button alt="Expand or Hide Menu" onClick={showPortal} className={'burgerMenuIcon'}>
                    <IconSet data={'burgerMenu'} />
                </button>
                <div className={'logoWrapper'}>
                    <img src={logo} alt='Company Logo' />
                    <span><strong>PLANT</strong>hub</span>
                </div>
                <ul className={`menu nav`}>
                    {navigationContent}
                </ul>
                <ul className={`menu func`}>
                    {fucntionalContent}
                </ul>

            </div>
            <div className={'masterContentWrapper'}>
                <Outlet />
            </div>
            <div className={'masterMobileMenuWrapper'}>
                <ul className={`menu mobile`}>
                    {mobileContent}
                </ul>
            </div>
        </>
    )

}

export default MasterPageComponent; 