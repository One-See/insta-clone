 
 import Skeleton from 'react-loading-skeleton'
 import "react-loading-skeleton/dist/skeleton.css";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes'
import my_pic from '../../assets/images/my_pic.png'

 const User = (props) => 
    !props.userName || !props.fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={ROUTES.PROFILE_PAGE + props.userId} className="grid grid-cols-4 gap-6 mb-6 items-center">
            <div className='flex items-center justify-between col-span-1'>
                <img src={my_pic} alt="user profile" className='rounded-full w-16 h-16' />
            </div>
            <div className='col-span-3 font-sans'>
                <p className='font-bold'>{props.userName}</p>
                <p>{props.fullName}</p>
            </div>
        </Link>
    )

export default User