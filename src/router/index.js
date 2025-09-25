import { createBrowserRouter } from "react-router-dom";
import Layout from "../Component/Layout/Layout.jsx";
import LandingPage from "../pages/landingPages/LandingPage/LandingPage.jsx";
import NotFound from "../Component/NotFound.jsx";

// Import all route groups
import { authRoutes } from "./routes/auth";
import { dashboardRoutes } from "./routes/dashboard";
import { orderRoutes } from "./routes/orders";
import { certificateRoutes } from "./routes/certificates";
import { serviceRoutes } from "./routes/services";
import { featureRoutes } from "./routes/features";
import { navbarRoutes } from "./routes/navbar";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      // Main landing page
      { path: "", element: <LandingPage /> },
      
      // All route groups
      ...authRoutes,
      ...dashboardRoutes,
      ...orderRoutes,
      ...certificateRoutes,
      ...serviceRoutes,
      ...featureRoutes,
      ...navbarRoutes,
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
