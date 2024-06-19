import React from "react";
import {
    Coin,
    Gear,
    ListBullets,
    MapPinLine,
    Note,
    SquaresFour,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { configRouter } from "@/configs/router";

export type Ref = HTMLDivElement;

const ITEM_ADMIN_SIDEBAR = [
    {
        title: "Statistics",
        icon: (
            <SquaresFour size={25} />
        ),
        to: configRouter.dashboard,
    },
    {
        title: "History Orders",
        icon: <ListBullets size={25} />,
        to: configRouter.myOrder,
    },
    {
        title: "History Coins",
        icon: <Coin size={25} />,
        to: configRouter.historyCoin,
    },
    {
        title: "Update Profile",
        icon: <Gear size={25} />,
        to: configRouter.profile,
    },
    {
        title: "Change Password",
        icon: <Note size={25} />,
        to: configRouter.changePassword,
    },
    {
        title: "Default Address",
        icon: <MapPinLine size={25} />,
        to: configRouter.defaultAddress,
    },
];
const ItemSidebar = (props: {
    title: string;
    icon: React.ReactElement;
    to: string;
}) => {
    const location = useLocation();
    return (
        <Link
            to={props.to}
            className=
            {`
                w-full px-2.5 py-2 my-1.5 flex items-center justify-start space-x-5 flex-nowrap overflow-hidden
                ${location.pathname === props.to ? "bg-blue-400 font-semibold text-white" : "text-gray-800 hover:bg-gray-200"} 
                rounded-lg select-none 
            `}
        >
            {props.icon}
            <p
                className={`text-base font-medium font-sans flex items-center justify-center `}
            >
                {props.title}
            </p>
        </Link>
    );
};
const TabListUser = () => {
    return (
        <div
            className={`bg-white h-auto max-h-[19rem] w-1/4 mr-5 border border-gray-50 shadow-base rounded-md p-2`}
        >
            {ITEM_ADMIN_SIDEBAR.map((item, index) => {
                return (
                    <ItemSidebar
                        key={index}
                        title={item.title}
                        icon={item.icon}
                        to={item.to}
                    />
                );
            })}
        </div>
    );
}

export default TabListUser;
