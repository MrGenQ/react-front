import {useUserContext} from "../../context/UserContext";

const AuthCheck = () =>{
    const {user} = useUserContext()
    return (
        <>
            {(!user)?
                window.location.pathname = '/login'
            :null}
        </>

    )
}
export default AuthCheck