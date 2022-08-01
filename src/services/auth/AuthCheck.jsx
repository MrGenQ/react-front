import {useAppContext} from "../../context/AppContext";
/*
Autentifikacijos funkcija,
jeigu aplikacija neturi vartotojo duomenų grąžinama i login komponentą
 */
const AuthCheck = () =>{
    const {user} = useAppContext()
    console.log(user)
    return (
        <>
            {(!user)?
                window.location.pathname = '/login'
            :null}
        </>

    )
}
export default AuthCheck