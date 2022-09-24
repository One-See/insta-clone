
import { useState } from 'react'
import { Link } from 'react-router-dom'
import pic from '../../assets/images/my_pic.png'

import * as ROUTES from '../../constants/routes'
import { followUser } from '../../services/userService'

export default function SuggestedUser({username, fullName, userId, userDocId, loggedInUserId, loggedInuserDocId}) {

    const [followed, setFollowed] = useState(false)

    const handleFollow = async () => {
        console.log('...preparing to follow')

        await followUser(userDocId, userId, loggedInUserId, loggedInuserDocId)

        setFollowed(true)
    }

    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex justify-between items-center">
                <img src={pic} alt="user profile" className='rounded-full w-8 h-8 mr-3' />
                <Link to={ROUTES.PROFILE_PAGE + userId } >
                    <p className='font-bold text-sm'>
                        {fullName}
                    </p>
                </Link>
            </div>
            <button disabled={followed} className={!followed ? 'text-blue-500 text-xs' : 'text-gray-400 text-xs'} type='button' onClick={handleFollow}>
                Follow
            </button>
        </div>
    )

}