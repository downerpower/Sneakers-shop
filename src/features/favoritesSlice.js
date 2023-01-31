import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: []
}

export const favoritesSlice = createSlice({
   name: 'favorites',
   initialState,
   reducers: {
      addToFavorites: (state, action) => {
         state.value.push(action.payload)
      },
      removeFromFavorites: (state, action) => {
         state.value.splice(state.value.findIndex(item => item.id === action.payload), 1)
      }
   }
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;