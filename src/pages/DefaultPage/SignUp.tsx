import assets from "@/assets";
import { HandWaving } from "@phosphor-icons/react";
import { useEffect } from "react";

const SignUp = () => {
  useEffect(() => {
    document.title = "Shopfee | signup";
  }, []);

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
              <h1 className="text-3xl">Hey, Welcome Back </h1>
              <HandWaving size={32} color="#EFC806" weight="fill" />
            </div>
            <p className="text-sm">
              Create your account credentials to view your orders
            </p>
          </div>

          <div>
            <div className="mb-5">
              <p className="font-semibold text-base">Email</p>
              <input
                type="text"
                className="border-2 border-slate-500 rounded-md w-90 h-10 pl-3 hover:border-blue-500"
              />
            </div>
            <div>
              <p className="font-semibold text-base">Password</p>
              <input
                type="password"
                className="border-2 border-slate-500 rounded-md w-90 h-10 pl-3 pr-3 hover:border-blue-500"
              />
            </div>
            <div className="flex space-x-5 mt-5">
              <button className="w-90 h-10 text-white rounded-lg bg-[#5D4037] opacity-80 hover:opacity-100 active:opacity-100 focus:opacity-100">
                Login
              </button>
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-navy-500"></div>
              <p>OR</p>
              <div className="h-px flex-1 bg-gray-200 dark:bg-navy-500"></div>
            </div>
            <div className="flex space-x-2 mt-3">
              <button className="w-[50%] h-10 border border-gray-200 rounded-lg shadow-2xl flex items-center justify-center font-normal ">
                <img src={assets.images.facebookLogo} className="mr-3" />
                <p className="text-blue-500">Facebook</p>
              </button>
              <button className="w-[50%] h-10 border border-gray-200 rounded-lg shadow-2xl flex items-center justify-center font-normal">
                <img src={assets.images.googleLogo} className="mr-3" />
                <p>Google</p>
              </button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <p className="text-sm italic">
                Don't have on account?{" "}
                <span className="text-blue-500 cursor-pointer">Sign Up</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
