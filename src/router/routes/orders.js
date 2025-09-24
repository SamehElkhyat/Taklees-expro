// src/router/routes/orders.js
import { lazy } from 'react';

// Lazy load all order pages
const NewOrder = lazy(() => import('../../pages/dashboard/user/NewOrder/NewOrder.jsx'));
const Orders = lazy(() => import('../../pages/dashboard/user/Orders/Orders.jsx'));
const OrderDetailsForUser = lazy(() => import('../../pages/dashboard/user/OrderDetailsForUser/OrderDetailsForUser.jsx'));
const CurrentOrdersForUsers = lazy(() => import('../../pages/dashboard/user/CurrentOrdersForUsers/CurrentOrdersForUsers.jsx'));
const DoneOrdersForUser = lazy(() => import('../../pages/dashboard/user/DoneOrdersforUSer/DoneOrdersForUser.jsx'));
const HistoryOfOrdersUsers = lazy(() => import('../../pages/dashboard/user/HistoryOfOrdersUsers/HistoryOfOrdersUsers.jsx'));
const Tracking = lazy(() => import('../../pages/dashboard/user/Tracking/Tracking.jsx'));

export const orderRoutes = [
  { path: "NewOrder", element: <NewOrder /> },
  { path: "Orders", element: <Orders /> },
  { path: "OrderDetailsForUser/:id", element: <OrderDetailsForUser /> },
  { path: "CurrentOrdersForUsers", element: <CurrentOrdersForUsers /> },
  { path: "DoneOrdersForUser", element: <DoneOrdersForUser /> },
  { path: "HistoryOfOrdersUsers", element: <HistoryOfOrdersUsers /> },
  { path: "Tracking/:id", element: <Tracking /> },
];
