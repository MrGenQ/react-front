import Navbar from "../navbar/Navbar";
import RenderUsersTable from "../main/RenderUsersTable";
import {useEffect, useState} from "react";
import API from "../../API";
import Pagination from "../../misc/Pagination";

const UserSearch = () => {
    const [users, setUsers] = useState('')
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [name, setName] = useState('')
    const searchName = (event) => {
        event.preventDefault()
        setName(event.target.value)
        console.log(event.target.value)
    }
    useEffect(() => {
        try {
            API.postForm('/user-search', {
                name: name,
                limit: 10,
                offset: (page-1)*10,
            })
                .then(response => {
                    console.log(response.data.page)
                    setLastPage(Math.ceil(response.data.page.length/10))
                    setUsers(response.data.data)
                })
        } catch (error){
            console.log(error)
        }
    }, [page, name])
    console.log(users)
    return (
        <div className="container-fluid bg-gray-100">
            <Navbar/>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white w-full px-6 py-8 rounded shadow-md text-black">
                        <h1 className="mb-8 text-3xl text-center uppercase">vartotojai</h1>
                        <form className="w-full pb-12">
                            <label htmlFor="default-search"
                                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                         fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <input type="search" id="name" name="name"
                                       className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300
                                           focus:ring-blue-500 focus:border-blue-500"
                                       placeholder="Ieškoti pagal vardą"
                                       onChange={searchName}/>
                            </div>
                        </form>
                        {(users.length !== 0)?
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
                                    {(users)? users.map(d=>
                                        <RenderUsersTable key={d.id} id={d.id} firstName={d.firstName} lastName={d.lastName} email={d.email}/>
                                    ):null}
                                    </tbody>
                                </table>
                            </div>
                        :null}
                        <div className="pt-2 flex justify-center pl-96">
                            {(users.length !== 0)?
                                <Pagination page={page} setPage={setPage} lastPage={lastPage}/>
                                :null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserSearch