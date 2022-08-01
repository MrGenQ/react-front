import Navbar from "../navbar/Navbar";
import {useState} from "react";
import API from "../../API";
import {useAppContext} from "../../context/AppContext";
import AuthCheck from "../../services/auth/AuthCheck";
/*
Funkcija skirta atnaujinti prisijungusio vartotojo duomenis,
Prisijungimo vardas jau yra nustatytas, nes jo keisti negalima
visi kiti laukai būtini, kitaip backend grąžina validacijos error,
Svarbu! Negalima įvesti egzistuojančio email duomenų bazėje, bet galima įvesti tą patį email kurį vedėte registruojantis
Jeigu vartotojas sėkmingai atnaujinamas jūsų vartotojui skirti poke atsinaujina gavėjo email
 */
const UpdateUser = () => {
    AuthCheck()
    const [validate, setValidate] = useState({})
    const {user, handleAddUser} = useAppContext()
    const handleSubmit = (event) => {
        event.preventDefault()
        let oldEmail = user.email
        let error = true
            try {
                API.postForm(`/update-user/${user.id}`, {
                    'username': user.username,
                    'email': event.target.email.value,
                    'password': event.target.password.value,
                    'password_confirm': event.target.confirmPassword.value,
                    'firstName': event.target.firstName.value,
                    'lastName': event.target.lastName.value,
                    'oldEmail': oldEmail,
                })

                    .then(response => {
                        if(response.data.errors){
                            setValidate(response.data.errors)
                        }
                        else {
                            error = false
                            setValidate({})
                            API.get(`user-info/${user.id}`).then(resp => handleAddUser(resp.data))
                        }
                        console.log(response)
                    })
                    .then(() => {
                    if(!error){
                        API.postForm(`/update-poke`, {
                            'oldEmail': oldEmail,
                            'newEmail': event.target.email.value
                        })
                    }

                })
            } catch(err) {
                console.log(err);
            }
    }
    return (
        <div className="container-fluid bg-gray-100">
            <Navbar/>
            <form onSubmit={handleSubmit}>
                <div className="bg-grey-lighter min-h-screen flex flex-col">
                    <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                        <div className="bg-white w-full w-6/12 px-6 py-8 rounded shadow-md text-black">
                            <h1 className="mb-8 text-3xl text-center uppercase">Redaguoti profilį</h1>
                            <div className="flex flex-row justify-end gap-4">
                                <div className="text-gray-500">Prisijungimo vardas</div>
                                <div className="block border border-grey-light w-full p-3 rounded mb-4 w-full w-8/12">
                                    {user.username}
                                </div>
                            </div>
                            <div className="flex flex-row justify-end gap-4">
                                <div className="text-gray-500">Vardas</div>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 w-full w-8/12"
                                    name="firstName"
                                    placeholder={user.firstName}/>
                            </div>
                            {validate.firstName? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.firstName}</span>
                            </div>: null}
                            <div className="flex flex-row justify-end gap-4">
                                <div className="text-gray-500">Pavardė</div>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 w-full w-8/12"
                                    name="lastName"
                                    placeholder={user.lastName}/>
                            </div>
                            {validate.lastName? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.lastName}</span>
                            </div>: null}
                            <div className="flex flex-row justify-end gap-4">
                                <div className="text-gray-500">El. paštas</div>
                                <input
                                    type="text"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 w-full w-8/12"
                                    name="email"
                                    placeholder={user.email}/>
                            </div>
                            {validate.email? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.email}</span>
                            </div>: null}
                            {validate.email_exists? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.email_exists}</span>
                            </div>: null}
                            <div className="flex flex-row justify-end gap-4">
                                <div className="text-gray-500">Slaptažodis</div>
                                <input
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 w-full w-8/12"
                                    name="password"/>
                            </div>
                            {validate.password? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.password}</span>
                            </div>: null}
                            {validate.password_not_equal? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.password_not_equal}</span>
                            </div>: null}
                            <div className="flex flex-row justify-end gap-4">
                                <div className="text-gray-500">Slaptažodio pakartojimas</div>
                                <input
                                    type="password"
                                    className="block border border-grey-light w-full p-3 rounded mb-4 w-full w-8/12"
                                    name="confirmPassword"/>
                            </div>
                            {validate.password_confirm? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.password_confirm}</span>
                            </div>: null}
                            {validate.password_not_equal? <div
                                className="p-2.5 mb-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                                role="alert"><span className="font-medium">{validate.password_not_equal}</span>
                            </div>: null}
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-36 font-bold py-2 px-4 rounded mt-5 flex flex-row justify-between">
                                    <div>Saugoti</div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default UpdateUser