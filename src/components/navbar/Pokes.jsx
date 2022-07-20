import {Fragment, useEffect, useState} from "react";
import { Menu, Transition } from "@headlessui/react";
import React from "react";
import API from "../../API";
import {useAppContext} from "../../context/AppContext";
import RenderUserPokes from "./RenderUserPokes";
import {Link} from "react-router-dom";
import Spinner from "../../misc/Spinner";
function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
/*
Navigacijos elementas,
Skirtas pokes notifikacijom atvaizduoti ir galimybę naviguoti į visų poke istorija
 */
const Pokes = () =>{
    const {user, update} = useAppContext()
    const [pokes, setPokes] = useState('')
    const [showSpinner,setShowSpinner] = useState(true)
    useEffect(()=>{
        setTimeout(function() {
            setShowSpinner(false)
        }, 3000);
    },[])
    useEffect(() =>{
        if(user) {
            try {
                API.postForm(`/get-user-pokes`, {
                    'limit': 7,
                    'email': user.email,
                })
                    .then(response => {
                        setPokes(response.data)
                    });
            } catch (err) {
                console.log(err);
            }
        }
    }, [update])
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
                <svg className="text-white h-12 w-9" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"/>
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
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        {showSpinner?
                            <Spinner/> :
                            <>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(
                                                active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                                                "block px-4 py-2 text-sm"
                                            )}
                                        >
                                            {pokes? pokes.map(d=>
                                                <RenderUserPokes key={d.id} id={d.id} sender={d.sender}/>):null}
                                        </a>
                                    )}
                                </Menu.Item>
                                <Link to='/visu-poke-istorija' className="flex justify-end pr-8 uppercase">visi poke ></Link>
                            </>
                        }



                    </div>
                </Menu.Items>
            </Transition>
                    :null}
            </Menu>
        </>
    )
}
export default Pokes