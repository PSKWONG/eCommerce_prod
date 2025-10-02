

/***************Import external Modules****************** */
import { useContext } from 'react';

/***************Import Internal Modules****************** */
import './detail.css';
import ItemControlComponent from '../../../features/cart/itemController/itemControllerContainer'; 
import { ShopDataSharing } from '../../../containers/shop/shopListing/shopListingContainer';

const ProductDetail = () => {

    //Extract Data from pros
    const {selectedItem, itemController} = useContext(ShopDataSharing)?.shopListController?.data ?? {} ; 
    const { product_name, description, image_path, unit_price } = selectedItem;

    return (
        <div className={`productDetailWrapper`}>
            <div className={`contentWrapper`}>
                <div className={`productWrapper`}>
                    <img src={`/assets/images/productimage/${image_path}`} alt={product_name} />
                    <div>
                        <div className={`basicInfoWrapper`}>
                            <h1>{product_name ?? ''}</h1>
                            <div>
                                <span>{`£ ${unit_price ?? 'Unavaliable'}`}</span>
                                <ItemControlComponent data={itemController} />
                            </div>
                        </div>
                        <p>
                            {description ?? ''}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetail; 