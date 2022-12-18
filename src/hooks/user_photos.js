import { useContext, useEffect, useState } from "react";
import userContext from "../context/user";
import { getUserbyUid, getUserPostsByUserids } from "../services/userService";

export default function useUserPhotos(refresh = false) {

    const {user} = useContext(userContext)

    const [photos, setPhotos] = useState(null)

    console.log('in useUserPhotes')

    useEffect(() => {
        
        async function getPostsByUserIds() {

            console.log('in useEffect of useUserPosts')
            
            const [userData] = await getUserbyUid(user.uid)

            console.log('fetched user data', userData)

            const followingUserIds = []
    
            for (const data of userData.following) {
                followingUserIds.push(data)
            }
            const posts = await getUserPostsByUserids(followingUserIds, user.uid)

            console.log('fetched posts', posts)

            posts.sort((a,b) => b.dateCreated - a.dateCreated)

            setPhotos(posts)

        }

        if (user?.uid) {
            getPostsByUserIds()
        }

    }, [user, refresh])

    return {posts: photos}

}