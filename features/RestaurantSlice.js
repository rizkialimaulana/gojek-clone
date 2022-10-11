import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: {
    id: null,
    imgURL: null,
    title: null,
    rating: null,
    genre: null,
    address: null,
    desc: null,
    dishes: null
  },
};

export const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    setRestaurant : (state, action) => {
        state.restaurants = action.payload
    }
  },
});

export const { setRestaurant } = restaurantSlice.actions;
export const selectRestaurant = (state) => state.restaurant.restaurants;
export default restaurantSlice.reducer;
