import React, { useState } from 'react';
import { usePlugins } from './PluginProvider';
import Draggable from 'react-draggable';
import './DicePlugin.css'; // Import the CSS file
import ReactSlider from 'react-slider';
import './TextBox.css';
function DicePlugin() {
  const { plugins } = usePlugins();
  const dicePlugin = plugins.find(plugin => plugin.name === "DicePlugin");
  const [rollResult, setRollResult] = useState('');
  const [rollCount, setRollCount] = useState(1); // New state for the number of rolls
  const [bias, setBias] = useState(1); // New state for the bias
  const values = [6, 8, 10, 12, 20];
  
  const [diceSides, setDiceSides] = useState(6);
  let rolls = [];
  const diceRoll = (diceType) => {
    let result = '';
    
    for (let i = 0; i < rollCount; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rolls.push(roll);
    }
    result = rolls;
    if (bias === 2){
      result += " Max " + Math.max(...rolls);
    }
    else if (bias === 0){
      result += " Min " + Math.min(...rolls);
    }
    else {
      result += " Total " + rolls.reduce((a, b) => a + b, 0);
    }
   

    setRollResult(result);
  };

  return dicePlugin && dicePlugin.enabled ? (
    <Draggable>
      <div className='Dice-Plugin'>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <p>Dice Roller</p>
        <ReactSlider
          className="horizontal-slider"
          marks
          markClassName="example-mark"
          min={0}
          max={values.length - 1}
          thumbClassName="example-thumb"
          trackClassName="example-track"
          renderThumb={(props, state) => <div {...props}>{values[state.valueNow]}</div>}
          onChange={value => setDiceSides(values[value])}
          valueToPerc={(value) => (value / (values.length - 1)) * 100}
          percToValue={(perc) => Math.round((perc / 100) * (values.length - 1))}
            />
          <p>Sides</p>       


<ReactSlider
  className="horizontal-slider"
  marks
  markClassName="example-mark"
  min={0}
  max={2}
  thumbClassName="example-thumb"
  trackClassName="example-track"
  defaultValue={1}
  renderThumb={(props, state) => {
    let displayValue;
    switch(state.valueNow) {
      case 0:
        displayValue = '-';
        break;
      case 1:
        displayValue = '';
        break;
      case 2:
        displayValue = '+';
        break;
      default:
        displayValue = '';
    }
    return <div {...props}>{displayValue}</div>
    
  }}
  onChange={bias => setBias(bias)}
  
  />
  <p>- +</p>

  <input 
  type="text"
  className="TextBox" 
  min="1" 
  value={rollCount} 
  onChange={event => setRollCount(Number(event.target.value))} 
/>
<p style={{ marginTop: '-10px' }}>Number of Rolls</p>

</div>
<div style={{ display: 'flex', justifyContent: 'center' }}>
  <button onClick={() => diceRoll(diceSides)}>Roll</button>
</div>
    {rollResult && <p>{rollResult}</p>}
      </div>
    </Draggable>
  ) : null;
}


export default DicePlugin;



//D10 D12 D20