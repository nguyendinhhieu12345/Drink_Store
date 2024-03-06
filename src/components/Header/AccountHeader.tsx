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
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await dispatch(logoutThunk());
  };

  return (
    <div>
      <div className="flex items-center justify-center px-3 py-2 gap-3">
        <Menu>
          <MenuHandler>
            <div className="cursor-pointer">
              <ImageWithError
                src={assets.images.imgUser}
                fallbackSrc={assets.images.noAvatar}
                alt="avatar"
                className="rounded-full h-10 w-10 bg-btnDisable"
              />
            </div>
          </MenuHandler>
          <MenuList placeholder="">
            <MenuItem placeholder="">Default Address</MenuItem>
            <MenuItem placeholder="">History Order</MenuItem>
            <hr className="my-3" />
            <MenuItem placeholder="" onClick={handleLogout}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default AccountHeader;
