import assets from "@/assets"
import DashboardOverviewOrders from "@/components/PageComponents/UserPage/DashboardUser/DashboardOverviewOrders"
import RevenueChart from "@/components/PageComponents/UserPage/DashboardUser/RevenueChart"

function DashboardUser() {
    const profileUser = JSON.parse(localStorage.getItem("profile") as string)
    return (
        <div className="bg-white h-auto w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <h1 className="mb-4 mt-2 text-lg font-bold text-gray-700 ">
                Dashboard Overview
            </h1>
            <DashboardOverviewOrders />

            <div className="flex">
                <div className="w-1/3 mr-3">
                    <h2 className="my-3 text-base font-normal text-gray-700 ">
                        Your coin
                    </h2>
                    <div className=" mr-0 bg-btnActive min-h-20 flex items-center p-3 rounded-lg">
                        <p className="text-white min-w-32 text-lg">Your coin: {profileUser?.coin}</p>
                        <img src={assets?.images?.coin} alt="coin" className="max-w-52 w-full h-full object-contain -ml-3" loading="lazy" />
                    </div>
                </div>
                <div className="w-2/3">
                    <h2 className="my-3 text-base font-normal text-gray-700 ">
                        Chart
                    </h2>
                    <RevenueChart />
                </div>
            </div>
        </div>
    )
}

export default DashboardUser