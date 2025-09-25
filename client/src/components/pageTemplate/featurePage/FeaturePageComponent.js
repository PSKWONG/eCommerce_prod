
/***************Import Internal Modules****************** */
import './featurePage.css';
import pageStyles from '../../pageTemplate/styles/shaddowContainer.module.css';


const FeaturePageComponent = ({ children, bannerControl }) => {

    //Get the background setting
    const { bkgImage, bannerContent } = bannerControl ?? {};



    return (
        <div className={`featurePageWrapper `}>
            {
                (bkgImage && bannerContent) && (
                    <div className={`bannerWrapper `} style={{ backgroundImage: `url(${bkgImage})` }}>
                        {bannerContent}
                    </div>
                )
            }

            <div className={`contentWrapper `}>
                {children}
                banner Content 
            </div>
        </div>
    )

}

export default FeaturePageComponent; 