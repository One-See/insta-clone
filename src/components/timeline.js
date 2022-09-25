import Skeleton from "react-loading-skeleton"
import useUserPhotos from "../hooks/user_photos"
import Post from "./post/post"

export  default function Timeline() {

    const {posts} = useUserPhotos()

    return (
        <div className="col-span-2">
            {
                !posts ? <>
                    <Skeleton count={4} width={640} height={200} className="mb-3"/>
                </> : posts?.length > 0 ? posts.map(item => 
                    <Post key={item.docId} post_details={item} />
                ) : <p className="text-center">Follow people to see some exciting posts!</p>
            }
        </div>
    )
}