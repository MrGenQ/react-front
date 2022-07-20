import {Fragment} from "react";
import { Menu, Transition } from "@headlessui/react";
import React from "react";

import {Link} from "react-router-dom";
/*
Pagrindinės navigacijos funkcija,
Ši funkcija grąžina visus galimus Link sistemai valdyti
 */
const NavbarMenu = () =>{
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button >
                    <div className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white uppercase">
                        Baksnotojas 2000
                    </div>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right fixed left-14 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <div className="p-4">
                            <Link to='/login' className="flex justify-center uppercase">Prisijungti</Link>
                        </div>
                        <div className="p-4">
                            <Link to='/' className="flex justify-center uppercase">Registruotis</Link>
                        </div>
                        <div className="p-4">
                            <Link to='/autentifikuota' className="flex justify-center uppercase">Vartotojai</Link>
                        </div>
                        <div className="p-4">
                            <Link to='/visu-poke-istorija' className="flex justify-center uppercase">Poke istorija</Link>
                        </div>
                        <div className="p-4">
                            <Link to='/vartotoju-paieska' className="flex justify-center uppercase">Vartotojų paieška</Link>
                        </div>
                        <div className="p-4">
                            <Link to='/poke-importas' className="flex justify-center uppercase">Poke importas</Link>
                        </div>
                        <div className="p-4">
                            <Link to='/vartotoju-importas' className="flex justify-center uppercase">Vartotojų importas</Link>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
export default NavbarMenu