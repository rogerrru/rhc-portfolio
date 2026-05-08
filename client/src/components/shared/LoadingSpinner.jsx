import React from 'react';

const LoadingSpinner = ({ fullPage = false }) => {
  const spinner = (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
    </div>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        {spinner}
      </div>
    );
  }
  return spinner;
};

export default LoadingSpinner;
