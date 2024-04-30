import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"
import { useState } from "react";
import styles from './canvas.module.css'

export function AuthenticationButton() {

    const loginText = 'Login with Google';
    const logoutText = 'Sign Out';
    const [ButtonText, setButtonText] = useState(loginText);

    var isPlayerLoggedIn = false;

    const handleGoogleLogin = async (e) => {
        if(isPlayerLoggedIn){
            auth.signOut();
        } else {
            const provider = await new GoogleAuthProvider();
            return signInWithPopup(auth, provider);
        }
    }

    // Checks for change in the state of the authentication
    auth.onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            setButtonText(logoutText);
            isPlayerLoggedIn = true;
        } else {
            // User is signed out
            setButtonText(loginText);
            isPlayerLoggedIn = false;
        }
    });

    return (
        <button className={styles.button} onClick={handleGoogleLogin}>{ButtonText}</button>
    )
}