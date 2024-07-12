import React from "react";
import Header from "../../components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useLocation } from "react-router-dom";
// import DownloadApp from "./DownloadApp";
interface LayoutProps {
    children?: React.ReactNode;
}
const DefaultLayout = ({ children }: LayoutProps) => {
    const location = useLocation();

    return (
        <div className="relative h-full w-screen min-h-screen overflow-y-auto">
            {/* <DownloadApp /> */}
            {/* hidden sm:block  */}
            <div className={`h-full w-full pl-0 transition-all delay-200`}>
                <Header />
                <main
                    className={`w-full h-auto ${location.pathname === "/" && "bg-blue-600/10"
                        } overflow-auto md:pb-4 md:px-4 md:py-4`}
                >
                    {children}
                </main>
                {location.pathname === "/" && <Footer />}
            </div>
        </div>
    );
};

export default DefaultLayout;
