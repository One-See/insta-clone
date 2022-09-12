
import { collection, getDocs, query, where } from "firebase/firestore/lite"
import { fireBaseApp, FieldValue } from "../library/firebase_config"


const checkUserExists = async (username) => {
    const user = await getDocs(query(collection(fireBaseApp, 'users'), where('username', '==', username) ))

    console.log(user, 'user data')

   return  user.docs.length > 0 ? true : false
}

export default checkUserExists