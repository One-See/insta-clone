
import { arrayUnion, collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore/lite"
import { fireBaseApp, FieldValue } from "../library/firebase_config"

/**
 * function to check whether the username is taken or not
 * @param {string} username 
 * @returns {boolean}
 */
export const checkUserExists = async (username) => {
    const user = await getDocs(query(collection(fireBaseApp, 'users'), where('username', '==', username) ))

    console.log(user, 'user data')

   return  user.docs.length > 0 ? true : false
}


export const getUserbyUid = async (uid) => {

    const user = await getDocs(query(collection(fireBaseApp, 'users'), where('userId', '==', uid) ))

    console.log(user, 'user data')

    return user.docs.map(item => ({
        ...item.data(),
        docId: item.id
    })) 
}

export const getUsersToFollw = async (uid) => {
    const users = await getDocs(query(collection(fireBaseApp, 'users'), orderBy('dateCreated', 'desc'), limit(5)))

    console.log(users, 'fetched users to be followed')

    const user_profiles = []

    for (const data of users.docs) {
        if (!data.data().followers.includes(uid) && data.data().userId !== uid) {
            user_profiles.push({...data.data(), docId: data.id})
        }
    }

    return user_profiles
}

export const followUser = async (userDocId, userId, loggedInUserId, loggedInUserDocId) => {

    console.log(userDocId, 'userDocId', userId, 'userId', loggedInUserId, 'loggedInUserId', loggedInUserDocId, 'loggedInUserDocId')

    await updateDoc(doc(fireBaseApp, 'users', userDocId), {
        followers: arrayUnion(loggedInUserId)
    } )

    await updateDoc(doc(fireBaseApp, 'users', loggedInUserDocId), {
        following: arrayUnion(userId)
    } )

    console.log('updated')

}

export const getUserPostsByUserids = async (userIds, loggedInuserId) => {

    console.log(userIds, 'userIds to fetch posts of')

    if (!userIds || !userIds.length) {
        return []
    }

    const posts = await getDocs(query(collection(fireBaseApp, 'photos'), where('userId', 'in', userIds)))

    const followedUserPosts =  posts.docs.map(item => ({
        ...item.data(),
        docId: item.id
    })) 

    const withUserDetails = await Promise.all(
        followedUserPosts.map(async ele => {
            const [details] = await getUserbyUid(ele.userId)
            ele.userDetails = details
            if (ele.likes.includes(loggedInuserId)) {
                ele.likedByUser = true
            } else {
                ele.likedByUser = false
            }
            return ele
        })
    )

    return withUserDetails

}
