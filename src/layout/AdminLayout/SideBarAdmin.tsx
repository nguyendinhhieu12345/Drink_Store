import React from "react";
import {
  Coffee,
  Gear,
  ListBullets,
  Megaphone,
  Percent,
  ShoppingCart,
  Storefront,
  UserRectangle,
  UsersThree,
} from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";
import { configRouter } from "@/configs/router";
import assets from "@/assets";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export type Ref = HTMLDivElement;

const ITEM_ADMIN_SIDEBAR = [
  {
    title: "Dashboard",
    icon: (
      <svg
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        aria-hidden="true"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    to: configRouter.dashboardAdmin,
  },
  {
    title: "Products",
    icon: <Coffee size={25} />,
    to: configRouter.products,
  },
  {
    title: "Categorys",
    icon: <ListBullets size={25} />,
    to: configRouter.categorys,
  },
  {
    title: "Our Staff",
    icon: <UsersThree size={25} />,
    to: configRouter.ourStaff,
  },
  {
    title: "Orders",
    icon: <ShoppingCart size={25} />,
    to: configRouter.orders,
  },
  // add new
  {
    title: "Coupons",
    icon: <Percent size={25} />,
    to: configRouter.coupons,
  },
  {
    title: "Branchs",
    icon: <Storefront size={25} />,
    to: configRouter.addBranch,
  },
  {
    title: "Marketing",
    icon: <Megaphone size={25} />,
    to: configRouter.marketing,
  },
  {
    title: "Custom Page",
    icon: <Gear size={25} />,
    to: configRouter.customPage,
  },
  {
    title: "Profile",
    icon: <UserRectangle size={25} />,
    to: configRouter.profileAdmin,
  },
];
const ItemSidebar = (props: {
  title: string;
  icon: React.ReactElement;
  to: string;
  isOpen: boolean;
}) => {
  const location = useLocation();
  return (
    <Link
      to={props.to}
      className={`w-full px-2.5 py-2 ${
        location.pathname === props.to
          ? "bg-blue-400 text-white font-semibold"
          : "text-gray-800 hover:bg-gray-200"
      } rounded-lg select-none `}
    >
      <div
        className={`w-60 flex items-center justify-start space-x-5 flex-nowrap overflow-hidden`}
      >
        {props.icon}
        <p
          className={`${
            !props.isOpen ? "hidden" : "block"
          } text-base font-medium font-sans flex items-center justify-center `}
        >
          {props.title}
        </p>
      </div>
    </Link>
  );
};
const SideBarAdmin = React.forwardRef<Ref, Props>(
  (props, ref): React.ReactElement => {
    const location = useLocation();
    return (
      // <div className="relative xl:w-15 h-screen shadow-lg z-999">
      <div
        className={` relative h-screen shadow-lg z-999
      ${props.isOpen ? "w-80" : "w-15"}`}
      >
        <div
          className={`absolute z-9999 w-full ${
            props.isOpen ? "-translate-x-0 " : "-translate-x-60 "
          } h-full overflow-auto z-50 bg-white top-0 left-0 xl:-translate-x-0
          transition-all delay-200 flex flex-col px-2 py-4 gap-3 shadow-lg`}
          ref={ref}
        >
          {/* logo */}
          <div className="relative w-full flex items-center justify-center mb-10">
            <img src={assets.images.shopfeeIcon} alt="" className="h-10" />
          </div>

          {/* item  */}
          {location.pathname.split("/")[1] === "admin" &&
            ITEM_ADMIN_SIDEBAR.map((item, index) => {
              return (
                <ItemSidebar
                  isOpen={props.isOpen}
                  key={index}
                  title={item.title}
                  icon={item.icon}
                  to={item.to}
                />
              );
            })}
        </div>
      </div>
    );
  }
);

export default SideBarAdmin;
