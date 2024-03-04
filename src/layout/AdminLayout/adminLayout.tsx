import React, { useRef, useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import HeaderAdmin from "./HeaderAdmin";

interface LayoutProps {
  children?: React.ReactNode;
}
const AdminLayout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const ref = useRef(null);

  return (
    <div className="relative h-screen w-screen overflow-hidden flex">
      <SideBarAdmin ref={ref} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className={`h-full w-full  pl-0 transition-all delay-200`}>
        <HeaderAdmin setIsOpen={setIsOpen} />
        <main
          className={`w-full h-[calc(100%-64px)] bg-blue-700/10 overflow-auto md:pb-4 md:px-4 md:py-4`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
