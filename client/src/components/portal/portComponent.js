/***************Import external Modules****************** */
import { createPortal } from 'react-dom';

/***************Import Internal Modules****************** */
import './portal.css'; 
import IconSet from '../../components/app/iconSet/IconComponents'; 



const PortalComponent = (props) => {

    //Extract the information from props
    const {data, actions } = props?.data ?? {}; 
    const content = data?.visibleContent; 

    return createPortal(

        <div className={`moralWrapper`}>
            {content}
            <button onClick={actions.closePortal} className={`close`}>
                <IconSet data={'close'} />
            </button>
        </div>,
        document.getElementById('portalRoot')
    ); 

}

export default PortalComponent; 