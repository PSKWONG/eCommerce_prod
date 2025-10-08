/***************Import external Modules****************** */

/***************Import Internal Modules****************** */
import { ReactComponent as Account } from './images/accountIcon.svg'; 
import { ReactComponent as Bag } from './images/bagIcon.svg'; 
import { ReactComponent as Close } from './images/closeIcon.svg'; 
import { ReactComponent as Home } from './images/homeIcon.svg'; 
import { ReactComponent as Profile } from './images/profileIcon.svg'; 
import { ReactComponent as Store } from './images/storeIcon.svg'; 
import { ReactComponent as LogOut } from './images/logOut.svg'; 
import { ReactComponent as Delivery } from './images/delivery.svg'; 
import { ReactComponent as Payment } from './images/paymenIcon.svg';
import { ReactComponent as Order } from './images/packageIcon.svg';
import { ReactComponent as Complete } from './images/completeIcon.svg';
import { ReactComponent as BurgerMenu } from './images/burgerMenuIcon.svg';
import { ReactComponent as Loading } from './images/loading.svg';
import { ReactComponent as Update } from './images/updateIcon.svg';
import { ReactComponent as Upload } from './images/uploadIcon.svg';
import { ReactComponent as Delete } from './images/deleteIcon.svg';





const iconRegistration = {

    guest: Account, 
    user: Account, 
    cart: Bag, 
    close: Close,
    home: Home,
    profile: Profile,
    shop: Store,
    logOut:LogOut,
    delivery: Delivery,
    payment: Payment,
    order:Order,
    confirmation:Complete,
    burgerMenu: BurgerMenu,
    loading: Loading,
    Update:Update,
    Add:Upload,
    Delete:Delete
}

export default iconRegistration; 

