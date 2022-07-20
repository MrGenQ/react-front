import React from 'react'
import {Link} from "react-router-dom";
import Pokes from "./Pokes";
import Account from "./Account";
import Logout from "./Logout";
import NavbarMenu from "./NavbarMenu";
/*
Navigacijos funkcija grąžina visus navbar elementus
 */
const Navbar = () => {
    return (
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-blue-500 mb-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div
                    className="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
                    <NavbarMenu/>
                </div>
                <div className="flex gap-8">
                    <Pokes/>
                    <Account/>
                    <Logout/>
                </div>
            </div>
        </nav>
    )
}
export default Navbar