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
import SearchHeader from "./SearchHeader";

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
            <Typography
                placeholder=""
                as="a"
                href="/hello"
                variant="small"
                color="blue-gray"
            >
                <ListItem
                    placeholder=""
                    className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
                >
                    Download
                </ListItem>
            </Typography>
        </List>
    );
}

const Header = (): React.ReactElement => {
    const [openNav, setOpenNav] = React.useState<boolean>(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

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
        </header>
    );
};

export default Header;
