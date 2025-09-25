/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import FeaturePageTemplate from '../../containers/pageTemplate/featurePgae/featurePageContainer';


const authenRoute = {
    path: '/shop',
    element:
        <FeaturePageTemplate>
            <Outlet />
        </FeaturePageTemplate>,
    children: [
        
    ]
}

export default authenRoute; 