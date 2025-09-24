import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Get API data
export const GetDataApi = createAsyncThunk("GetProfile/Api", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/Profile`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
});
const initialState = {
  Items: [],
  isLoading: false,
  isError: null,
};

// Slice
export const ProfileData = createSlice({
  name: "Profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetDataApi.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(GetDataApi.fulfilled, (state, action) => {
        state.Items = action.payload;
        state.isLoading = false;
      })
      .addCase(GetDataApi.rejected, (state, action) => {
        state.isError = action.error.message;
        state.isLoading = false;
      });
  },
});

// ✅ هذا هو الـ reducer الصحيح اللي تستخدمه في الـ store
export default ProfileData.reducer;
