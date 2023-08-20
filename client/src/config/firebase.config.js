import {getApps, getApp, initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDINGID,
    appId: process.env.REACT_APP_APPID,
};

const app = getApps.length>0?getApp(): initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
export {app, firebaseAuth};