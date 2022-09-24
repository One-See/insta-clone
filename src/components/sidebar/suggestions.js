import { useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import { getUsersToFollw } from "../../services/userService"
import SuggestedUser from "./suggestedUser"


export default function Suggestions(props) {

    const [profiles, setProfiles] = useState(null)

    useEffect(() => {

        const getUsers = async () => {
            const user_profiles = await getUsersToFollw(props.userId)
            setProfiles(user_profiles)
        }

        if (props.userId) {
            getUsers()
        }

    }, [props.userId])

    return (
        props.userId && <>
            {
                !profiles ? <Skeleton count={3} height={61} /> :
                    <div className="rounded flex gap-2 flex-col">
                        <div className="flex items-center justify-between mb-2">
                            <p className="font-bold text-gray-500">Suggested people to follow</p>
                        </div>
                        {
                            profiles.map(item => (
                                <SuggestedUser key={item.docId} userDocId={item.docId} loggedInUserId={props.userId} userName={item.username} fullName={item.fullName} loggedInuserDocId={props.docId} userId={item.userId}/>
                            ))
                        }

                    </div>
            }
        </>
    )
 }