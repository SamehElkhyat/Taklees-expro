import { configureStore } from "@reduxjs/toolkit";
import  profileReducerData  from "../Slice/GetDataApiReducer";
import SaberCertificateData from "../Slice/SaberCertificateReducer";
import AllSaberCertificationsData from "../Slice/allSaberCertifications";
export const store = configureStore({
  reducer: {
    Profile: profileReducerData,
    SaberCertificate: SaberCertificateData,
    AllSaberCertifications: AllSaberCertificationsData,
  },
});
