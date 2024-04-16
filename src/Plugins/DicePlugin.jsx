import React, { useState } from 'react';
import { usePlugins } from './PluginProvider';
import Draggable from 'react-draggable';
import './DicePlugin.css'; // Import the CSS file

function DicePlugin() {
  const { plugins } = usePlugins();
  const dicePlugin = plugins.find(plugin => plugin.name === "DicePlugin");
  const [rollResult, setRollResult] = useState(null);
  const [rollCount, setRollCount] = useState(1); // New state for the number of rolls

  const diceRoll = (diceType) => {
    let result = '';
    for (let i = 0; i < rollCount; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      result += `You rolled a ${roll} `;
    }
    setRollResult(result);
  };

  return dicePlugin && dicePlugin.enabled ? (
    <Draggable>
      <div className='Dice-Plugin'>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <button onClick={() => diceRoll(6)}>Roll D6</button>
          <input 
            type="number" 
            placeholder="Enter dice roll" 
            style={{marginLeft: '10px'}} 
            onChange={e => setRollCount(e.target.value)} 
          />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <button onClick={() => diceRoll(8)}>Roll D8</button>
          <input 
            type="number" 
            placeholder="Enter dice roll" 
            style={{marginLeft: '10px'}} 
            onChange={e => setRollCount(e.target.value)} 
          />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <button onClick={() => diceRoll(10)}>Roll D10</button>
          <input 
            type="number" 
            placeholder="Enter dice roll" 
            style={{marginLeft: '10px'}} 
            onChange={e => setRollCount(e.target.value)} 
          />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <button onClick={() => diceRoll(12)}>Roll D12</button>
          <input 
            type="number" 
            placeholder="Enter dice roll" 
            style={{marginLeft: '10px'}} 
            onChange={e => setRollCount(e.target.value)} 
          />
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <button onClick={() => diceRoll(20)}>Roll D20</button>
          <input 
            type="number" 
            placeholder="Enter dice roll" 
            style={{marginLeft: '10px'}} 
            onChange={e => setRollCount(e.target.value)} 
          />
        </div>
        {rollResult && <p>{rollResult}</p>}
      </div>
    </Draggable>
  ) : null;
}

export default DicePlugin;



//D10 D12 D20