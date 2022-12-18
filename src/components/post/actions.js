import { useContext, useState } from "react";
import Comment from "../../assets/icons/comment";
import Heart from "../../assets/icons/heart";
import userContext from "../../context/user";
import { likeUnlikePost } from "../../services/userService";
import Comments from "./comments";
import Footer from "./footer";


export default function Actions({postDetails, refreshPosts}) {

        
    const {user} = useContext(userContext)

    const likesCount = postDetails.likes.length
    const liked = postDetails.likes.includes(user.uid)

    console.log(postDetails, 'post details', user, 'userDetails')


    const handleLikeAction = async () => {

        if (liked) {
            // remove like
            await likeUnlikePost(postDetails.docId, user.uid, false)
        } else {
            // add like
            await likeUnlikePost(postDetails.docId, user.uid, true)
        }

        refreshPosts()

    }

    const [commentBoxOpen, setCommentBox] = useState(false)

    const toggleCommentBox = () => {
        setCommentBox(commentBoxOpen => !commentBoxOpen)
    }



    return (
        <div className="flex flex-col p-3">
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-3">
                        <Heart handleToggle={handleLikeAction} fill={liked ? 'red' : 'none'}/>
                        <Comment handleToggle={toggleCommentBox} fill={commentBoxOpen ? 'grey' : 'none'}/>
                </div>
                {
                    likesCount > 0 &&
                        <p className="font-bold">{likesCount > 1 ? likesCount + ' likes' :  '1 like'}</p>
                }
                <Footer userName={postDetails.userDetails.fullName} caption={postDetails.caption}/>
            </div>
            <div className="flex flex-col gap-1">
                {
                    postDetails.comments.map((comment, index) =>
                        <Comments key={index} comment={comment} />
                    )
                }
            </div>
        </div>
    )

}