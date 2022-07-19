import React from 'react'
import {Link} from "react-router-dom";
import Pokes from "./Pokes";
import Account from "./Account";
import Logout from "./Logout";
import NavbarMenu from "./NavbarMenu";
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
/*
<svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
                                </svg>

                           <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none"
                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                     strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>

 */