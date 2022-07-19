import {useEffect, useState} from "react";
import API from "../../API";

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