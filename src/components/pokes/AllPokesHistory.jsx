import Navbar from "../navbar/Navbar";
import RenderAllPokes from "./RenderAllPokes";
import {useEffect, useState} from "react";
import API from "../../API";
import RenderUsersTable from "../main/RenderUsersTable";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useUserContext} from "../../context/UserContext";
import Pagination from "../../misc/Pagination";
import AuthCheck from "../../services/auth/AuthCheck";
const AllPokesHistory = () =>{
    AuthCheck()
    const {update, handleSetUpdate} = useUserContext()
    const [allPokes, setPokes] = useState([])
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [filtered, setFiltered] = useState({})
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [searched, setSearched] = useState(false)
    useEffect(() => {
        try {
            API.postForm('/filter-pokes-from', {
                start: startDate.toISOString().substring(0, 10),
                end: endDate.toISOString().substring(0, 10),
                //limit: 10,
                //offset: (page-1)*10
            })
                .then(response => {
                    console.log(response)
                    setPokes(response.data)
                })
        } catch (error){
            console.log(error)
        }
    }, [startDate, endDate, searched])
    useEffect(() => {
        try {
            API.postForm('/get-all-pokes', {
                limit: 10,
                offset: (page-1)*10,
            })
                .then(response => {
                    console.log(response.data)
                    setLastPage(Math.ceil(response.data.page.length/10))
                    setPokes(response.data.data)
                })
        } catch (error){
            console.log(error)
        }
    }, [page])

    const searchName = (event) => {
        event.preventDefault()
        let names = 0
        try {
            API.postForm('/filter-pokes-by-email', {
                email: event.target.value
            })
                .then(response => {
                    names = response.data
                }).then(() => {
                    for(let i = 0; i<names.length; i++){
                        API.postForm(`/get-user-pokes`, {
                            'limit': 9999,
                            'email': names[i].email,
                        })
                            .then(response => {
                                setFiltered(prev => ({
                                    ...prev.data,
                                    ...response
                                }))
                            })
                    }
            })
        } catch (error){
            console.log(error)
        }
        setSearched(true)
    }
    return (
        <div className="container-fluid bg-gray-100">
            <Navbar/>
            <div className="bg-grey-lighter min-h-screen flex flex-col pt-12 pb-12">
                <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white w-full w-10/12 px-6 py-8 rounded shadow-md text-black pl-20 pr-20 ">
                        <h1 className="mb-8 text-3xl text-center uppercase">poke istorija</h1>
                        <div className="flex flex-row p-4">
                            <form className="w-full w-2/6">
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
                            <div className="block p-3 w-full text-sm text-gray-900 rounded-lg border border-gray-300
                                           focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex flex-row gap-2 w-full w-2/6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <DatePicker placeholderText="Data nuo" selected={startDate} onChange={(date) => {
                                    setStartDate(date)
                                    setSearched(true)
                                    handleSetUpdate(date)
                                }}
                                    className="w-8/12">
                                </DatePicker>
                            </div>
                            <div className="block p-3 w-full text-sm text-gray-900 rounded-lg border border-gray-300
                                           focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                                           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex flex-row gap-2 w-full w-2/6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <DatePicker placeholderText="Data iki" selected={endDate} onChange={(date) => {
                                    setEndDate(date)
                                    setSearched(true)
                                    handleSetUpdate(date)
                                }}
                                    className="w-8/12">
                                </DatePicker>
                            </div>
                        </div>
                        <div className="overflow-x-auto shadow-md sm:rounded-lg">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 w-2">
                                        Data
                                    </th>
                                    <th scope="col" className="px-9 py-3 w-2">
                                        Siuntėjas
                                    </th>
                                    <th scope="col" className="px-3 pl-12 w-2">

                                    </th>
                                    <th scope="col" className="">
                                        Gavėjas
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {filtered.data? filtered.data.map(d=>
                                    <RenderAllPokes key={d.id} id={d.id} sender={d.sender} recipient={d.recipient} date_time={d.date_time}/>
                                ):null}
                                {allPokes.length? allPokes.map(d=>
                                    <RenderAllPokes key={d.id} id={d.id} sender={d.sender} recipient={d.recipient} date_time={d.date_time}/>
                                ):null}
                                </tbody>

                            </table>


                        </div>
                        <div className="pt-2 flex justify-center pl-96">
                            {(allPokes && searched === false)?
                                <Pagination page={page} setPage={setPage} lastPage={lastPage}/>
                                :null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export  default  AllPokesHistory
/*
{allPokes && !filtered.data? allPokes.map(d=>
                                    <RenderAllPokes key={d.id} id={d.id} sender={d.sender} recipient={d.recipient} date_time={d.date_time}/>
                                ):null}
 */