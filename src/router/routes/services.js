// src/router/routes/services.js
import { lazy } from 'react';

// Lazy load all service pages
const LandingPageCustomeService = lazy(() => import('../../pages/landingPages/LandingPageCustomeService/LandingPageCustomeService.jsx'));
const CanceledOrders = lazy(() => import('../../pages/dashboard/customerServices/CanceledOrders/CanceledOrders.jsx'));
const DoneOrders = lazy(() => import('../../pages/dashboard/customerServices/DoneOrders/DoneOrders.jsx'));
const AllOrderTransfers = lazy(() => import('../../pages/dashboard/customerServices/AllOrderTransfers/AllOrderTransfers.jsx'));
const AllOrderDeleted = lazy(() => import('../../pages/dashboard/customerServices/AllOrderDeleted/AllOrderDeleted.jsx'));
const Mokhalseen = lazy(() => import('../../pages/auth/Mokhalseen/Mokhalseen.jsx'));

export const serviceRoutes = [
  { path: "LandingPageCustomeService", element: <LandingPageCustomeService /> },
  { path: "canceledOrders", element: <CanceledOrders /> },
  { path: "DoneOrders", element: <DoneOrders /> },
  { path: "AllOrderTransfers", element: <AllOrderTransfers /> },
  { path: "AllOrderDeleted", element: <AllOrderDeleted /> },
  { path: "mokhalseen", element: <Mokhalseen /> },
];
