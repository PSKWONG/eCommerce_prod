


/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import FunctionalPageComponent from '../functionalPage/FunctionalPageComponent';
import './subMenu.css';
import basic from '../../pageTemplate/styles/page.module.css'; 


const SubMenuPageComponent = (props) => {


    return (
        <FunctionalPageComponent>
            <div className={`subMenuPageWrapper`}>
                <div className={`subMenuWrapper ${basic.greenStyles}`}>
                    {props.subMenu}
                </div>
                <div className={`subMenuTemplateContentWrapper`}>
                    <Outlet />
                </div>
            </div>
        </FunctionalPageComponent>
    )
}

export default SubMenuPageComponent; 