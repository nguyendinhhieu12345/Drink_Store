import React from "react";
import {
    Collapse,
    Typography,
    List,
    ListItem,
} from "@material-tailwind/react";
import assets from "@/assets";
import AccountHeader from "./AccountHeader";
import CartHeader from "./CartHeader";
import Search from "../SVG/Search";
import { useNavigate } from "react-router-dom";


function NavList() {
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
            >
                <ListItem
                    placeholder=""
                    className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    Blogs
                </ListItem>
            </Typography>
            <Typography
                placeholder=""
                as="a"
                href="/store"
                variant="small"
                color="blue-gray"
            >
                <ListItem
                    placeholder=""
                    className=" text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    Store
                </ListItem>
            </Typography>
            <Typography
                placeholder=""
                as="a"
                href="/coupon"
                variant="small"
                color="blue-gray"
            >
                <ListItem
                    placeholder=""
                    className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    Coupon
                </ListItem>
            </Typography>
        </List>
    );
}

const Header = (): React.ReactElement => {
    const [openNav, setOpenNav] = React.useState<boolean>(false);
    const [keySearch, setKeySearch] = React.useState<string>("")
    const nav = useNavigate()

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const handleSearch = (e?: React.KeyboardEvent<HTMLInputElement>) => {
        if (e?.key === "Enter") {
            nav(`/search?key=${keySearch}`)
        }
    }

    return (
        <header className="w-full px-20 py-10 h-16 bg-white fixed z-50 shadow-lg border border-gray-300">
            <div className="flex items-center justify-between text-blue-gray-900 h-full">
                <Typography
                    placeholder=""
                    as="a"
                    href="/"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 lg:ml-2"
                >
                    <img src={assets.images.shopfeeIconNoBg} className="w-full h-16" />
                </Typography>
                <div>
                    <div className="relative w-96">
                        <button className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer z-999999" onClick={() => nav(`/search?key=${keySearch}`)}>
                            <Search />
                        </button>
                        <input
                            onChange={(e) => setKeySearch(e.target.value)}
                            type="text"
                            className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Enter product ..."
                            onKeyDown={(e) => handleSearch(e)}
                        />
                    </div>
                </div>
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
        </header>
    );
};

export default Header;
