import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="bg-black text-white min-h-screen p-5 box-border">
      {children}
    </div>
  );
};

export default MainLayout; 