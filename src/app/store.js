import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from '../features/favoritesSlice';
import cartReducer from '../features/cartSlice';

export const store = configureStore({
   reducer: {
      favorites: favoritesReducer,
      cart: cartReducer
   }
})