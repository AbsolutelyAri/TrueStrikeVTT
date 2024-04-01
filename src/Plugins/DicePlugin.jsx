import React, { useState } from 'react';
import { usePlugins } from './PluginProvider';
import Draggable from 'react-draggable';
import styles from './dicePlugin.module.css';

function DicePlugin() {
    const { plugins } = usePlugins();
    const dicePlugin = plugins.find(plugin => plugin.name === "DicePlugin");

    const [rollResult, setRollResult] = useState(null);

    const diceRoll = () => {
        const diceType = 6;
        const roll = Math.floor(Math.random() * diceType) + 1;
        setRollResult(`You rolled a ${roll} on a d${diceType}`);
    };

    return dicePlugin && dicePlugin.enabled ? (
        <Draggable>
            <div className={styles.box}>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={diceRoll}>Roll Dice</button>
                    {rollResult && <p className={styles.canvasP}>{rollResult}</p>}
                </div>
            </div>
        </Draggable>
    ) : null;
}

export default DicePlugin;