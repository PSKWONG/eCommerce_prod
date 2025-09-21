
/***************Import Internal Modules****************** */
import './functionalPage.css';
import pageStyles from '../../pageTemplate/styles/shaddowContainer.module.css'; 


const FunctionalPageComponent = ({children}) => {

    return (
        <div className={`singlePageWrapper `}>
            <div className={`contentWrapper ${pageStyles.shadowingBox}`}>
                {children}
            </div>
        </div>
    )

}

export default FunctionalPageComponent; 