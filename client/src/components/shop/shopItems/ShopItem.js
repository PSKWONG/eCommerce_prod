/*
*/

/***************Import external Modules****************** */
import { useContext } from 'react';

/***************Import Internal Modules****************** */
import styles from './shopItem.module.css';
import { ShopDataSharing } from '../../../containers/shop/shopListing/shopListingContainer';



const ShopItem = (props) => {

    //Extract Data from pros
    const { product_name, image_path, unit_price } = props?.data ?? {};
    const { showPortal, setSelectedItem } = useContext(ShopDataSharing)?.shopListController?.actions ?? {};



    //Handle selecting Item 
    const handleDetailBtn = (event) => {
        event.preventDefault();
        setSelectedItem(props?.data ?? null);
        showPortal(event);
    }

    return (
        <div className={`${styles.contentWrapper}`}>
            <div className={`${styles.detail}`}>
                <img src={`/assets/images/productimage/${image_path}`} alt={product_name ?? ''} />
                <div className={styles.description}>
                    <h1>{product_name ?? ''}</h1>
                    <span>{`£${unit_price ?? 'Unavaliable'}`}</span>
                </div>
            </div>

            <button onClick={handleDetailBtn}>Detail</button>

        </div>
    )


};

export default ShopItem; 