
import * as ROUTES from '../../constants/routes'
import mypic from '../../assets/images/my_pic.png'
import { Link } from 'react-router-dom'

export default function Header({postDetails}) {
    return (
        <div className="flex border-gray-100 border-b col-span-full py-4">
            <div className="flex items-center">
                <Link to={ROUTES.PROFILE_PAGE + postDetails.userId}>
                    <img src={mypic} alt='profile' />
                </Link>
            </div>
        </div>
    )
}