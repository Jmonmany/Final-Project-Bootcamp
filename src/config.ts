import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';

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

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(firebaseApp);
export const db = getDatabase(firebaseApp);

export const loginWithGoogle = async () => {
    return await signInWithPopup(auth, provider);
};

export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};
