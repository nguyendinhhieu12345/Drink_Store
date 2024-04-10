import TabListUser from "@/components/TabListUser/TabListUser"
import { configRouter } from "@/configs/router"
import { useLocation } from "react-router-dom"
import DashboardUser from "./UserPage/DashboardUser"
import MyOrderOfUser from "./UserPage/MyOrderOfUser"
import ProfileUser from "./UserPage/ProfileUser"
import ChangePasswordUser from "./UserPage/ChangePasswordUser"
import DefaultAddress from "./UserPage/DefaultAddress"

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
    }

    return (
        <div className="h-auto mt-25 mx-20">
            <div className="flex w-full">
                <TabListUser />
                {renderComponentFollowLocation()}
            </div>
        </div>
    )
}

export default UserPage