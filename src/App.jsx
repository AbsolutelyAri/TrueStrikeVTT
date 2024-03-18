import {useRef, useState} from 'react';
import Canvas from './game/Canvas';
import './index.css'
import Tilemap from './game/Tilemap'
import TileSelection from './game/TileSelection';
import FileUpload from './game/FileUpload';


function App() {
  const [currentColor, setCurrentColor] = useState('red')
  const [selectionDivLoc, setSelectionDivLoc] = useState({x: 0, y: 0})

  return (
    <div className='rootElem'>
      <div className='left-column'>
        <Tilemap onSelectColor={setCurrentColor} onSelectLoc={setSelectionDivLoc} />
      </div>
      <div className='right-column'>
        <Canvas currentColor={currentColor}/>
      </div>
    </div>
  );
}

export default App;

