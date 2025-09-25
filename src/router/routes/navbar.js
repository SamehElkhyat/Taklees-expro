// src/router/routes/navbar.js
import { lazy } from 'react';

// Lazy load all feature pages
const About = lazy(() => import('../../Component/NavBarTabs/About/about.jsx'));
const Services = lazy(() => import('../../Component/NavBarTabs/Services/Services.jsx'));
const Contact = lazy(() => import('../../Component/NavBarTabs/Contact/Contact.jsx'));

export const navbarRoutes = [
  { path: "about", element: <About /> },
  { path: "services", element: <Services /> },
  { path: "contact", element: <Contact /> },
];
