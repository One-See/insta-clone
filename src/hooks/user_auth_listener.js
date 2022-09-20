import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import FireBaseContext from "../context/firebase";
import { auth } from "../library/firebase_config";


export default function useAuthListner() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const {fireBaseApp} = useContext(FireBaseContext)

    useEffect(() => {
        const listner = onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('authUser', JSON.stringify(user))
                setUser(user)
            } else {
                localStorage.removeItem('authUser')
                setUser(null)
            }
        })

        return () => listner()

    }, [fireBaseApp])

    return {user}

}