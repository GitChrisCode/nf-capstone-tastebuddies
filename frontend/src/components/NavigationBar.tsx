import {
    Navbar,
    Typography,
    } from "@material-tailwind/react";
import {Bars3Icon, XMarkIcon} from "@heroicons/react/24/outline";
import React, {useEffect, useState} from "react";
import LogoutButton from "./LogoutButton";
import {Link} from "react-router-dom";


function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 text-black lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to="/recipesearch" className="flex items-center text-black hover:text-blue-500 transition-colors">
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
                    Buddie Management
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
            <div className="flex items-center justify-between">
                <Typography className="mr-2 block text-blue-700 font-sans text-2xl font-semibold leading-snug tracking-normal  antialiased">Taste Buddies</Typography>
                <div className="hidden lg:block">
                    <NavList/>
                </div>
                <button
                    className="relative h-6 w-6 text-inherit text-black hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    onClick={() => setOpenNav(!openNav)}>
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6 text-black" strokeWidth={2}/>
                    ) : (
                        <Bars3Icon className="h-6 w-6 text-black" strokeWidth={2}/>
                    )}
                </button>
            </div>
            {openNav && (
                <NavList/>
            )}
        </Navbar>
    );
}