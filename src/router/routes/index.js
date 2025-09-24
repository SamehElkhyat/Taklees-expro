// src/router/routes/index.js

// Export all route groups
export { authRoutes } from './auth';
export { dashboardRoutes } from './dashboard';
export { orderRoutes } from './orders';
export { certificateRoutes } from './certificates';
export { serviceRoutes } from './services';
export { featureRoutes } from './features';

// Export all routes as a single object
export const allRoutes = {
  auth: authRoutes,
  dashboard: dashboardRoutes,
  orders: orderRoutes,
  certificates: certificateRoutes,
  services: serviceRoutes,
  features: featureRoutes,
};

// Export all routes as a flat array
export const allRoutesFlat = [
  ...authRoutes,
  ...dashboardRoutes,
  ...orderRoutes,
  ...certificateRoutes,
  ...serviceRoutes,
  ...featureRoutes,
];

// Export route counts for debugging/analytics
export const routeCounts = {
  auth: authRoutes.length,
  dashboard: dashboardRoutes.length,
  orders: orderRoutes.length,
  certificates: certificateRoutes.length,
  services: serviceRoutes.length,
  features: featureRoutes.length,
  total: authRoutes.length + dashboardRoutes.length + orderRoutes.length + 
         certificateRoutes.length + serviceRoutes.length + featureRoutes.length,
};
