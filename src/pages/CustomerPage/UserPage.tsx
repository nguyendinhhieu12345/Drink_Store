import TabListUser from "@/components/TabListUser/TabListUser"
import { configRouter } from "@/configs/router"
import { useLocation } from "react-router-dom"
import DashboardUser from "./UserPage/DashboardUser"
import MyOrderOfUser from "./UserPage/MyOrderOfUser"
import ProfileUser from "./UserPage/ProfileUser"
import ChangePasswordUser from "./UserPage/ChangePasswordUser"
import DefaultAddress from "./UserPage/DefaultAddress"
import HistoryCoin from "./UserPage/HistoryCoin"

function UserPage() {
    const location = useLocation()

    const renderComponentFollowLocation = () => {
        if (location.pathname === configRouter.dashboard) {
            return <DashboardUser />
        }
        if (location.pathname === configRouter.myOrder) {
            return <MyOrderOfUser />
        }
        if (location.pathname === configRouter.profile) {
            return <ProfileUser />
        }
        if (location.pathname === configRouter.changePassword) {
            return <ChangePasswordUser />
        }
        if (location.pathname === configRouter.defaultAddress) {
            return <DefaultAddress />
        }
        if (location.pathname === configRouter.historyCoin) {
            return <HistoryCoin />
        }
    }

    return (
        <div className="h-auto mt-25 px-5 sm:px-5 xl:px-20">
            <div className="flex flex-col sm:flex-row w-full">
                <TabListUser />
                {renderComponentFollowLocation()}
            </div>
        </div>
    )
}

export default UserPage