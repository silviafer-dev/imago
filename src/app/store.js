import { configureStore } from "@reduxjs/toolkit";

import photoReducer from "../features/photos/photoSlice";

export const store = configureStore({
  reducer: {
    photos: photoReducer,
  },
});
