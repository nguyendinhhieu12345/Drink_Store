import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import * as authApi from "../../api/authApi/authApi";
import { toast } from "react-toastify";
import { Button, Spinner, Typography } from "@material-tailwind/react";
import { AxiosError } from "axios";
import { isEmail } from "@/utils/hepler";

function ForgetPassword() {
    const [email, setEmail] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const nav = useNavigate();

    useEffect(() => {
        setError("");
    }, [email]);

    const handleForgetPass = async () => {
        setLoading(true);
        if (email.trim() !== "" && isEmail(email.trim())) {
            try {
                const data = await authApi.forgetPassword(email);
                if (data?.success) {
                    setLoading(false);
                    localStorage.setItem('emailForgetPass', JSON.stringify({
                        email
                    }));
                    toast.success(data?.message);
                    nav(configRouter.optConfirm);
                }
            }
            catch (e: unknown) {
                setLoading(false);
                if (e instanceof AxiosError && e.response) {
                    toast.error(e.response.data?.message);
                    if (inputRef.current) inputRef.current.focus();
                }
            }
        }
        else {
            setError("Please enter correct format email!!!");
            if (inputRef.current) inputRef.current.focus();
            setLoading(false);
        }
    };
    return (
        <div className="w-full h-full bg-gray-400">
            <div className="w-1/2 h-[300px] flex flex-col justify-center text-black absolute top-1/4 left-1/4 shadow-md bg-white rounded-lg p-3">
                <div className="m-[10px_15px]">
                    <Typography placeholder="" className="font-semibold text-[25px]">
                        You forgot password?
                    </Typography>
                </div>
                <div className="m-[10px_12px]">
                    <Typography placeholder="" className="text-[15px]">
                        Please enter your email to search your account.
                    </Typography>
                </div>
                <div className="m-[10px_12px]">
                    <input
                        type="email"
                        ref={inputRef}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Enter email..."
                        style={{
                            width: "100%",
                            margin: "5px 0",
                            color: "black",
                            padding: "15px",
                            fontSize: "15px",
                            border: "1px solid #ccc",
                            outline: "none",
                        }}
                    />
                    {error && <p className="italic text-[14px] text-red-600">{error}</p>}
                </div>
                <div className="m-[10px_15px] flex flex-row justify-end">
                    <Link
                        to={configRouter.login}
                        className="italic text-sm text-blue-400"
                    >
                        Already have an account?
                    </Link>
                </div>
                <div className="m-[10px_15px] flex flex-row justify-end">
                    <Button placeholder="" onClick={handleForgetPass}>
                        {loading ? <Spinner /> : "Search"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword;
