// src/router/routes/auth.js
import { retryLazyLoad } from '../../Component/ErrorBoundary/LazyComponentWrapper';
import LazyComponentWrapper from '../../Component/ErrorBoundary/LazyComponentWrapper';

// Lazy load all auth pages with retry mechanism
const SignIn = retryLazyLoad(() => import('../../pages/auth/SignIn/SignIn.jsx'));
const SignUp = retryLazyLoad(() => import('../../pages/auth/SignUp/SignUp.jsx'));
const SignUpForCompany = retryLazyLoad(() => import('../../pages/auth/SignUpForCompany/SignUpForCompany.jsx'));
const SignUpForMokhalseen = retryLazyLoad(() => import('../../pages/auth/SignUpForMokhalseen/SignUpForMokhalseen.jsx'));
const ResetPassword = retryLazyLoad(() => import('../../pages/auth/ResetPassword/ResetPassword.jsx'));
const ConfirmPassword = retryLazyLoad(() => import('../../pages/auth/ResetPassword/ConfirmPassowrd/ConfirmPassword.jsx'));
const IntroSignIn = retryLazyLoad(() => import('../../pages/auth/IntorSignIn/IntorSignIn.jsx'));
const IntroSignUp = retryLazyLoad(() => import('../../pages/auth/IntorSignUp/IntorSignUp.jsx'));

export const authRoutes = [
  { path: "SignIn", element: <LazyComponentWrapper><SignIn /></LazyComponentWrapper> },
  { path: "SignUp", element: <LazyComponentWrapper><SignUp /></LazyComponentWrapper> },
  { path: "SignUpForCompany", element: <LazyComponentWrapper><SignUpForCompany /></LazyComponentWrapper> },
  { path: "SignUpForMokhalseen", element: <LazyComponentWrapper><SignUpForMokhalseen /></LazyComponentWrapper> },
  { path: "ResetPassword", element: <LazyComponentWrapper><ResetPassword /></LazyComponentWrapper> },
  { path: "ConfirmPassword", element: <LazyComponentWrapper><ConfirmPassword /></LazyComponentWrapper> },
  { path: "IntorSignUp", element: <LazyComponentWrapper><IntroSignUp /></LazyComponentWrapper> },
  { path: "IntorSignIn", element: <LazyComponentWrapper><IntroSignIn /></LazyComponentWrapper> },
];
