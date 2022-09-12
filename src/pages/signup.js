import iphone_insta_signup from '../assets/images/iphone-insta-signup.png'

import insta_logo from '../assets/images/insta-logo.png'

import {Link, useNavigate} from 'react-router-dom'

import { useEffect } from 'react'
import { useState } from 'react'

import FireBaseContext from '../context/firebase'
import { useContext } from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth';

import * as ROUTES from '../constants/routes'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite'
import checkUserExists from '../services/userService'

export default function Signup() {

    const {auth, fireBaseApp} = useContext(FireBaseContext)

    const navigate = useNavigate()


    useEffect(() => {
        document.title = 'sign up - instagram clone by one-see'
    }, [])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [error, setError] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleFullname = (event) => {
        setFullname(event.target.value)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleSubmit = async () => {
        console.log('submit button clicked')

        if (isInValid) {
            setError('Please enter valid details')
            return
        }

        const doesUserExits = await checkUserExists(username)

        console.log(doesUserExits, 'does user exist')

        if (!doesUserExits) {
            try {
    
                const sign_up_response = await createUserWithEmailAndPassword(auth, email, password )
    
                // user created
                console.log(sign_up_response, 'sign up response')
    
                // user details added to users collection
                await addDoc(collection(fireBaseApp, 'users'), {
                    emailAddress: email.toLowerCase(),
                    followers: [],
                    following: ["vP0hawmXTcY8KUnvy1TAHIhS2ar1"],
                    fullName: fullname,
                    userId: sign_up_response.user.uid,
                    username: username.toLowerCase(),
                    dateCreated: new Date().getTime()
                })
    
                navigate('/')
    
    
            } catch(err) {
                console.log(err, 'Error in sign up')
                setEmail('')
                setPassword('')
                setFullname('')
                setUsername('')
                setError(err.message.split('Firebase: Error ')[1])
    
            }
        } else {
            setUsername('')
            setError(`Looks like the user name is taken! try another.`)
        }

    }

    const isInValid = password === '' || email === '' || username === '' || fullname === ''

    return (
        <div className="container mx-auto flex max-w-screen-md items-center h-screen">
            <div className="hidden sm:w-4/6 sm:flex">
                <img src={iphone_insta_signup}  alt="iphone with instagram pic" />
            </div>
            <div className='flex flex-col p-10 w-full sm:w-3/6 sm:p-0'>
                <div className='flex flex-col items-center bg-white p-4 border mb-4'>
                    <h1 className='flex justify-center w-full mb-4'>
                        <img src={insta_logo} alt="instagram logo" />
                    </h1>
                    {error && <p className='text-red-500 text-center'>{error}</p>}
                    <input type='text' value={username} onChange={handleUsername} className='text-xl w-full mr-3 py-3 px-4 border rounded mb-2' placeholder='Enter username' />
                    <input type='text' value={fullname} onChange={handleFullname} className='text-xl w-full mr-3 py-3 px-4 border rounded mb-2' placeholder='Enter fullname' />
                    <input type='text' value={email} onChange={handleEmailChange} className='text-xl w-full mr-3 py-3 px-4 border rounded mb-2' placeholder='Email address' />
                    <input type='password' value={password} onChange={handlePasswordChange} placeholder='Enter password' className='text-xl w-full mr-3 py-3 px-4 border rounded mb-2' />
                    <button disabled={isInValid} type='submit' onClick={handleSubmit} className={`text-xl text-white font-bold w-full mr-3 py-3 px-4 bg-blue-500 rounded ${isInValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Sign up
                    </button>
                </div>
                <div className='flex justify-center items-center w-full border flex-col p-4'>
                    Have an account?{' '}
                    <Link to={ROUTES.LOGIN_PAGE} className='font-bold'>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}