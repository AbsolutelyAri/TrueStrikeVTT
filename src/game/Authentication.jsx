import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./firebase"

export const handleGoogleLogin = async (e) => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}