/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import SubMenuPageTemplate from '../pageTemplate/subMenuPage/SubMenuPageContainer'; 
import SubMenuComponent from '../../components/users/subMenu/subMenuComponent'; 



const userRoute = {
    path: '/user',
    element:
        <SubMenuPageTemplate subMenu={SubMenuComponent} />,      
    children: [
    ]
}

export default userRoute; 