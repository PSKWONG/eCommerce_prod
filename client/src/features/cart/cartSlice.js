/*
Phase 1 - RealTime Actions 
*/

/*
Phase 2 - Cart Sync with Version 
Core Principles
- Every cart mutation increments a version number
    - Example: cartVersion = 44 → 46 → 48
- Stored in Redux alongside the cart state
    - Each sync request carries its version
    - Payload: { cart, version: 48 }
- Server stores and returns the same version
- Frontend only applies sync responses if version matches
- Prevents stale syncs from overwriting newer cart states
- Rollback only happens if no newer version is pending
- If version 46 fails but 48 is still in-flight, don’t revert to 44
- Sync completion is determined by comparing versions
- lastSyncedVersion === cartVersion → cart is fully synced

Optional Enhancements
- Sync queue: Track all in-flight and completed syncs
- Debounce-aware flags: Detect when no more syncs are pending
- Unload protection: Persist cart locally if window closes mid-sync

*/

/*
Phase 3- Currency chnages 
*/



/***************Import External Modules****************** */
import { createSlice } from '@reduxjs/toolkit';

/***************Import Internal Modules****************** */
import loadAndSync from './middlewares/loadAndSync'; 



/*************** Create Cart Slice ****************** */
//Cart Data Template
export const cartDataTemplate  = {
    cartList: {},
    version: 0
}

// Cart States
const cartState = {
    data: { ...cartDataTemplate } ,
    status: {
        isLoading: false,
        isError: false,
        errorMsg: [],

    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: cartState,
    reducers: {
        updateItem: (state, action) => {

            //Payload Data Checking
            const itemId = action?.payload?.product?.id ?? null;

            //#### Case Handling - Item is not avaliable #########
            if (itemId) {
                state.data.cartList[itemId] = action?.payload;
                state.data.version += 1; 
            } else {
                return;
            }
        },
        deleteItem: (state, action) => {
            //Payload Data Checking
            const itemId = action?.payload?.product?.id ?? null;

            //#### Case Handling - Item is not avaliable #########
            if (itemId) {
                delete state.data.cartList[itemId];
                state.data.version += 1; 
            } else {
                return;
            }
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(loadAndSync.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(loadAndSync.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                console.log('CartSlice / Load and Sync / Returned Data', action.payload); 
                state.data.version = action?.payload?.version ?? 0 ; 
                state.data.cartList = action?.payload?.cartList
                
                
            })
            .addCase(loadAndSync.rejected, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = true;
                state.status.errorMsg = action.error.message;
            })
    },
    selectors:{
        selectCartData: (state) => state.data,
        isCartLoading: (state) => state.status.isLoading
    }
})


/*************** Export Slice ****************** */
//Export Reducer to Store 
export default cartSlice.reducer;

//Export Actions 
export const {
    updateItem,
    deleteItem
} = cartSlice.actions;

//Export Store State
export const {
    selectCartData,
    isCartLoading
} = cartSlice.selectors;