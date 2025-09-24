// src/router/routes/features.js
import { lazy } from 'react';

// Lazy load all feature pages
const ChannelConnection = lazy(() => import('../../features/Chat/ChannelConnection.jsx'));
const ChatbotDemo = lazy(() => import('../../features/Chat/ChatbotDemo.jsx'));
const ContactForm = lazy(() => import('../../Component/Form/Form.jsx'));
const ActiveEmail = lazy(() => import('../../pages/auth/ResetPassword/ActiveEmail/ActiveEmail.jsx'));
const Settings = lazy(() => import('../../Component/ControlPanel/Settings.jsx'));
const Testing = lazy(() => import('../../Component/Testing/Testing.jsx'));

export const featureRoutes = [
  { path: "ChannelConnection", element: <ChannelConnection /> },
  { path: "ChatbotDemo", element: <ChatbotDemo /> },
  { path: "ContactForm", element: <ContactForm /> },
  { path: "ActiveEmail", element: <ActiveEmail /> },
  { path: "Settings", element: <Settings /> },
  { path: "Testing", element: <Testing /> },
];
