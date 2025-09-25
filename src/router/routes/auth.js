// src/router/routes/auth.js
import { lazy } from 'react';

// Lazy load all auth pages
const SignIn = lazy(() => import('../../pages/auth/SignIn/SignIn.jsx'));
const SignUp = lazy(() => import('../../pages/auth/SignUp/SignUp.jsx'));
const SignUpForCompany = lazy(() => import('../../pages/auth/SignUpForCompany/SignUpForCompany.jsx'));
const SignUpForMokhalseen = lazy(() => import('../../pages/auth/SignUpForMokhalseen/SignUpForMokhalseen.jsx'));
const ResetPassword = lazy(() => import('../../pages/auth/ResetPassword/ResetPassword.jsx'));
const ConfirmPassword = lazy(() => import('../../pages/auth/ResetPassword/ConfirmPassowrd/ConfirmPassword.jsx'));
const IntroSignIn = lazy(() => import('../../pages/auth/IntorSignIn/IntorSignIn.jsx'));
const IntroSignUp = lazy(() => import('../../pages/auth/IntorSignUp/IntorSignUp.jsx'));

export const authRoutes = [
  { path: "SignIn", element: <SignIn /> },
  { path: "SignUp", element: <SignUp /> },
  { path: "SignUpForCompany", element: <SignUpForCompany /> },
  { path: "SignUpForMokhalseen", element: <SignUpForMokhalseen /> },
  { path: "ResetPassword", element: <ResetPassword /> },
  { path: "ConfirmPassword", element: <ConfirmPassword /> },
  { path: "IntorSignUp", element: <IntroSignUp /> },
  { path: "IntorSignIn", element: <IntroSignIn /> },
];
