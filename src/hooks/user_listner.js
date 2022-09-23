import { useContext, useEffect, useState } from "react";

import userContext from "../context/user"; 
import { getUserbyUid } from "../services/userService";


export default function useUser() {
    const [activeUser, setactiveUser] = useState({})

    const {user} = useContext(userContext)

    useEffect(() => {

        const getUserObjByUid = async () => {
            const [response] =  await getUserbyUid(user.uid)
            setactiveUser(response)
        }

        if (user?.uid) {
            getUserObjByUid()
        }
    }, [user])

    return {user: activeUser}
}