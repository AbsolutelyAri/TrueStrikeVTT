import React, { useState } from 'react';
import { usePlugins } from './PluginProvider';
import Draggable from 'react-draggable';
function DicePlugin() {
    const { plugins } = usePlugins();
    const dicePlugin = plugins.find(plugin => plugin.name === "DicePlugin");
    const [rollResult, setRollResult] = useState(null);
    const diceRoll = () => {
      const diceType = 6;
      const roll = Math.floor(Math.random() * diceType) + 1;
      setRollResult(`You rolled a ${roll}`);
    };


    return dicePlugin && dicePlugin.enabled ? (
      <Draggable>
        <div>
                <button onClick={diceRoll}>Roll Dice</button>
                {rollResult && <p>{rollResult}</p>}
        </div>
      </Draggable>
    ) : null;
}

export default DicePlugin;