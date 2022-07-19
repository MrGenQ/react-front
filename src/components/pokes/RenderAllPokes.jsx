import {useEffect, useState} from "react";
import API from "../../API";

const RenderAllPokes = (props) => {
    const [sender, setSender] = useState('')
    const [recipient, setRecipient] = useState('')
    useEffect(() => {
        try {
            API.postForm('/user-by-email', {
                email: props.sender,
            }).then(response => {
                setSender(response.data)
            })
        } catch (error){
            console.log(error)
        }
        try {
            API.postForm('/user-by-email', {
                email: props.recipient,
            }).then(response => setRecipient(response.data))
        } catch (error){
            console.log(error)
        }
    }, [])
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                    {props.date_time.substring(0, 10)}
                </td>
                {sender?
                    <td className="px-9 py-4 w-52">
                        {sender.firstName} {sender.lastName}
                    </td>
                :null}
                <td>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                </td>
                <td>
                    {recipient.firstName} {recipient.lastName}
                </td>
            </tr>

        </>
    )
}
export default RenderAllPokes