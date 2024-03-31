import React, {useContext, useState, createContext} from "react";

const PluginContext = createContext();

export const usePlugins = () => useContext(PluginContext)

export const PluginProvider = ({children}) => {
    const [plugins, setPlugins] = useState([
       {name: "GridColor", enabled: false, config: {color: '#FF0000'}},
       {name: "DicePlugin", enabled: false},
    ])

    const togglePlugin = (pluginName) => {
        setPlugins(plugins.map(plugin => 
            plugin.name === pluginName ? {...plugin, enabled: !plugin.enabled } : plugin
        ))
    }
    return (
        <PluginContext.Provider value={{plugins, togglePlugin}}>
            {children}
        </PluginContext.Provider>
    )
}