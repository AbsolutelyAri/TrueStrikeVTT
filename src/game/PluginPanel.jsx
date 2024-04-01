import React from 'react';
import styles from './pluginPanel.module.css';

const PluginPanel = ({PluginName = "NULL"}) => {
    return (
        <div className={styles.container}>
            <h4>{PluginName}</h4>
            <label className={styles.switch}>
                <input type="checkbox"/>
                <span className={styles.slider}/>
            </label>
        </div>
    );
};

export default PluginPanel;