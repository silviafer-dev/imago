import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collection: JSON.parse(localStorage.getItem("favoritePhoto")) ?? [],
};

const favPhotosSlice = createSlice({
  name: "favPhotos",
  initialState,
  reducers: {
    addPhoto(state, action) {
      state.collection.push(action.payload);
      localStorage.setItem("favoritePhoto", JSON.stringify(state.collection));
    },
    removePhoto(state, action) {
      const newStatePhotos = state.collection.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("favoritePhoto", JSON.stringify(newStatePhotos));
      return { ...state, collection: newStatePhotos };
    },

    updatePhoto(state, action) {
      const newStateDescription = state.collection.map((item) =>
        item.id === action.payload.id
          ? { ...item, description: action.payload.description }
          : item
      );
      localStorage.setItem(
        "favoritePhoto",
        JSON.stringify(newStateDescription)
      );
      return { ...state, collection: newStateDescription };
    },
  },
});

export const { addPhoto, removePhoto, updatePhoto } = favPhotosSlice.actions;

export default favPhotosSlice.reducer;

export const selectFavoriteState = (state) => state.favoritesPhotos.collection;
