import React from "react";
import styles from './pluginPanel.module.css'

function PluginPanel() {
    return (
        <div>
            <header className={styles.pluginPanelHeader}>Plugins</header>
            <p>Hello, this is just a test to see if the resizing effect of the css styles is working</p>
        </div>
    )
}

export default PluginPanel