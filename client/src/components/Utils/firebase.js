import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB-ZDm4LrJKZbpNOGHQbQq0HRkWron5sWo",
    authDomain: "fyp-bb1b4.firebaseapp.com",
    projectId: "fyp-bb1b4",
    storageBucket: "fyp-bb1b4.appspot.com",
    messagingSenderId: "620602328917",
    appId: "1:620602328917:web:99cee7a60afda43b9091dc"
};

const app = initializeApp(firebaseConfig);
export const Storage = getStorage(app);