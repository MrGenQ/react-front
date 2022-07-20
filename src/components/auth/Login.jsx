import API from "../../API";
import {useEffect} from "react";
import Navbar from "../navbar/Navbar";
import {Link} from "react-router-dom";
import {useUserContext} from "../../context/UserContext";
const Login = () => {
    const {errors, handleErrors, user, handleAddUser} = useUserContext()
    const handleSubmit = (event) =>
    {
        event.preventDefault()
        try {
            API.postForm(`/login`, {
                'username': event.target.username.value,
                'password': event.target.password.value
            }).then(resp => {
                if(resp.data.error){
                    handleErrors(resp.data)
                }
                else {
                    handleErrors('')
                    handleAddUser(resp.data.data)
                    setTimeout(function() {
                            window.location = '/autentifikuota'
                    }, 1000)

                }
                console.log(resp.data)
            })
        } catch(err) {
            console.log(err);
        }

    }
    console.log(user)
    console.log(errors)
    return (
        <div className="container-fluid bg-gray-100">
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white w-full w-6/12 px-6 py-8 rounded shadow-md text-black justify-center">
                            <h1 className="mb-8 text-3xl text-center uppercase">Prisijungimas</h1>

                            <div className="flex flex-row">
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 ml-12 mr-12 rounded mb-4 w-full"
                                    name="username"
                                    placeholder="Prisijungimo vardas"/>
                            </div>
                            {errors.username? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 ml-12 mr-12 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{errors.username}</span>
                            </div>: null}
                            <div className="flex flex-row">
                                <input
                                    type="password"
                                    className="block border border-grey-light w-full p-3 ml-12 mr-12 rounded mb-4 w-full"
                                    name="password"
                                    placeholder="Slaptažodis"/>
                            </div>
                            {errors.password? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 ml-12 mr-12 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{errors.password}</span>
                            </div>: null}
                            <div className="flex justify-around">
                                <button type="submit" className="bg-green-500 hover:bg-blue-700 text-white w-48 font-bold py-2 px-4 rounded mt-5">
                                    <div>Prisijungti</div>
                                </button>
                                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white w-48 font-bold py-2 px-4 rounded mt-5 flex flex-row justify-between">
                                    <div>Registruotis</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login