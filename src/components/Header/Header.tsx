import { List } from "@phosphor-icons/react";
import React from "react";
import { Link } from "react-router-dom";
import { configRouter } from "@/configs/router";
interface propsHeader {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = (props: propsHeader): React.ReactElement => {

  return (
    <div className="w-full h-[80px] bg-white shadow-sm flex items-center justify-between px-3 py-2 relative z-999 ">
      <div className="left flex space-x-3 items-center">
        <div className="rounded-full cursor-pointer p-2  flex transition-all delay-200 items-center justify-center h-auto">
          <List
            size={25}
            className="text-gray-500"
            onClick={() => props.setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      <div className="right flex gap-3 items-center">
        <Link to={configRouter.login}>
          <button
            type="button"
            className=" w-[100px] flex items-center justify-center text-blue-500 bg-gray-100 hover:bg-gray-200 border border-blue-500 focus:outline-none font-medium rounded-full text-sm py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-blue-600"
          >
            Đăng Nhập
          </button>
        </Link>

        <Link to={configRouter.signUp}>
          <button
            type="button"
            className="w-[100px] flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Đăng Kí
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
