/*
Menu Item Component 
- Rendering different types of menu Item in Master Page 
- Variable 
    * type: Rendering according type of menu item. Avalibale types: 
            - text
            - icon
            - count
    * data: Data required for the rendering 
            - label 
            - path 
            - ref (For icon registration)
    
*/

/***************Import external Modules****************** */
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/***************Import Internal Modules****************** */
import './selected.css'; 
import styles from './menuItem.module.css';
import IconSet from '../../app/iconSet/IconComponents';
import { selectAuthenState } from '../../../features/authentication/authenticationSlice';

const MenuItemComponent = (props) => {

    

    //Hook's Action 
    const navigate = useNavigate();

    //Get infromation from Redux Store 
    const authenStatus = useSelector(selectAuthenState) ?? false; 

    //Get data for menu items 
    const type = props?.type ?? 'text';
    const menuItemData = props?.data ?? {};
    const { label, path, ref, selected } = menuItemData;

    //Actions
    const handleRedirect = (event) => {
        event.preventDefault();
        navigate(path);
        return;
    }

    //Conditional rendering 

    switch (true) {

        case (authenStatus && ref === 'guest'):
            break;

        case (!authenStatus && ref === 'user'):
            break;

        case (type === 'icon'):
            return (
                <li onClick={handleRedirect} className={`${styles.item} ${styles.icon} ${selected?'selectedMenuItem':''}`}>
                    <IconSet data={ref} />
                    <span>{label}</span>
                </li>
            )
        case (type === 'label'):
            return (
                <li className={`${styles.item} ${styles.icon} ${selected?'selectedMenuItem':''}`}>
                    <IconSet data={ref} />
                    <span>{label}</span>
                </li>
            )

        default: //type = 'text' 
            return (
                <li onClick={handleRedirect} className={`${styles.item}  ${selected?'selectedMenuItem':''}`}>
                    {label}
                </li>
            )


    }



}

export default MenuItemComponent