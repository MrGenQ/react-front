import Navbar from "../navbar/Navbar";
import {useState} from "react";
import API from "../../API";
/*
Poke json importavimo funkcija,
funkcija siunčia json duomenis į backend, kad funkcija sukurtų naujus poke
 */
const ImportPokes = () => {
    const [file, setSelectedFile] = useState();
    function handleSubmit(e){
        e.preventDefault()
        const fileReader = new FileReader();
        fileReader.readAsText(file, "UTF-8");
        fileReader.onload = e => {
            const target = e.target;
            const json_data = target?.result;
            try {
                API.postForm("/poke-import",{
                    file: json_data,
                }).then(resp => console.log(resp))
            } catch(error) {
                console.log(error)
            }
        }
    }
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    return (
        <div className="container-fluid bg-gray-100">
            <Navbar/>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white w-full w-1/2 px-6 py-8 rounded shadow-md text-black">
                        <h1 className="mb-8 text-3xl text-center uppercase">Poke importavimas</h1>
                       <form onSubmit={handleSubmit}>
                           <label
                               className="block text-gray-700 text-2xl font-bold mb-3 my-3"
                               htmlFor="file"
                           >
                               Pasirinkti JSON failą
                           </label>
                           <input
                               id="file"
                               type="file"
                               name="file"
                               aria-label="Pasirinkti faila"
                               onChange={changeHandler}
                               //accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xlsx, .xls .JSON "
                               //multiple
                               className="form-select form-select-sm
                                            appearance-none
                                            block
                                            w-full
                                            px-2
                                            py-2
                                            text-sm
                                            font-normal
                                            text-gray-700
                                            bg-white bg-clip-padding bg-no-repeat
                                            border border-solid border-gray-300
                                            rounded
                                            transition
                                            ease-in-out
                                            m-0
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                           ></input>
                           <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-36 font-bold py-2 px-4 rounded mt-5">
                               Importuoti
                           </button>
                       </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ImportPokes