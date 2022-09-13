import { useEffect } from "react"

import notfound from '../assets/images/insta-notfound.png'


export default function Notfound() {

    useEffect(() => {
        document.title = 'Not found'
    }, [])

    return (
        <div className="mx-auto max-w-sm sm:max-w-lg">
            <img src={notfound} alt="not found" />
            <p className="text-center text-4xl"> The page you are searching for is not found!</p>
        </div>
    )
}