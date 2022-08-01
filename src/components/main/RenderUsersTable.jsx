import {useEffect, useState} from "react";
import API from "../../API";
import {useAppContext} from "../../context/AppContext";
/*
Funkcija skirta atvaizduoti puslapiuotus vartotojus
 */
const RenderUsersTable = (props) => {
    const {user, update, handleSetUpdate} = useAppContext()
    const [pokes, setPokes] = useState(0)
    const pokeUser = () => {
        let valid = true
        try {
            API.postForm('/poke-user', {
                sender: user.email,
                recipient: props.email,
            }).then(response => {

                if(response.data.error){valid = false}
                else {
                    handleSetUpdate(`poke_id ${response.data.data}`)
                }
            })/*.then(() => {
                if(valid){
                    API.postForm('/send-email', {
                        sender: user.email,
                        recipient: props.email,
                    })
                }
            })*/
        } catch(err) {
            console.log(err);
        }

    }
    useEffect(() => {
        API.postForm('get-pokes', {
            email: props.email,
        }).then(resp => {
            if(resp.data){
                setPokes(resp.data.count)
            }
        })
    }, [update])
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">
                {props.firstName}
            </td>
            <td className="px-9 py-4">
                {props.lastName}
            </td>
            <td className="px-9 py-4">
                {props.email}
            </td>
            <td className="px-9 py-4">
                {pokes}
            </td>
            <td className="px-9 py-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white w-48 font-bold py-2 px-4 rounded mt-5 flex flex-row justify-between"
                onClick={pokeUser}>
                    <div className="pl-12">Poke</div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                </button>
            </td>
        </tr>
    )
}
export default RenderUsersTable