import assets from "@/assets";
import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import ImageWithError from "../ImageError/ImageWithError";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { logoutThunk } from "@/features/auth/authSlice";
import { User } from "@/type";
import { useNavigate } from "react-router-dom";
import { configRouter } from "@/configs/router";
import { SignIn } from "@phosphor-icons/react";
import { toast } from "react-toastify";

const AccountHeader = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector<RootState, User>(
        (state) => state.authSlice.currentUser as User
    );
    const nav = useNavigate()

    const handleLogout = async () => {
        const data = await dispatch(logoutThunk(localStorage.getItem("fcmTokenId") as string));
        console.log(data)
        if (data?.type === "auth/logout/fulfilled") {
            nav(configRouter.home)
        }
        else {
            toast.error(
                (data as { error: { message: string } }).error?.message
            );
        }
    };

    const handleLogin = () => {
        nav(configRouter.login)
    }

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
                    {currentUser?.data?.userId ?
                        <MenuList placeholder="">
                            <MenuItem placeholder="">Default Address</MenuItem>
                            <MenuItem placeholder="">History Order</MenuItem>
                            <hr className="my-3" />
                            <MenuItem placeholder="" onClick={handleLogout}>
                                Logout
                            </MenuItem>
                        </MenuList>
                        :
                        <MenuList placeholder="">
                            <MenuItem placeholder="" className="flex items-center" onClick={handleLogin}>
                                <SignIn size={22} />
                                <p className="text-base font-medium ml-3">Login</p>
                            </MenuItem>
                        </MenuList>
                    }
                </Menu>
            </div>
        </div>
    );
};

export default AccountHeader;
