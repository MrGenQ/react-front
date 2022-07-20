import {useEffect, useState} from "react";
import API from "../../API";
import {useUserContext} from "../../context/UserContext";
import {Link} from "react-router-dom";

const RenderUsersTable = (props) => {
    const {user, update, handleSetUpdate} = useUserContext()
    const [pokes, setPokes] = useState(0)
    const pokeUser = () => {
        try {
            API.post('/pokes', {
                sender: user.email,
                recipient: props.email,
            }).then(response => {
                handleSetUpdate(`poke_id ${response.data.id}`)
            }).then(() => {
                API.postForm('/send-email', {
                    sender: user.email,
                    recipient: props.email,
                }).then(resp => console.log(resp))
            })
        } catch(err) {
            console.log(err);
        }

    }
    useEffect(() => {
        API.postForm('get-pokes', {
            email: props.email,
        }).then(resp => {
            if(resp.data){
                setPokes(resp.data.length)
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