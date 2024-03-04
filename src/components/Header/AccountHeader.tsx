import assets from "@/assets";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import ImageWithError from "../ImageError/ImageWithError";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { logoutThunk } from "@/features/auth/authSlice";

const AccountHeader = () => {
  const dispatch = useDispatch<AppDispatch>()
  
  const handleLogout = async()=>{
    await dispatch(logoutThunk())
  }

  return (
    <div>
      <div className="flex items-center justify-center px-3 py-2 gap-3 bg-white">
        <div className="account-info flex flex-col justify-center items-end">
          <h5 className="text-sm font-medium">Nguyễn Đình Hiếu</h5>
          <p className="text-xs font-normal text-gray-600">Admin</p>
        </div>
        <Menu>
          <MenuHandler>
            <div className="cursor-pointer">
              <ImageWithError
                src={assets.images.noAvatar}
                fallbackSrc={assets.images.noAvatar}
                alt="avatar"
                className="rounded-full h-[40px] w-[40px]"
              />
            </div>
          </MenuHandler>
          <MenuList placeholder="">
            <MenuItem placeholder="">DashBoard</MenuItem>
            <MenuItem placeholder="">Profile</MenuItem>
            <hr className="my-3" />
            <MenuItem placeholder="" onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default AccountHeader;
