
import iphone_insta_logo from '../assets/images/iphone-insta-pic.png'
import insta_logo from '../assets/images/insta-logo.png'

import {Link, useNavigate} from 'react-router-dom'

import * as ROUTES from '../constants/routes'
import { useEffect } from 'react'
import { useState } from 'react'

import FireBaseContext from '../context/firebase'
import { useContext } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function Login() {

    const {auth} = useContext(FireBaseContext)

    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Login - Instagram clone by one-see'
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const isInValid = password === '' || email === ''

    const handleSubmit = async () => {
        if (isInValid) {
            setError('please provide valid email and/or password')
            return
        }

        try {

            setError('')

            const signInResponse = await signInWithEmailAndPassword(auth, email, password)

            console.log(signInResponse, 'sign in response')

            // successfull login
            navigate(ROUTES.DASHBOARD_PAGE)

        } catch(err) {
            console.log(err, 'Error with fire base')
            setEmail('')
            setPassword('')
            setError(err.message.split('Firebase: Error ')[1])
        }


    }

    return (
        <div className="container mx-auto flex max-w-screen-md items-center h-screen">
            <div className="hidden sm:w-4/6 sm:flex">
                <img src={iphone_insta_logo}  alt="iphone with instagram pic" />
            </div>
            <div className='flex flex-col p-10 w-full sm:w-3/6 sm:p-0'>
                <div className='flex flex-col items-center bg-white p-4 border mb-4'>
                    <h1 className='flex justify-center w-full mb-4'>
                        <img src={insta_logo} alt="instagram logo" />
                    </h1>
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    <input type='text' value={email} onChange={handleEmailChange} className='text-xl w-full mr-3 py-3 px-4 border rounded mb-2' placeholder='Email address' />
                    <input type='password' value={password} onChange={handlePasswordChange} placeholder='Enter password' className='text-xl w-full mr-3 py-3 px-4 border rounded mb-2' />
                    <button disabled={isInValid} type='submit' onClick={handleSubmit} className={`text-xl text-white font-bold w-full mr-3 py-3 px-4 bg-blue-500 rounded ${isInValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Login
                    </button>
                </div>
                <div className='flex justify-center items-center w-full border flex-col p-4'>
                    Don't have an account?{' '}
                    <Link to={ROUTES.SIGN_UP_PAGE} className='font-bold'>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}