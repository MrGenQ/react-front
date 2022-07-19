import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import './index.css'
const Pagination = ({page, setPage, lastPage, step = 2}) => {
    const [pagination, setPagination] = useState([]);
    const nextPage = () => {
        if(page+1 <= lastPage) {
            setPage(page + 1);
        }
    }

    const prevPage = () => {
        if(page-1 > 0) {
            setPage(page - 1);
        }
    }
    const pageRange = (page, step, lastPage) => {
        let range = [];

        if(step * 2 + 1 <= step + page) {
            for(let iter = page - step; iter <= page + step; iter++) {
                range.push(iter);
                if(lastPage === iter) {
                    break;
                }
            }
        } else {
            for(let iter = 1; iter <= step * 2 + 1; iter++) {
                range.push(iter);
                if(lastPage === iter) {
                    break;
                }
            }
        }

        return range;
    }
    useEffect(() => {
        setPagination(pageRange(page, step, lastPage))
    }, [page, lastPage])
    return (
        <nav>
            { pagination.length-1 ?
                <ul className="inline-flex pag-width -space-x-px pagination flex-wrap flex gap-3">
                    <li className="page-item">
                        <button className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white page-link" onClick={() => prevPage()}  aria-disabled="true">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                    </li>
                    {page < 4? null :
                        <>
                            <li className="page-item">
                                <button className="py-2 px-3 leading-tight text-black bg-gray-200 border border-gray-300 rounded-full hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white page-link"
                                        onClick={() => setPage(1)}>1</button>
                            </li>
                        </>
                    }
                    {page < 5? null: <div className="pt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                        </svg>
                    </div>}
                    {
                        pagination.map(curr => (
                            <li key={nanoid()}>
                                <button className={`${curr === page ? "py-2 px-3 leading-tight text-white rounded-full bg-blue-500 border border-gray-300 hover:bg-blue-100  dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    :
                                    "py-2 px-3 leading-tight text-black bg-gray-200 border border-gray-300 rounded-full hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white page-link"}`}
                                        onClick={() => setPage(curr)}>{curr}</button>
                            </li>
                        ))
                    }
                    {page >= lastPage-3? null: <div className="pt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                        </svg>
                    </div>}
                    {page >= lastPage - 2? null :
                        <>
                            <li className="page-item">
                                <button className="py-2 px-3 leading-tight text-black bg-gray-200 border border-gray-300 rounded-full hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white page-link"
                                    onClick={() => setPage(lastPage)}>{lastPage}</button>
                            </li>
                        </>
                    }
                    <li className="page-item">
                        <button className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-full hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white page-link" onClick={() => nextPage()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </li>
                </ul>
                :
                null}
        </nav>

    )
}

export default Pagination;