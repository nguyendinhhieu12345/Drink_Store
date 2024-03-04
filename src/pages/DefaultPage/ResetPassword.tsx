import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import * as authApi from "../../api/authApi/authApi";
import { toast } from "react-toastify";

function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  useEffect(() => {
    document.title = "Shopfee | Reset Password";
  }, []);

  const handleResetPass = async () => {
    if (password === "" || confirmPassword === "" || token === "") {
      toast.error("Vui lòng nhập đủ các trường!!!");
      inputRef.current?.focus();
    } else {
      if (password !== confirmPassword) {
        toast.error("Mật khẩu không trùng!!!");
        inputRef.current?.focus();
      } else {
        try {
          const data = await authApi.resetPassword(password, token.trim());
          if (data?.status === 200) {
            toast.success("Đã reset mật khẩu thành công!");
            nav(configRouter.login);
          } else {
            toast.error(data?.message);
          }
        } catch (error) {
          toast.error("Token hết hạn hoặc không chính xác!");
        }
      }
    }
  };

  return (
    <div className="h-full w-full bg-gray-400">
      <div className="w-1/2 h-auto flex flex-col justify-center color-black shadow-md absolute top-[20%] left-1/4 bg-white rounded-lg">
        <div className="m-3">
          <h1 className="text-2xl font-semibold italic">Khôi phục mật khẩu</h1>
        </div>
        <div className="mb-3 mx-3">
          <p className="text-md italic">Mật khẩu mới</p>
        </div>
        <div className="mb-3 mx-3">
          <input
            type="password"
            ref={inputRef}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Nhập mật khẩu mới..."
            className="p-3 w-full text-black border border-solid border-gray-300 outline-none rounded-md"
          />
        </div>
        <div className="mb-3 mx-3">
          <p className="text-md italic">Xác nhận mật khẩu mới</p>
        </div>
        <div className="mb-3 mx-3">
          <input
            type="password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Nhập xác nhận mật khẩu mới..."
            className="p-3 text-black border border-solid border-gray-300 outline-none w-full rounded-md"
          />
        </div>
        <div className="mb-3 mx-3">
          <p className="text-md italic">
            Token - Mã xác nhận <span className="text-red-600">(*email)</span>
          </p>
        </div>
        <div className="mb-3 mx-3">
          <input
            type="text"
            onChange={(e) => {
              setToken(e.target.value);
            }}
            placeholder="Nhập mã xác nhận..."
            className="p-3 text-black border border-solid border-gray-300 outline-none w-full rounded-md"
          />
        </div>
        <div className="flex flex-row justify-end mx-3 my-3">
          <Link to={configRouter.login} className="italic text-blue-600">
            Bạn đã có tài khoản?
          </Link>
        </div>
        <div className="flex flex-row justify-end mx-3 mb-3">
          <button
            className="bg-blue-500 text-white rounded px-4 py-2"
            onClick={handleResetPass}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
