

/***************Import external Modules****************** */
import { useContext } from 'react';

/***************Import Internal Modules****************** */
//import styles from './shopItem.module.css';
import { ShopDataSharing } from '../../../containers/shop/shopListing/shopListingContainer'; 

const ProductDetail = ()=>{

    //Extract Data from pros
    const { product_name, image_path, unit_price } = useContext(ShopDataSharing)?.shopListController?.data?.selectedItem ??{}; 

    return <>hello!{product_name}</>
}

export default ProductDetail; 