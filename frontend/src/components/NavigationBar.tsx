import {
    Navbar,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import LogoutButton from "./LogoutButton";
import {Link} from "react-router-dom";

function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to="/recipesearch" className="flex items-center hover:text-blue-500 transition-colors">
                    Recipe Search
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to="/guestManagement" className="flex items-center hover:text-blue-500 transition-colors">
                    Guest Management
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to="/userDetails" className="flex items-center hover:text-blue-500 transition-colors">
                    Account
                </Link>
            </Typography>
            <LogoutButton/>
        </ul>
    );
}

export default function NavigationBar() {
    const [openNav, setOpenNav] = useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    Taste Buddies
                </Typography>

                <div className="hidden lg:block">
                    <NavList/>
                </div>

                <IconButton
                    variant="text"
                    className="h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2}/>
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2}/>
                    )}
                </IconButton>
            </div>
            {openNav && (
                <NavList/>
            )}
        </Navbar>
    );
}