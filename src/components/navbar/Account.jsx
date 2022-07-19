import { Fragment} from "react";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import {useUserContext} from "../../context/UserContext";
import {Link} from "react-router-dom";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
const Account = () => {
    const {user} = useUserContext()
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
            <Menu.Button >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white h-12 w-9"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clipRule="evenodd"
                    />
                </svg>
            </Menu.Button>
                {user?
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
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    <div>{user.firstName} {user.lastName}</div>
                                    <div>{user.email}</div>
                                </a>
                            )}
                        </Menu.Item>
                        <Link to='/redaguoti-profili' className="flex justify-end pr-8 uppercase">redaguoti profilį</Link>
                    </div>
                </Menu.Items>
            </Transition>:null}
            </Menu>
        </>
    )
}
export default Account