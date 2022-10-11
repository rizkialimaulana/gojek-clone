import { configureStore } from "@reduxjs/toolkit";
import basketReducer from './features/basketSlice';
import restaurantReducer from './features/RestaurantSlice'
export const Store = configureStore( {
    reducer: {
        basket : basketReducer,
        restaurant : restaurantReducer
    }
})