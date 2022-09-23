
import { collection, getDocs, query, where } from "firebase/firestore/lite"
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
