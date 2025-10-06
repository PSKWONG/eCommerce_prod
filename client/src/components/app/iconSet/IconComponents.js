/***************Import external Modules****************** */

/***************Import Internal Modules****************** */
import iconRegistration from './iconRegistration';
import './iconItem.css'; 


const IconComponent = (props) => {

    /*
    Get the extra setting 
    Option:
        * reference - set the icon from icon registration 
            - Without reference, use the default value 'home'
        * CSS - set the class "iconItem" to change the style 
    */

    //Extract Icon 
    const ref = props?.data ?? 'home';
    const ItemIcon = iconRegistration[ref] ?? null;

    return (
        <>
        {
            ItemIcon && <ItemIcon className={'iconItem'} /> 
        }
        </>

    )

}

export default IconComponent; 

