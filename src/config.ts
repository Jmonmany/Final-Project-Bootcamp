// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: 'marina-labella-web',
    storageBucket: 'marina-labella-web.appspot.com',
    messagingSenderId: process.env.REACT_APP_MESSAGIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(firebaseApp);

const state = {
    user: {
        userName: '',
        email: '',
        uid: '',
        token: '',
    },
};

export const loginWithGoogle = async () => {
    const userCredentials = await signInWithPopup(auth, provider);
    state.user.userName = userCredentials.user.displayName as string;
    state.user.email = userCredentials.user.email as string;
    state.user.uid = userCredentials.user.uid;
    state.user.token = await userCredentials.user.getIdToken();
    console.log(userCredentials);
};

export const login = async (email: string, password: string) => {
    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
    state.user.userName = userCredentials.user.displayName as string;
    state.user.email = userCredentials.user.email as string;
    state.user.uid = userCredentials.user.uid;
    state.user.token = await userCredentials.user.getIdToken()
    console.log(userCredentials);
};

export const logout = () => {
    signOut(auth);
    state.user = {
        userName: '',
        email: '',
        uid: '',
        token: '',
    };
};


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


















