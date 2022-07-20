import Navbar from "../navbar/Navbar";
import AuthCheck from "../../services/auth/AuthCheck";
import {useEffect, useState} from "react";
import API from "../../API";
import {useUserContext} from "../../context/UserContext";
import RenderUsersTable from "./RenderUsersTable";
import Pagination from "../../misc/Pagination";

const Main = () => {
    AuthCheck()
    const {user, allUsers, handleGetUsers} = useUserContext()
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    useEffect(() => {
        API.postForm('/user', {
            limit: 10,
            offset: (page-1)*10,
        })
            .then(response => {
                setLastPage(Math.ceil(response.data.page.length/10))
                handleGetUsers(response.data.data)
            })
    }, [page])
    return(
        <div className="container-fluid bg-gray-100">
            <Navbar/>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white w-full px-6 py-8 rounded shadow-md text-black">
                        <h1 className="mb-8 text-3xl text-center uppercase">vartotojai</h1>
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-white text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Vardas
                                    </th>
                                    <th scope="col" className="px-9 py-3">
                                        Pavardė
                                    </th>
                                    <th scope="col" className="px-9 py-3">
                                        El. paštas
                                    </th>
                                    <th scope="col" className="px-9 py-3">
                                        Poke skaičius
                                    </th>
                                    <th scope="col" className="px-9 py-3">

                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {(allUsers)? allUsers.map(d=>
                                    <RenderUsersTable key={d.id} id={d.id} firstName={d.firstName} lastName={d.lastName} email={d.email}/>
                                ):null}
                                </tbody>
                            </table>
                            <div className="pt-2 flex justify-center pl-96">
                                {allUsers?
                                    <Pagination page={page} setPage={setPage} lastPage={lastPage}/>
                                    :null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Main