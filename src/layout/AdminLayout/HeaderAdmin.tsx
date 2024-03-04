import AccountHeader from "@/components/Header/AccountHeader";
import { List } from "@phosphor-icons/react";
import React from "react";
interface propsHeader {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderAdmin = (props: propsHeader): React.ReactElement => {
  return (
    <div className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-3 py-2 relative z-50 ">
      <div className="flex space-x-3 items-center">
        <div className="rounded-full cursor-pointer p-2  flex transition-all delay-200 items-center justify-center h-auto">
          <List
            size={25}
            className="text-gray-500"
            onClick={() => props.setIsOpen((prev) => !prev)}
          />
        </div>
      </div>
      <AccountHeader />
    </div>
  );
};

export default HeaderAdmin;
