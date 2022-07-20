import {useEffect, useState} from "react";
import API from "../../API";
/*
Funkcija atvaizduoja vartotojo poke
ir automatiškai įvygdo POST kad poker email gražintų kaip vardą ir pavardę
 */
const RenderUserPokes = (props) => {
    const [userInfo, setUserInfo] = useState('')
    useEffect(() => {
        API.postForm('/user-by-email', {
            email: props.sender,
        }).then(response => setUserInfo(response.data))
    }, [])
    return (
        <>
            {userInfo?
                <>
                    <div className="flex flex-row gap-1 w-96 pt-2 pb-2">
                        <div>Poke nuo </div><div className="font-bold">{userInfo.firstName} {userInfo.lastName}</div>
                    </div>
                    <hr></hr>
                </>
                :null}
        </>
    )
}
export default RenderUserPokes