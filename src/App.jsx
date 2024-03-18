import Canvas from './game/Canvas';
import './index.css'
import PluginPanel from './game/PluginPanel';


function App() {

  return (
    <div className='rootElem'>
      <div className='left-column'>
        <div className='plugin-panel'>
          <PluginPanel />
        </div>
      </div>
      <div className='right-column'>
        <Canvas/>
      </div>
    </div>
  );
}

export default App;

