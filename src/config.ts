// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: 'marina-labella-web',
    storageBucket: 'marina-labella-web.appspot.com',
    messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    databaseURL:
        'https://marina-labella-web-default-rtdb.europe-west1.firebasedatabase.app',
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(firebaseApp);
export const db = getDatabase(firebaseApp);
// const state = {
//     user: {
//         userName: '',
//         email: '',
//         uid: '',
//         token: '',
//     },
// };

export const loginWithGoogle = async () => {
    return await signInWithPopup(auth, provider);
};

export const login = async (email: string, password: string) => {
    // state.user.token = await userCredentials.user.getIdToken()
    return await signInWithEmailAndPassword(auth, email, password);
};

// export const logout = () => {
//     signOut(auth);
//     state.user = {
//         userName: '',
//         email: '',
//         uid: '',
//         token: '',
//     };
// };

// const users: User[] = []
// ColUsers:
// collectionUsers

// Object.keys() //
// Object.entries() // convierte en array el objeto collección
// Object.values() //
// for (const key in object) {
//     if (Object.prototype.hasOwnProperty.call(object, key)) {
//         const element = object[key];

//     }
// }
