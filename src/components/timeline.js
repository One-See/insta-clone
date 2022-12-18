import { useContext, useEffect, useState } from "react"
import Skeleton from "react-loading-skeleton"
import userContext from "../context/user"
import useUserPhotos from "../hooks/user_photos"
import Post from "./post/post"

export  default function Timeline() {

    const {user} = useContext(userContext)

    const [refresh, setRefresh] = useState(false)
    
    const {posts} = useUserPhotos(refresh)

    const refreshPosts = () => {
        console.log('refresh called')
        setRefresh(prevRefresh => {
            return !prevRefresh
        })
    }

    return (
        <div className="col-span-2">
            {
                !posts && user ? <>
                    <Skeleton count={4} width={640} height={200} className="mb-3"/>
                </> : posts?.length > 0 ? posts.map(item => 
                    <Post key={item.docId} post_details={item} refreshPosts={refreshPosts}/>
                ) : user ? <p className="text-center">Follow people to see some exciting posts!</p> : <p className="text-center">Please login to see some exciting posts!</p>
            }
        </div>
    )
}