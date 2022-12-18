
import { signOut } from 'firebase/auth'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import insta_logo from '../assets/images/insta-logo.png'


import * as ROUTES from '../constants/routes'
import userContext from '../context/user'

import { auth } from '../library/firebase_config'

export default function Header() {

    const {user} = useContext(userContext)

    const handleSignOut = () => {
        signOut(auth).then(data => {
            console.log(data, 'signed out')
        }).catch(err => {
            console.log(err, 'Failed to sign out')
        })
    }

    return (
        <nav className="mx-0 my-0 p-4 max-w-screen shadow-lg shadow-gray-200 bg-white">
            <div className='container h-full flex mx-auto justify-between'>
                <h1 className='text-center items-center'>
                    <img src={insta_logo} alt="instagram logo" className='w-24' />
                </h1>
                <div className='space-x-4 mr-2 font-mono flex text-center items-center'>
                    {
                        user ? (
                            <>
                                <Link to={ROUTES.LOGIN_PAGE} onClick={handleSignOut}>
                                    {/* <button className='font-bold'>Sign out</button> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                                    </svg>

                                </Link>
                                <Link to={ROUTES.PROFILE_PAGE + user.uid}>
                                    <img src={insta_logo} alt="user profile" className='rounded-full border cursor-pointer h-8 w-8' />
                                </Link>
                            </>

                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN_PAGE}>
                                    <button className='border bg-blue-400 w-20 rounded text-white'>Login</button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP_PAGE}>
                                    <button className='font-bold'>Sign up</button>
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </nav>
    )
}