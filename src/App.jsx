import Canvas from './game/Canvas';
import './index.css'
import PluginPanel from './game/PluginPanel';


function App() {

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

