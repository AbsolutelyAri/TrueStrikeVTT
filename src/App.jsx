import Canvas from './game/Canvas';
import {useState} from 'react'
import './index.css'
import PluginPanel from './game/PluginPanel';
import Tilemap from './game/Tilemap';

function App() {
  const [selectedTile, setSelectedTile] = useState({x: 0, y: 0})
  
  
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
        <div>
          <Canvas selectedTile={selectedTile}/>
        </div>
        <div>
          <Tilemap setSelectedTile={setSelectedTile}/>
        </div>
      </div>
    </div>
  );
}

export default App;

