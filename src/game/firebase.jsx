import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; //getting the DB from firebase database

const firebaseConfig = { //config file to allow this page to talk to the server
    apiKey: "AIzaSyBajy50H01kDsTgQyPOh_z9z390Zdmiw6E",
    authDomain: "truestrikevtt-25320.firebaseapp.com",
    databaseURL: "https://truestrikevtt-25320-default-rtdb.firebaseio.com",
    projectId: "truestrikevtt-25320",
    storageBucket: "gs://truestrikevtt-25320.appspot.com",
    messagingSenderId: "285980706870",
    appId: "1:285980706870:web:843420b74cc7e950ab3097"
};

const app = initializeApp(firebaseConfig); //should initilize the page with the DB
export const db = getDatabase(app);