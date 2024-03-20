import Canvas from './game/Canvas';
import './index.css'
import PluginPanel from './game/PluginPanel';

// FROM FIREBASE WEBSITE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBajy50H01kDsTgQyPOh_z9z390Zdmiw6E",
  authDomain: "truestrikevtt-25320.firebaseapp.com",
  databaseURL: "https://truestrikevtt-25320-default-rtdb.firebaseio.com",
  projectId: "truestrikevtt-25320",
  storageBucket: "truestrikevtt-25320.appspot.com",
  messagingSenderId: "285980706870",
  appId: "1:285980706870:web:843420b74cc7e950ab3097"
};

function App() {
  initializeApp(firebaseConfig);
  return (
    <div className='rootElem'>
      <div className='left-column'>
        <div className='plugin-panel'>
          <PluginPanel PluginName='Plugin 1'/>
          <PluginPanel PluginName='Plugin 2'/>
          <PluginPanel PluginName='Plugin 3'/>
          <PluginPanel PluginName='Plugin 4'/>
        </div>
      </div>
      <div className='right-column'>
        <Canvas/>
      </div>
    </div>
  );
}

export default App;

