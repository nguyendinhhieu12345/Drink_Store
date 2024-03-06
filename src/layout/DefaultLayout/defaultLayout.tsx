import React from "react";
import Header from "../../components/Header/Header";
import Footer from "@/components/Footer/Footer";
interface LayoutProps {
  children?: React.ReactNode;
}
const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative h-full w-screen min-h-screen overflow-y-auto">
      <div className={`h-full w-full pl-0 transition-all delay-200`}>
        <Header />
        <main className="w-full h-auto bg-blue-700/10 overflow-auto md:pb-4 md:px-4 md:py-4">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
