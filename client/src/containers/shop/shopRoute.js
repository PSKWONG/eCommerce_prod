/***************Import external Modules****************** */
import { Outlet } from 'react-router-dom';

/***************Import Internal Modules****************** */
import FeaturePageTemplate from '../../containers/pageTemplate/featurePgae/featurePageContainer';
import bannerbackground from '../../components/shop/images/plant_banner01.jpg';
import bannerContent from '../../components/shop/banner/BannerComponent'; 



const authenRoute = {
    path: '/shop',
    element:
        <FeaturePageTemplate
            banner={({
                bkgImage:bannerbackground,
                content:bannerContent
            })}
        >
            <Outlet />
        </FeaturePageTemplate>,
    children: [

    ]
}

export default authenRoute; 