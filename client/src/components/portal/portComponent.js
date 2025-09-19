/***************Import external Modules****************** */
import { createPortal } from 'react-dom';

/***************Import Internal Modules****************** */
import './portal.css'; 



const PortalComponent = () => {


    return createPortal(

        <div className={`moralWrapper`}>
            Hello!
        </div>,
        document.getElementById('portalRoot')
    ); 

}

export default PortalComponent; 