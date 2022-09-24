
import { arrayUnion, collection, doc, getDocs, limit, query, updateDoc, where } from "firebase/firestore/lite"
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
    const users = await getDocs(query(collection(fireBaseApp, 'users'), where('followers', "not-in", [[uid]]), limit(5)))

    console.log(users, 'fetched users to be followed')

    const user_profiles = []

    for (const data of users.docs) {
        if (data.data().userId !== uid) {
            user_profiles.push({
                ...data.data(),
                docId: data.id
            })
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
