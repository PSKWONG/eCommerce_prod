

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



/*************** Create Order Slice ****************** */
/*
//Data Checking template 
const dataCheckingTemplate = {
    server: (() => {

        const templateArray = [];

        (orderProcess ?? []).forEach((step) => {
            templateArray.push(step.ref)
        });

        //Checking 
        console.log(`Data Checking Tempalte for server: ${JSON.stringify(templateArray, null, 2)}`)

        return templateArray;
    })(),
    store: Array((orderProcess ?? []).length).fill(false),
}
*/



/*************** States Default Values ****************** */

//Data Checking template 
const defaultProgressChecking = Array((orderProcess ?? []).length).fill(false); 

// Default Order States
export const orderDataTemplate = {
    data: {
        progressChecking: [...defaultProgressChecking]
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
        resetOrder: (state) => {
            state = { ...orderDataTemplate };
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
                state.data.progressChecking = action?.payload?? defaultProgressChecking; 
            })
            .addCase(progressChecking.rejected, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = true;
                state.status.errorMsg = action.error.message;
                state.data.progressChecking = defaultProgressChecking; 
            })
    },
    selectors: {
        selectProgressChecking: (state) => state.data.progressChecking,
        isOrderLoading: (state) => state.status.isLoading
    }
})


/*************** Export Slice ****************** */
//Export Reducer to Store 
export default orderSlice.reducer;

//Export Actions 
export const {
    resetOrder
} = orderSlice.actions;

//Export Store State
export const {
    selectProgressChecking,
    isOrderLoading
} = orderSlice.selectors;