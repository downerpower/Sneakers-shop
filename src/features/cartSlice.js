import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: []
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         state.value.push(action.payload);
      },
      removeFromCart: (state, action) => {
         state.value.splice(state.value.findIndex(item => item.id === action.payload), 1)
      },
      emptyCart: (state, action) => {
         state.value.splice(0, state.value.length)
      }
   }
})

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;