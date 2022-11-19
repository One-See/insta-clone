
import * as ROUTES from '../../constants/routes'
import mypic from '../../assets/images/my_pic.png'
import { Link } from 'react-router-dom'

export default function Header({postDetails}) {
    return (
        <div className="flex ml-3 col-span-full py-4">
            <div className="flex items-center">
                <Link to={ROUTES.PROFILE_PAGE + postDetails.userId}>
                    <img src={mypic} alt='profile' className='w-8 h-8 rounded-full' />
                </Link>
                <p className='font-bold ml-3'>{postDetails.userDetails.fullName}</p>
            </div>
        </div>
    )
}