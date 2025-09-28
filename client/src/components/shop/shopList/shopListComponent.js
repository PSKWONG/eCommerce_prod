/*
*/

/***************Import external Modules****************** */
import { useContext } from 'react';

/***************Import Internal Modules****************** */
import { ShopDataSharing } from '../../../containers/shop/shopListing/shopListingContainer';
import './shopList.css'
import ShopItem from '../shopItems/ShopItem';


const ShopListingComponent = () => {

    //Extract the Product Item List 
    const productList = useContext(ShopDataSharing)?.shopListController?.data?.productList ?? [];

    //Construct product Item List Component 
    const productListComponent = productList.map((item, index) => {
        return <ShopItem key={index} data={item} />
    })

    return (
        <div className={`shopListContentWrapper `}>
            {productListComponent}
        </div>
    )


}
export default ShopListingComponent; 