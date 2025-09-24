import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// Get API data
export const GetSaberCertificate = createAsyncThunk(
  "GetSaberCertificate/Api",
  async (page) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL_MICROSERVICE4}/Get-Saber-CertificatesById/${page}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  }
);
const initialState = {
  Items: [],
  isLoading: false,
  isError: null,
};
// Slice
export const SaberCertificateData = createSlice({
  name: "SaberCertificate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSaberCertificate.pending, (state) => {
        console.log("pending");
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(GetSaberCertificate.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.Items = action.payload;
        state.isLoading = false;
      })
      .addCase(GetSaberCertificate.rejected, (state, action) => {
        console.log("rejected");
        state.isError = action.error.message;
        state.isLoading = false;
      });
  },
});
export default SaberCertificateData.reducer;