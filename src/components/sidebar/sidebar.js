import useUser from "../../hooks/user_listner"
import Suggestions from "./suggestions"
import User from "./user"

export  default function Sidebar() {

    const {user} = useUser()

    console.log(user, 'fetched user')

    return (
        <div>
            <User userName={user.username} fullName={user.fullName} />
            <Suggestions userId={user.userId} />
        </div>
    )
}