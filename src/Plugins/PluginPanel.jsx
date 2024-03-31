import React from 'react';
import styles from './pluginPanel.module.css';
import { usePlugins } from './PluginProvider';


const PluginPanel = ({pluginName}) => {
    const {plugins, togglePlugin} = usePlugins()
    const plugin = plugins.find(p => p.name === pluginName)

    return (
        <div className={styles.container}>
            <h4>{pluginName}</h4>
            <label className={styles.switch}>
                <input type="checkbox" checked={plugin?.enabled} onChange={()=> togglePlugin(plugin.name)}/>
                <span className={styles.slider}/>
            </label>
        </div>
    );
};

export default PluginPanel;