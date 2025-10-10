/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import SubMenuPageTemplate from '../pageTemplate/subMenuPage/SubMenuPageContainer'; 
import SubMenuComponent from '../../components/users/subMenu/subMenuComponent'; 
import profileroute from './profile/profileRoute'; 



const userRoute = {
    path: '/user',
    element:
        <SubMenuPageTemplate subMenu={SubMenuComponent}>
            <Outlet />
        </SubMenuPageTemplate>,      
    children: [
        profileroute
    ]
}

export default userRoute; 