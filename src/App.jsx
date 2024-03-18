import {useState} from 'react';
import Canvas from './game/Canvas';
import './index.css'
import Tilemap from './game/Tilemap'


function App() {
  const [currentColor, setCurrentColor] = useState('red')

  return (
    <div className='rootElem'>
      <div className='left-column'>
        <Tilemap onSelectColor={setCurrentColor}/>
      </div>
      <div className='right-column'>
        <Canvas currentColor={currentColor}/>
      </div>
    </div>
  );
}

export default App;

