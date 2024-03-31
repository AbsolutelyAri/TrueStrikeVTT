import Canvas from './game/Canvas';
import {useState} from 'react'
import './index.css'
import PluginPanel from './Plugins/PluginPanel.jsx';
import Tilemap from './game/Tilemap';
import { PluginProvider } from './Plugins/PluginProvider.jsx';
import DicePlugin from './Plugins/DicePlugin';
// FROM FIREBASE WEBSITE
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBajy50H01kDsTgQyPOh_z9z390Zdmiw6E",
//   authDomain: "truestrikevtt-25320.firebaseapp.com",
//   databaseURL: "https://truestrikevtt-25320-default-rtdb.firebaseio.com",
//   projectId: "truestrikevtt-25320",
//   storageBucket: "truestrikevtt-25320.appspot.com",
//   messagingSenderId: "285980706870",
//   appId: "1:285980706870:web:843420b74cc7e950ab3097"
// };

function App() {
  const [selectedTile, setSelectedTile] = useState({x: 0, y: 0})

  const [plugins, setPlugins] = useState([
    {name: "GridColor", enabled: false},
    {name: "DicePlugin", enabled: true}
  ])
  
  const togglePlugin = (pluginName) => {
   setPlugins(plugins.map(plugin =>
     plugin.name === pluginName ? {...plugin, enabled: !plugin.enabled} : plugin
   ))
  }
  
  return (
    <PluginProvider>
      <div className='rootElem'>
        <div className='left-column'>
          <div className='plugin-panel'>
            {/* <PluginPanel PluginName='Plugin 1'/>
            <PluginPanel PluginName='Plugin 2'/>
            <PluginPanel PluginName='Plugin 3'/>
          <PluginPanel PluginName='Plugin 4'/> */}
            {plugins.map((plugin) => (
              <PluginPanel 
              pluginName={plugin.name} 
              plugin={plugin} 
              onToggle={() => togglePlugin(plugin.name)}
              />
            ))}
          
          </div>
        </div>
        <div className='right-column'>
        <DicePlugin /> {/* Use the DicePlugin component */}
          <div>
            <Canvas selectedTile={selectedTile}/>
          </div>
          <div>
            <Tilemap setSelectedTile={setSelectedTile}/>
          </div>
        </div>
      </div>
    </PluginProvider>
  );
}

export default App;

