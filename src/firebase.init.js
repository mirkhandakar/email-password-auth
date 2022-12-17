// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtvV4Fc8e_AmkbBwqInL5pkFvqU76lVeM",
    authDomain: "email-password-auth-b900e.firebaseapp.com",
    projectId: "email-password-auth-b900e",
    storageBucket: "email-password-auth-b900e.appspot.com",
    messagingSenderId: "468138644901",
    appId: "1:468138644901:web:b6a738e98a79905ab8844c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;