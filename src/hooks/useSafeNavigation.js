import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

/**
 * Custom hook that provides safe navigation using startTransition
 * to prevent synchronous suspension errors when navigating to lazy-loaded components
 */
export const useSafeNavigation = () => {
  const navigate = useNavigate();

  const safeNavigate = (path, options = {}) => {
    startTransition(() => {
      navigate(path, options);
    });
  };

  return { navigate: safeNavigate, originalNavigate: navigate };
};
