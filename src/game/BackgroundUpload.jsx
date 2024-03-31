import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// !! TEMPORARY - Initialize all this somewhere else later but for now it needs to be done here !! //

// FROM FIREBASE WEBSITE
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBajy50H01kDsTgQyPOh_z9z390Zdmiw6E",
  authDomain: "truestrikevtt-25320.firebaseapp.com",
  databaseURL: "https://truestrikevtt-25320-default-rtdb.firebaseio.com",
  projectId: "truestrikevtt-25320",
  storageBucket: "gs://truestrikevtt-25320.appspot.com",
  messagingSenderId: "285980706870",
  appId: "1:285980706870:web:843420b74cc7e950ab3097"
};

console.log("Initializing app");
firebase.initializeApp(firebaseConfig); 

var storageRef = firebase.storage().ref(); 

var backgroundRefPath = 'images/background.png'; // Temporarily set to background.png, will be reworked later
var backgroundRef = storageRef.child(backgroundRefPath);


export function StoreBackground(file) {
    var metadata = {
        contentType: 'image/png',
    };
    
    backgroundRef.put(file, metadata);
}

export function RetrieveBackground() {
    backgroundRef.getDownloadURL().then((url) => {
        console.log(url);
        return url;
    })
    .catch((error) => { 
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object-not-found':
                console.error('background storage object not found')
                break;
            case 'storage/unauthorized':
                console.error('unauthorized storage access')
                break;
            case 'storage/canceled':
                console.error('storage canceled error')
                break;
            default:
                console.error('unknown storage error')
                break;
        }
    });
}

// Will need these later when we get around to multiple sessions/screens/etc.
//
// function GetBackgroundRefPath(){
//     return backgroundRefPath;
// }

// function SetBackgroundRefPath(path) {
//     backgroundRefPath = path;
//     backgroundRef = storageRef.child(path);
// }

