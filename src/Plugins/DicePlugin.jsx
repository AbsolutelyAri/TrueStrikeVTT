import React, { useState } from 'react';
import { usePlugins } from './PluginProvider';
import Draggable from 'react-draggable';
import './DicePlugin.css'; // Import the CSS file


function DicePlugin() {
  const { plugins } = usePlugins();
  const dicePlugin = plugins.find(plugin => plugin.name === "DicePlugin");
  const [rollResult, setRollResult] = useState(null);
  const diceRoll = (diceType) => {
    
    const roll = Math.floor(Math.random() * diceType) + 1;
    setRollResult(`You rolled a ${roll}`);
  };

  return dicePlugin && dicePlugin.enabled ? (
    <Draggable>
      <div className='Dice-Plugin'>
        <button onClick={() => diceRoll(6)}>Roll D6</button>
        <button onClick={() => diceRoll(8)}>Roll D8</button>
        <button onClick={() => diceRoll(10)}>Roll D10</button>
        <button onClick={() => diceRoll(12)}>Roll D12</button>
        <button onClick={() => diceRoll(20)}>Roll D20</button>
        {rollResult && <p>{rollResult}</p>}
      </div>
    </Draggable>
  ) : null;
}

export default DicePlugin;