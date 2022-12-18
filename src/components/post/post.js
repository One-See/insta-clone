import { useContext } from "react";
import userContext from "../../context/user";
import Actions from "./actions";
import Header from "./header";
import Image from "./image";


export default function Post({post_details, refreshPosts}) {

    const {user} = useContext(userContext)

    return (
        user &&
        <div className="mb-16 col-span-2 bg-white border border-gray-300 rounded">
            <Header postDetails={post_details} />
            <Image caption={post_details.caption} imageSource={post_details.imageSrc} />
            <Actions postDetails={post_details} refreshPosts={refreshPosts}/>
        </div>
    )
}