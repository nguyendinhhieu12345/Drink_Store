import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import * as authApi from "../../api/authApi/authApi";
import { toast } from "react-toastify";
import { messageToast } from "@/utils/hepler";
import { AxiosError } from "axios";
import useLoading from "@/hooks/useLoading";
import { Spinner } from "@material-tailwind/react";

function ResetPassword() {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const nav = useNavigate();
    const emailForgetPass = JSON.parse(localStorage.getItem("emailForgetPass") as string)
    const { isLoading, startLoading, stopLoading } = useLoading()

    useEffect(() => {
        console.log(emailForgetPass)
        document.title = "Shopfee | Reset Password";
    }, []);

    const handleResetPass = async () => {
        if (password === "" || confirmPassword === "") {
            toast.error(messageToast?.fillInput);
            inputRef.current?.focus();
        } else {
            if (password !== confirmPassword) {
                toast.error("Password doesn't match!!!");
                inputRef.current?.focus();
            } else {
                try {
                    startLoading()
                    const data = await authApi.resetPassword(emailForgetPass?.email?.email, emailForgetPass?.code, password);
                    if (data?.success) {
                        stopLoading()
                        toast.success(data?.message);
                        localStorage.removeItem("emailForgetPass")
                        nav(configRouter.login);
                    }
                } catch (e: unknown) {
                    stopLoading()
                    if (e instanceof AxiosError && e.response) {
                        toast.error(e.response.data?.message);
                    }
                }
            }
        }
    };

    return (
        <div className="h-full w-full bg-gray-400">
            <div className="w-1/2 h-auto flex flex-col justify-center color-black shadow-md absolute top-[20%] left-1/4 bg-white rounded-lg">
                <div className="m-3">
                    <h1 className="text-xl font-semibold italic">Reset Password</h1>
                </div>
                <div className="mb-3 mx-3">
                    <p className="text-sm italic">New password</p>
                </div>
                <div className="mb-3 mx-3">
                    <input
                        type="password"
                        ref={inputRef}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Enter new password..."
                        className="p-2 w-full text-black border border-solid border-gray-300 outline-none rounded-md"
                    />
                </div>
                <div className="mb-3 mx-3">
                    <p className="text-sm italic">Confirm new password</p>
                </div>
                <div className="mb-3 mx-3">
                    <input
                        type="password"
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        placeholder="Enter confirm new password..."
                        className="p-2 text-black border border-solid border-gray-300 outline-none w-full rounded-md"
                    />
                </div>
                <div className="flex flex-row justify-end mx-3 my-3">
                    <Link to={configRouter.login} className="text-sm italic text-blue-600">
                        Already have an account?
                    </Link>
                </div>
                <div className="flex flex-row justify-end mx-3 mb-3">
                    <button
                        className="bg-blue-500 text-white rounded px-4 py-2"
                        onClick={handleResetPass}
                    >
                        {isLoading ? <p className="flex items-center"><Spinner /> Confirm</p> : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
