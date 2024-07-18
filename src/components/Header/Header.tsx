import React, { useState } from "react";
import {
    Collapse,
    Typography,
    List,
    ListItem,
    Drawer,
    IconButton,
} from "@material-tailwind/react";
import assets from "@/assets";
import AccountHeader from "./AccountHeader";
import CartHeader from "./CartHeader";
import SearchHeader from "./SearchHeader";
import { Download, Newspaper, Storefront, TextOutdent } from "@phosphor-icons/react";
import SealPercentSVG from "../SVG/SealPercentSVG";
import { Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react"
import { useTranslation } from "react-i18next";

function NavList() {
    const [language, setLanguage] = useState<string>("en")
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setLanguage(lng)
    };

    return (
        <List
            placeholder=""
            className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
        >
            <Typography
                placeholder=""
                as="a"
                href="/blogs"
                variant="small"
                color="blue-gray"
                className="flex items-center"
            >
                <Newspaper size={25} className="sm:hidden" />
                <ListItem
                    placeholder=""
                    className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    {t("Blogs")}
                </ListItem>
            </Typography>
            <Typography
                placeholder=""
                as="a"
                href="/store"
                variant="small"
                color="blue-gray"
                className="flex items-center"
            >
                <Storefront size={25} className="sm:hidden" />
                <ListItem
                    placeholder=""
                    className=" text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    {t("Store")}
                </ListItem>
            </Typography>
            <Typography
                placeholder=""
                as="a"
                href="/coupon"
                variant="small"
                color="blue-gray"
                className="flex items-center"
            >
                <div className="sm:hidden">
                    <SealPercentSVG />
                </div>
                <ListItem
                    placeholder=""
                    className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    {t("Preferential")}
                </ListItem>
            </Typography>
            <Typography
                placeholder=""
                as="a"
                href="/hello"
                variant="small"
                color="blue-gray"
                className="flex items-center"
            >
                <Download size={25} className="sm:hidden" />
                <ListItem
                    placeholder=""
                    className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    {t("Download")}
                </ListItem>
            </Typography>
            <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="flex items-center"
            >
                <Menu>
                    <MenuHandler>
                        <ListItem
                            placeholder=""
                            className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
                        >
                            <p className="flex items-center font-semibold text-black opacity-90">
                                {language === "en" ?
                                    <><img src={assets?.images?.flag_en} alt="flag_en" loading="lazy" className="mr-2" /> English</>
                                    :
                                    <><img src={assets?.images?.flag_vietnam} alt="flag_vietnam" loading="lazy" className="mr-2" /> Tiếng Việt</>
                                }
                            </p>
                        </ListItem>
                    </MenuHandler>
                    <MenuList placeholder="">
                        <MenuItem onClick={() => changeLanguage('vi')} placeholder="" className="flex items-center font-semibold text-black opacity-90">
                            <img src={assets?.images?.flag_vietnam} alt="flag_vietnam" loading="lazy" className="mr-2" /> Tiếng Việt
                        </MenuItem>
                        <MenuItem onClick={() => changeLanguage('en')} placeholder="" className="flex items-center font-semibold text-black opacity-90">
                            <img src={assets?.images?.flag_en} alt="flag_en" loading="lazy" className="mr-2" /> English
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Typography>
        </List>
    );
}

const Header = (): React.ReactElement => {
    const [openNav, setOpenNav] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <header className="w-full sm:px-20 py-10 h-16 bg-white fixed z-50 shadow-lg border border-gray-300">
            <div className="flex items-center justify-between text-blue-gray-900 h-full">
                <TextOutdent onClick={openDrawer} size={35} className="sm:hidden" />
                <Typography
                    placeholder=""
                    as="a"
                    href="/"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2 hidden sm:block "
                >
                    <img src={assets.images.shopfeeIconNoBg} className="w-full h-16" />
                </Typography>
                <SearchHeader />
                <div className="flex items-center justify-center">
                    <div className="hidden lg:block">
                        <NavList />
                    </div>
                    <CartHeader />
                    <AccountHeader />
                </div>
            </div>
            <Collapse open={openNav}>
                <NavList />
            </Collapse>
            <Drawer placeholder="" open={open} onClose={closeDrawer} className="p-4">
                <div className="flex items-center justify-between">
                    <Typography placeholder="" variant="h5" color="blue-gray">
                        Menu
                    </Typography>
                    <IconButton placeholder="" variant="text" color="blue-gray" onClick={closeDrawer}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </div>
                <Collapse open={!openNav}>
                    <NavList />
                </Collapse>
            </Drawer>
        </header>
    );
};

export default Header;
