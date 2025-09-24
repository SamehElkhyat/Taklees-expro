import React from 'react';
import { useOrderManagement } from './hooks/useOrderManagement';
import { useDataProcessing } from './hooks/useDataProcessing';

const TestHooks = () => {
  const orderManagement = useOrderManagement();
  const dataProcessing = useDataProcessing([], '', 'id');
  
  return <div>Test hooks loaded successfully</div>;
};

export default TestHooks;
