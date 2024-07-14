import { configRouter } from "@/configs/router";
import { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as signupApi from "@/api/authApi/authApi"
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { signup } from "@/features/auth/authSlice";
import { messageToast, toastError } from "@/utils/hepler";

function OTPPage() {

    const [inputs, setInputs] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState<number>(30);
    const DataSignUp = JSON.parse(localStorage.getItem("user") as string)
    const emailForgetPass = JSON.parse(localStorage.getItem("emailForgetPass") as string)
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value)) {
            const newInputs = [...inputs];
            newInputs[index] = value;
            setInputs(newInputs);
        } else {
            e.preventDefault();
        }

        if (
            index < inputs.length - 1 &&
            value.trim() !== "" &&
            /^[0-9]$/.test(value)
        ) {
            inputRefs.current[index + 1].focus();
        } else {
            e.preventDefault();
        }
    };

    const handleConfirmOTP = async () => {
        try {
            if (inputs.join("").trim().length === 6) {
                const data = await signupApi.verifyCode(emailForgetPass?.email ? emailForgetPass?.email : DataSignUp?.email, inputs.join(""))
                if (data?.success) {
                    if (emailForgetPass) {
                        localStorage.setItem("emailForgetPass", JSON.stringify({
                            email: emailForgetPass,
                            code: inputs.join("")
                        }))
                        navigate(configRouter.resetPassword)
                    }
                    else {
                        const result = await dispatch(signup({
                            email: DataSignUp.email,
                            code: inputs.join(""),
                            password: DataSignUp.password,
                            firstName: DataSignUp.firstName,
                            lastName: DataSignUp.lastName,
                            fcmTokenId: localStorage?.getItem("fcmTokenId") as string
                        }))
                        if (result.type === "auth/signup/fulfilled") {
                            localStorage.removeItem("user")
                            navigate(configRouter.home);
                        } else {
                            toast.error(
                                (result as { error: { message: string } }).error?.message
                            );
                        }
                    }
                }
            }
            else {
                toast.error(messageToast.fillInput)
            }
        }
        catch (e: unknown) {
            if (e instanceof AxiosError && e.response) {
                toastError(e,"top-right")
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prevSeconds => prevSeconds - 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    const handleResendVerifyCode = async () => {
        if (seconds <= 0) {
            try {
                if (emailForgetPass?.email) {
                    const data = await signupApi.forgetPassword(emailForgetPass?.email)
                    if (data?.success) {
                        toast.success(data?.message);
                        setSeconds(0)
                    }
                } else {
                    const data = await signupApi.sendCodeRegister(DataSignUp?.email)
                    if (data?.success) {
                        toast.success(data?.message);
                        setSeconds(0)
                    }
                }
            }
            catch (e: unknown) {
                if (e instanceof AxiosError && e.response) {
                    toastError(e,"top-right")
                }
            }
        }
    }

    return (
        <div className="w-full h-full bg-gray-400">
            <div className="w-1/2    min-w-1/2 h-[350px] flex flex-col justify-center text-black absolute top-1/4 left-1/4 shadow-md bg-white rounded-lg p-3">
                <div className="flex flex-col items-center justify-center">
                    <div className="font-semibold text-2xl my-2">Email</div>
                    <div className="mt-2">
                        Enter the 6-digit OTP code that has been sent from email to complete
                        your account registration
                    </div>
                </div>
                <div className="container mx-auto mt-8 text-center">
                    {inputs.map((input, index) => (
                        <input
                            key={index}
                            ref={(ref) =>
                                (inputRefs.current[index] = ref as HTMLInputElement)
                            }
                            type="text"
                            value={input}
                            onChange={(e) => handleChange(index, e)}
                            className="border border-gray-300 rounded-md px-2 py-2 mb-4 mr-4 w-12 h-12 text-center"
                        />
                    ))}
                </div>
                <div className="text-center mt-2 text-sm">
                    Haven't got the confirmation code yet? <button className="font-semibold italic" onClick={handleResendVerifyCode}>{seconds > 0 ? `${seconds}s` : "resend"}</button>
                </div>
                <div className="text-center my-3 w-full">
                    <button
                        className="bg-btnActive text-white rounded-lg px-3 py-2 w-[45%]"
                        onClick={handleConfirmOTP}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OTPPage;
