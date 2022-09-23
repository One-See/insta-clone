 
 import Skeleton from 'react-loading-skeleton'

 const User = (props) => 
    !props.userName || !props.fullName ? (
        <Skeleton count={1} height={61} />
    ) : (
        <div>Hello</div>
    )

export default User