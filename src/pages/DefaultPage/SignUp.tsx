import assets from "@/assets";
import FromWrap from "@/components/FormWrap/FromWrap";
import InputWrap from "@/components/FormWrap/InputWrap";
import { configRouter } from "@/configs/router";
import useLoading from "@/hooks/useLoading";
import { HandWaving } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import * as signupApi from "@/api/authApi/authApi"
import { toast } from "react-toastify";
import { messageToast, toastError } from "@/utils/hepler";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

const SignUp = () => {
    const navigate = useNavigate();
    const { isLoading, startLoading, stopLoading } = useLoading()
    const { t } = useTranslation()

    const handleLogin = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        confirmPassword: string
    ) => {
        if (email.trim() !== "" && password.trim() !== "" && firstName.trim() !== "" && lastName.trim() !== "" && confirmPassword?.trim() !== "") {
            if (confirmPassword.trim() === password.trim()) {
                if (password.length >= 6) {
                    try {
                        startLoading()
                        const checkExisAccount = await signupApi.checkExistAccount(email)
                        if (checkExisAccount?.success && checkExisAccount?.data) {
                            stopLoading()
                            toast.error("Email is already registered!")
                        }
                    }
                    catch {
                        try {
                            const data = await signupApi.sendCodeRegister(email)
                            if (data?.success) {
                                stopLoading()
                                localStorage.setItem("user", JSON.stringify({
                                    email, password, firstName, lastName
                                }))
                                navigate(configRouter.optConfirm);
                            }
                        }
                        catch (e: unknown) {
                            stopLoading()
                            if (e instanceof AxiosError && e.response) {
                                toastError(e, "top-right")
                            }
                        }
                    }
                }
                else {
                    toast.error("Please enter password length less than 6 characters");
                }
            }
            else {
                toast.error("Please enter the same password!");
            }
        }
        else {
            toast.error(messageToast.fillInput)
        }
    };

    const handleRedirectLoginPage = () => {
        navigate(configRouter.login)
    }

    return (
        <div className="flex justify-center items-center h-screen bg-primary bg-[url('https://th.bing.com/th/id/R.2053e0d910bb9f2594ce2482e96070ec?rik=PLO4HYTyDm52hw&pid=ImgRaw&r=0')] bg-contain bg-repeat-round">
            <div className="w-[80%] h-[80%] bg-white flex rounded-2xl shadow-2xl">
                <div className="w-[35%] h-full">
                    <img
                        src={assets.images.imageLogin}
                        className="w-full h-full object-fill rounded-s-2xl"
                    />
                </div>
                <div className="w-[65%] h-full flex-initial flex flex-col items-center justify-center">
                    <div className="mb-8">
                        <div className="flex items-center justify-center">
                            <h1 className="text-3xl">{t("Hey, Welcome Back")} </h1>
                            <HandWaving size={32} color="#EFC806" weight="fill" />
                        </div>
                        <p className="text-sm">
                            {t("Create your account credentials to view your orders")}
                        </p>
                    </div>

                    <div className="w-[50%]">
                        <FromWrap
                            defaultValues={{
                                email: "",
                                password: "",
                                firstName: "",
                                lastName: "",
                                confirmPassword: ""
                            }}
                            onSubmit={(values) =>
                                handleLogin(
                                    (
                                        values as {
                                            password: string;
                                            email: string;
                                            firstName: string;
                                            lastName: string;
                                            confirmPassword: string
                                        }
                                    ).email,
                                    (
                                        values as {
                                            password: string;
                                            email: string;
                                            firstName: string;
                                            lastName: string;
                                            confirmPassword: string
                                        }
                                    ).password,
                                    (
                                        values as {
                                            password: string;
                                            email: string;
                                            firstName: string;
                                            lastName: string;
                                            confirmPassword: string
                                        }
                                    ).firstName,
                                    (
                                        values as {
                                            password: string;
                                            email: string;
                                            firstName: string;
                                            lastName: string;
                                            confirmPassword: string
                                        }
                                    ).lastName,
                                    (
                                        values as {
                                            password: string;
                                            email: string;
                                            firstName: string;
                                            lastName: string;
                                            confirmPassword: string
                                        }
                                    ).confirmPassword
                                )
                            }
                            className="flex flex-col justify-center items-center"
                        >
                            <div className="mb-5 flex w-full">
                                <div className="w-[50%] mr-2">
                                    <p className="font-semibold text-base">{t("First Name")}</p>
                                    <InputWrap
                                        formField={{ name: "firstName" }}
                                        className="border-2 border-gray-500 w-full rounded-md h-10 pl-3 hover:border-blue-500"
                                    />
                                </div>
                                <div className="w-[50%]">
                                    <p className="font-semibold text-base">{t("Last Name")}</p>
                                    <InputWrap
                                        formField={{ name: "lastName" }}
                                        className="border-2 border-gray-500 w-full rounded-md h-10 pl-3 hover:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="mb-5 w-full">
                                <p className="font-semibold text-base">Email</p>
                                <InputWrap
                                    type="email"
                                    formField={{ name: "email" }}
                                    className="border-2 border-gray-500 w-full rounded-md h-10 pl-3 hover:border-blue-500"
                                />
                            </div>

                            <div className="w-full">
                                <p className="font-semibold text-base">{t("Password")}</p>
                                <InputWrap
                                    formField={{ name: "password" }}
                                    type="password"
                                    className="border-2 border-gray-500 w-full rounded-md h-10 pl-3 pr-3 hover:border-blue-500"
                                />
                            </div>

                            <div className="w-full mt-5">
                                <p className="font-semibold text-base">{t("Confirm Password")}</p>
                                <InputWrap
                                    formField={{ name: "confirmPassword" }}
                                    type="password"
                                    className="border-2 border-gray-500 w-full rounded-md h-10 pl-3 pr-3 hover:border-blue-500"
                                />
                            </div>

                            <div className="flex space-x-5 mt-5">
                                <button
                                    type="submit"
                                    className="w-90 h-10 text-white rounded-lg bg-[#5D4037] opacity-80 hover:opacity-100 active:opacity-100 focus:opacity-100"
                                >
                                    {isLoading && (
                                        <svg
                                            aria-hidden="true"
                                            role="status"
                                            className="inline w-4 h-4 me-3 text-white animate-spin"
                                            viewBox="0 0 100 101"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="#E5E7EB"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    )}
                                    {t("Sign up")}
                                </button>
                            </div>
                        </FromWrap>
                        <div className="flex items-center justify-center mt-4">
                            <p className="text-sm italic">
                                {t("Have an account?")}{" "}
                                <span
                                    className="text-blue-500 cursor-pointer"
                                    onClick={handleRedirectLoginPage}
                                >
                                    {t("Login")}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center space-x-3 mt-4">
                            <div className="h-px flex-1 bg-gray-200 dark:bg-navy-500"></div>
                            <p>{t("OR")}</p>
                            <div className="h-px flex-1 bg-gray-200 dark:bg-navy-500"></div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <a href="/" className="text-sm italic">
                                {t("Continue as guest")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
