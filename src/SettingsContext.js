import React, { useEffect, useState, useContext } from 'react'
import { UserContext  } from './UserContext'

const SettingsContext = React.createContext()

const SettingsContextProvider = (props) => {
    const [xlarge, setXlarge] = useState("###")
    const [large, setLarge] = useState("##")
    const [medium, setMedium] = useState("#")
    const [blockquote, setBlockquote] = useState(">")
    const [bold, setBold] = useState("\\*\\*")
    const [italic, setItalic] = useState("\\*")
    const { token } = useContext(UserContext)

    useEffect(() => {
        if(token !== "") {
            fetch('http://localhost:3001/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    xlargeSize: xlarge,
                    largeSize: large,
                    medium,
                    blockquote,
                    bold,
                    italic
                })
            })
            .then(response => response.json()).then(data => {
                console.log('data from settings: ', data)
            }).catch(err => {
                console.log('error caught ', err)
            })
        }
    }, [xlarge, large, medium, blockquote, bold, italic])

    const changeSettings = (settingName, update) => {
        if(settingName === "xlarge") {
            setXlarge(update.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        } else if(settingName === "large") {
            setLarge(update.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        } else if(settingName === "medium") {
            setMedium(update.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        } else if(settingName === "blockquote") {
            setBlockquote(update.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        } else if(settingName === "bold") {
            setBold(update.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        } else if(settingName === "italic") {
            setItalic(update.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        }
    }

    let settingsRegex = {
        xlarge: new RegExp(`^${xlarge} (.*$)`, 'gim'),
        large: new RegExp(`^${large} (.*$)`, 'gim'),
        medium: new RegExp(`^${medium} (.*$)`, 'gim'),
        blockquote: new RegExp(`^${blockquote} (.*$)`, 'gim'),
        bold: new RegExp(`${bold}(.*)${bold}`, 'gim'),
        italic: new RegExp(`${italic}(.*)${italic}`, 'gim'),
    }

    return (
        <SettingsContext.Provider value={{settingsRegex, changeSettings, xlarge, setXlarge, large, setLarge, medium, setMedium, blockquote, setBlockquote, bold, setBold, italic, setItalic}}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export { SettingsContext, SettingsContextProvider}