import Header from "./header";
import Image from "./image";


export default function Post({post_details}) {
    return (
        <div className="mb-16 col-span-2 bg-white border border-gray-300 rounded">
            <Header postDetails={post_details} />
            <Image caption={post_details.caption} imageSource={post_details.imageSrc} />
        </div>
    )
}