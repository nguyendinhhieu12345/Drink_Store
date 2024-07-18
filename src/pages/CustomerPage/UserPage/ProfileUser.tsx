import InputImage from "@/components/PageComponents/UserPage/UpdateProfileUser/InputImage";
import InputInformation from "@/components/PageComponents/UserPage/UpdateProfileUser/InputInformation";
import { configRouter } from "@/configs/router";
import { RootState } from "@/redux/store";
import { User } from "@/type";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProfileUser() {
    const nav = useNavigate()
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );
    const { t } = useTranslation()

    useEffect(() => {
        if (!currentUser?.success && !currentUser?.data?.userId || !currentUser) {
            nav(configRouter.login)
            toast.warning("Please login to continue using website services!")
        }
    }, [])

    return (
        <div className="bg-white h-auto w-full mt-5 sm:mt-0 sm:w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                    <div className="px-4 sm:px-0">
                        <h2 className="text-xl font-semibold mb-5">{t("Update profile")}</h2>
                    </div>
                </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
                <InputImage />
                <InputInformation />
            </div>
        </div>
    )
}

export default ProfileUser