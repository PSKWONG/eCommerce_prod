/*
Shop Listing Container to 
- Control the API request 
    * Setting the Category ID 
    * Get the item list according to category ID 
    * Set the Currency ( Pahse 2 )
- Show the Data when the Loading State is false 
-  
*/

/***************Import external Modules****************** */
import { useState, useEffect, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/***************Import Internal Modules****************** */
import api from '../../../api/apiConnector';
import ShopListComponent from '../../../components/shop/shopList/shopListComponent';
import usePortalController from '../../portal/hook/portController';
import cartLoadAndSync from '../../../features/cart/middlewares/loadAndSync';
import { selectCartData, isCartLoading } from '../../../features/cart/cartSlice';
import DetailPage from '../../../components/shop/productDetail/detail';

/*************** Create Context for Sharing ****************** */
export const ShopDataSharing = createContext();

const ShopListingContainer = () => {

    const [categoryId, setCategoryId] = useState(2);
    const [isLoading, setIsLoading] = useState(true);
    const [shopList, setShopList] = useState(null);
    const [currency, setCurrency] = useState('gbp');
    const [selectedItem, setSelectedItem] = useState();

    //Hook Actions 
    const dispatch = useDispatch();


    //Phase 2 - Set action for changing Category ID 

    /***** Request to API Server to get the Shop List *****/
    useEffect(() => {

        const getShopItems = async (id) => {


            try {

                //POST request to API Server to update the category Id
                const postResponse = await api.post('/products/list', { categoryId: id });
                const isUpdatingCategoryIdSuccess = postResponse?.success ?? false;

                //### Edge Case --- Updating Catergory Id is not success
                if (!isUpdatingCategoryIdSuccess) {
                    //Internal Log 
                    console.log(`
                        Error in Shop Listing / Updating Category Id
                        # Input : ${id}
                        # Error : ${postResponse.data.message}
                    `);
                    setIsLoading(false);
                    return;
                }

                //GET request to API Server to get the product list according to the category Id
                const getResponse = await api.get('/products/list');
                const { success, data } = getResponse;

                if (success) {

                    setShopList(data.info.products)
                    setIsLoading(false);
                    return;

                } else {
                    //Internal Log
                    console.log(`
                        Fail in Shop Listing / Get Product List
                        # Input : ${id}
                        # Error : ${data.message.join(',')}
                    `);
                    setIsLoading(false);
                    return;
                }


            } catch (err) {
                //Internal Log 
                console.log(`
                        Error in Shop Listing / Get Product List 
                        # Input : ${id}
                        # Error : ${err}
                    `);
                setIsLoading(false);
                return;
            }

        }

        getShopItems(categoryId);

        return () => {
            setCategoryId(2);
            setIsLoading(true);
            setShopList(null);
        }

    }, [categoryId])

    /***** Dispatch a action for loaing cart  *****/
    //Get the cart information at the initiation of the page 
    useEffect(()=>{
        dispatch(cartLoadAndSync());
    },[dispatch])
    

    /***** Portal Controller *****/
    const portalController = usePortalController(DetailPage);
    const { PortalComponent } = portalController.data;
    const { showPortal } = portalController.actions;


    /***** Item Controller *****/
    
    const cartList = useSelector(selectCartData)?.cartList ?? null;
    const cartLoadingStatus = useSelector(isCartLoading)?? false;
    const itemController = {
        cartList,
        selectedItem: selectedItem?? null,
        isLoading: cartLoadingStatus
    }



    /***** Data Export *****/
    const shopListController = {
        data: {
            productList: shopList,
            selectedItem,
            itemController,
            currency
        },
        actions: {
            showPortal,
            setSelectedItem
        }
    }




    return (
        <ShopDataSharing.Provider value={{ shopListController }}>
            {
                isLoading &&
                <>Loading</>
            }

            {
                !isLoading &&
                <ShopListComponent />
            }
            <PortalComponent />
        </ShopDataSharing.Provider>
    )
}

export default ShopListingContainer; 