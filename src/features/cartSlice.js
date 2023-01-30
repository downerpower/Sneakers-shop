import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: []
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         state.value.push(action.payload)
      },
      removeFromCart: (state, action) => {
         // state.value.filter(item => item.id !== action.payload.id)
         state.value.splice(state.value.findIndex(item => item.id === action.payload), 1)
      }
   }
})

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;