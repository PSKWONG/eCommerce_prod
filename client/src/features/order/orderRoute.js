/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import SubMenuPageTemplate from '../../containers/pageTemplate/subMenuPage/SubMenuPageContainer'; 
import SubMenuComponent from './subMenu/menuList/menuListContainer'; 



const orderRoute = {
    path: '/order',
    element:
        <SubMenuPageTemplate subMenu={SubMenuComponent} />,      
    children: [
    ]
}

export default orderRoute; 