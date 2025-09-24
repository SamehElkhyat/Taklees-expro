// src/router/routes/certificates.js
import { lazy } from 'react';

// Lazy load all certificate pages
const SubmitSaberCertificate = lazy(() => import('../../pages/dashboard/user/SubmitSaberCertificate/SubmitSaberCertificate.jsx'));
const AllSaberCertificates = lazy(() => import('../../pages/dashboard/user/AllSaberCertificates/AllSaberCertificates.jsx'));
const LandingPageSaber = lazy(() => import('../../pages/landingPages/LandingPageSaber/LandingPageSaber.jsx'));
const AllSaberCertificationsCompany = lazy(() => import('../../pages/dashboard/saber/allSaberCertifications/AllSaberCertificationsCompany.jsx'));

export const certificateRoutes = [
  { path: "Submit-SABER-Certificate", element: <SubmitSaberCertificate /> },
  { path: "AllSaberCertificates", element: <AllSaberCertificates /> },
  { path: "LandingPageSaber", element: <LandingPageSaber /> },
  { path: "AllSaberCertificationsCompany", element: <AllSaberCertificationsCompany /> },
];
