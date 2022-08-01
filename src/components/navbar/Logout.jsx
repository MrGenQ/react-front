import { Fragment} from "react";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import {useAppContext} from "../../context/AppContext";
import {Link} from "react-router-dom";
import API from "../../API";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
/*
Navigacijos elementas,
skirtas atsijungti nuo sistemos
 */
const Logout = () => {
    const {user, handleAddUser} = useAppContext()
    const logout = () => {

        try {
            API.get('/logout')
                .then(response => {
                        handleAddUser(response.data.data)
                    })
                    .then(() => setTimeout(function() {
                        window.location = '/login'
                    }, 1000))
        } catch (error){
            console.log(error)
        }

    }
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <Menu.Button >
                    <svg className="text-white h-12 w-9" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                         strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>

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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <div className="py-1 flex justify-center">
                            {user?
                                <button onClick={logout} className="flex justify-center">Atsijungti</button>
                                :<Link to='/login' className="flex justify-center">Prisijungti</Link>}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}
export default Logout