import React from "react";

interface LayoutProps {
  children?: React.ReactNode;
}
const BlankLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen">
      <main className="h-full w-full bg-blue-700/10 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default BlankLayout;
