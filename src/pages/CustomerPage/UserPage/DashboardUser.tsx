// import assets from "@/assets"
import OrderChart from "@/components/PageComponents/UserPage/DashboardUser/OrderChart"
import RevenueChart from "@/components/PageComponents/UserPage/DashboardUser/RevenueChart"
import { configRouter } from "@/configs/router";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function DashboardUser() {
    const nav = useNavigate()
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );

    useEffect(() => {
        if (!currentUser?.success && !currentUser?.data?.userId || !currentUser) {
            nav(configRouter.login)
            toast.warning("Please login to continue using website services!")
        }
    }, [])
    // const profileUser = JSON.parse(localStorage.getItem("profile") as string)
    return (
        <div className="bg-white h-auto w-full mt-5 sm:mt-0 sm:w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <h1 className="mb-4 mt-2 text-lg font-bold text-gray-700 ">
                Statistics Overview
            </h1>
            <div className="flex">
                <div className="w-full">
                    <h2 className="my-3 text-base font-semibold text-gray-700 ">
                        Tracking amount paid
                    </h2>
                    <RevenueChart />
                </div>
            </div>

            <div className="flex">
                <div className="w-full">
                    <h2 className="my-3 text-base font-semibold text-gray-700 ">
                        Tracking amount order
                    </h2>
                    <OrderChart />
                </div>
            </div>
        </div>
    )
}

export default DashboardUser