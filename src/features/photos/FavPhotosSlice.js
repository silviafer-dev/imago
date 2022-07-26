import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  photos: JSON.parse(localStorage.getItem("favoritePhoto")) ?? [],
};

const favPhotosSlice = createSlice({
  name: "favPhotos",
  initialState,
  reducers: {
    addPhoto(state, action) {
      state.photos.push(action.payload);
      localStorage.setItem("favoritePhoto", JSON.stringify(state.photos));
      console.log(state.photos, "action");
    },
    removePhoto(state, action, id) {
      const newState = state.photos.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("favoritePhoto", JSON.stringify(newState));
      return { ...state, photos: newState };
    },
  },
});

export const { addPhoto } = favPhotosSlice.actions;
export const { removePhoto } = favPhotosSlice.actions;
export default favPhotosSlice.reducer;

export const selectFavoriteState = (state) => state.favorites.photos;
