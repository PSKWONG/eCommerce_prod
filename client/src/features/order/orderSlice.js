

/*

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



/***************Import External Modules****************** */
import { createSlice } from '@reduxjs/toolkit';

/***************Import Internal Modules****************** */
//import loadAndSync from './middlewares/loadAndSync'; 
import orderProcess from './data/menuItems.json';
import progressChecking from './middlewares/progressChecking';
import dataChecking from './middlewares/dataChecking';
import cancelOrder from './middlewares/cancelOrder'; 


/*************** States Default Values ****************** */

//Data Checking template 
const defaultProgressChecking = Array((orderProcess ?? []).length).fill(false);

// Default Order States
export const orderDataTemplate = {
    data: {
        progressChecking: [...defaultProgressChecking],
        orderData: {}
    },
    status: {
        isLoading: false,
        isError: false,
        errorMsg: [],
    }
}


/*************** Construction of Order Slices  ****************** */
const orderSlice = createSlice({
    name: 'order',
    initialState: { ...orderDataTemplate },
    reducers: {
        updateOrderData: (state, action) => {
            const { currentIndex, sectionData } = action?.payload ?? {};

            if (!currentIndex || !sectionData) {
                return;
            } else {
                const updateData = {
                    ...state.data.orderData,
                    [orderProcess[currentIndex].ref]: sectionData
                };
                state.data.orderData = updateData;
                console.log(`Updated Order Data: ${JSON.stringify(state.data.orderData, null , 2)}`); 
            }

        },
        resetOrder: (state) => {
            state = { ...orderDataTemplate };
        },
        setError: (state, action) => {

            const errorChecking = action.payload?.length > 0 ?? false

            state.status.isError = errorChecking ? true : false;
            state.status.errorMsg = errorChecking ? action.payload : [];

        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(progressChecking.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(progressChecking.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.data.progressChecking = action?.payload ?? defaultProgressChecking;
            })
            .addCase(progressChecking.rejected, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = true;
                state.status.errorMsg = action?.error?.message;
                state.data.progressChecking = defaultProgressChecking;
            })
            .addCase(dataChecking.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(dataChecking.fulfilled, (state) => {
                state.status.isLoading = false;
                state.status.isError = false;
            })
            .addCase(dataChecking.rejected, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = true;
                state.status.errorMsg = action?.payload;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(cancelOrder.fulfilled, (state) => {
                state.status.isLoading = false;
                state.status.isError = false;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = true;
                state.status.errorMsg = action?.payload;
            })
    },
    selectors: {
        selectProgressChecking: (state) => state.data.progressChecking,
        selectOrderData: (state) => state.data.orderData,
        selectErrorMsg: (state) => state.status.errorMsg,
        isOrderLoading: (state) => state.status.isLoading
    }
})


/*************** Export Slice ****************** */
//Export Reducer to Store 
export default orderSlice.reducer;

//Export Actions 
export const {
    updateOrderData,
    resetOrder,
    setError
} = orderSlice.actions;

//Export Store State
export const {
    selectProgressChecking,
    selectOrderData,
    selectErrorMsg,
    isOrderLoading
} = orderSlice.selectors;