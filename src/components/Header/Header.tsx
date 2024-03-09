import React from "react";
import {
  Collapse,
  Typography,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import assets from "@/assets";
import AccountHeader from "./AccountHeader";
import CartHeader from "./CartHeader";
import Search from "../SVG/Search";

const navListMenuItems = [
  {
    title: "Coffe",
    description: "Find the perfect solution for your needs.",
  },
  {
    title: "Tea",
    description: "Meet and learn about our dedication",
  },
  {
    title: "Food",
    description: "Find the perfect solution for your needs.",
  },
  {
    title: "Plan",
    description: "Learn how we can help you achieve your goals.",
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(({ title, description }, key) => (
    <a href="#" key={key}>
      <MenuItem placeholder="" className="flex items-center gap-3 rounded-lg">
        <div>
          <Typography
            placeholder=""
            variant="h4"
            color="blue-gray"
            className="flex items-center text-sm font-bold"
          >
            {title}
          </Typography>
          <Typography
            placeholder=""
            variant="paragraph"
            className="text-xs !font-medium text-blue-gray-500"
          >
            {description}
          </Typography>
        </div>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
      >
        <MenuHandler>
          <Typography
            placeholder=""
            as="div"
            variant="small"
            className="font-medium"
          >
            <ListItem
              placeholder=""
              className="text-md font-semibold flex items-center gap-2 py-2 pr-4 text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Category
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList
          placeholder=""
          className="hidden max-w-screen-xl rounded-xl lg:block"
        >
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List
      placeholder=""
      className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1"
    >
      <Typography
        placeholder=""
        as="a"
        href="/"
        variant="small"
        color="blue-gray"
      >
        <ListItem
          placeholder=""
          className="text-md font-semibold flex items-center gap-2 py-2 pr-4"
        >
          Home
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
      <NavListMenu />
      <Typography
        placeholder=""
        as="a"
        href="/"
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
  const [openNav, setOpenNav] = React.useState(false);

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
        <div>
          <form>
            <label
              htmlFor="search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white w-96"
            >
              Search
            </label>
            <div className="relative w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3  cursor-pointer z-999999">
                <Search />
              </div>
              <input
                type="text"
                className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Enter product ..."
              />
            </div>
          </form>
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
