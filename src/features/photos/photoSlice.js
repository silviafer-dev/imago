import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const accessKey = "5LfVRts4D2P9eRWo9qJGsl4ZUIGLn761Zgv_kTXULM0";
const endPointSearch = "https://api.unsplash.com/search/photos";

export const getPhoto = async (id) => {
  const apiGetPhoto = `https://api.unsplash.com/photos/${id}?client_id=${accessKey}`;
  const resp = await axios.get(apiGetPhoto);
  return resp.data;
};

export const fetchPhotos = createAsyncThunk(
  "posts/fetchPhotos",
  async (query = "") => {
    let url = `${endPointSearch}?query=${query}&client_id=${accessKey}&per_page=30`;
    if (query.length === 0) {
      url = `https://api.unsplash.com/photos/?client_id=5LfVRts4D2P9eRWo9qJGsl4ZUIGLn761Zgv_kTXULM0&per_page=30`;
      const response = await axios.get(url);
      return response.data;
    }

    const response = await axios.get(url);
    return response.data.results;
  }
);
const initialState = { results: [], status: "idle" };
const searchSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchPhotos.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.results = action.payload;
    });
  },
});

export default searchSlice.reducer;
export const selectState = (state) => state.searchPhotos.results;
