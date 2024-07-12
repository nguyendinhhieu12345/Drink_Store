import * as userApi from "@/api/PageApi/userApi"
import { configRouter } from "@/configs/router"
import useLoading from "@/hooks/useLoading"
import { RootState } from "@/redux/store"
import { User } from "@/type"
import { messageToast } from "@/utils/hepler"
import { Spinner } from "@material-tailwind/react"
import { AxiosError } from "axios"
import { ChangeEvent, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

function ChangePasswordUser() {
    const [password, setPassword] = useState<{
        oldPassword: string,
        newPassword: string,
        confirmNewPassword: string
    }>({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    })
    const { isLoading, startLoading, stopLoading } = useLoading()
    const useCurrentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );
    const nav = useNavigate()

    const onChangeInput = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        setPassword((prev: {
            oldPassword: string,
            newPassword: string,
            confirmNewPassword: string
        }) => ({
            ...prev,
            [key]: e.target.value.trim()
        }))
    }

    const handleChangePassword = async () => {
        if (password?.newPassword !== password?.confirmNewPassword) {
            toast.error("Please enter the same password!")
        }
        else {
            try {
                if (password?.newPassword.trim() !== "" && password?.confirmNewPassword.trim() !== "" && password?.oldPassword.trim() !== "") {
                    startLoading()
                    const data = await userApi.changePasswordUser(useCurrentUser?.data?.userId, password?.oldPassword, password?.newPassword)
                    if (data?.success) {
                        stopLoading()
                        toast.success(data?.message)
                        setPassword({
                            oldPassword: "",
                            newPassword: "",
                            confirmNewPassword: ""
                        })
                    }
                }
                else {
                    toast.error(messageToast.fillInput)
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    stopLoading()
                    toast.error(e?.response?.data?.message);
                }
            }
        }
    }

    useEffect(() => {
        if (!useCurrentUser?.success && !useCurrentUser?.data?.userId || !useCurrentUser) {
            nav(configRouter.login)
            toast.warning("Please login to continue using website services!")
        }
    }, [])

    return (
        <div className="bg-white h-auto w-full mt-5 sm:mt-0 sm:w-3/4 border border-gray-50 shadow-base rounded-md p-3">
            <h2 className="text-xl font-semibold mb-5">Change password</h2>
            <div className="md:grid-cols-6 md:gap-6">
                <div className="md:mt-0 md:col-span-2">
                    <div className="lg:mt-6 bg-white">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-6">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">Current Password</label>
                                <div className="relative">
                                    <input value={password?.oldPassword} onChange={(e) => onChangeInput("oldPassword", e)} name="Current Password" type="password" placeholder="Current Password" className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-green-500 h-11 md:h-12" />
                                </div>
                            </div>
                            <div className="col-span-6 sm:col-span-6">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">New Password</label>
                                <div className="relative">
                                    <input value={password?.newPassword} onChange={(e) => onChangeInput("newPassword", e)} name="currentPassword" type="password" placeholder="Current Password" className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-green-500 h-11 md:h-12" />
                                </div>
                            </div>
                            <div className="col-span-6 sm:col-span-6">
                                <label className="block text-gray-500 font-medium text-sm leading-none mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <input value={password?.confirmNewPassword} onChange={(e) => onChangeInput("confirmNewPassword", e)} name="newPassword" type="password" placeholder="New Password" className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-green-500 h-11 md:h-12" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 text-right">
                <button onClick={handleChangePassword} type="submit" className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-green-500 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-green-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto">
                    {isLoading ? (
                        <p className="flex items-center justify-center">
                            <span className="mr-2">Change Password</span>{" "}
                            <Spinner className="h-4 w-4" />
                        </p>
                    ) : (
                        <span>Change Password</span>
                    )}</button>
            </div>
        </div>
    )
}

export default ChangePasswordUser