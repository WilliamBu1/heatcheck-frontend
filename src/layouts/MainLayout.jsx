import React from 'react';

// This MainLayout is for global styles like background and min-height for ALL pages.
const MainLayout = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* p-5 and box-border can be added here if truly global, or handled by individual pages/layouts if more specific control is needed */}
      {children}
    </div>
  );
};

export default MainLayout; 