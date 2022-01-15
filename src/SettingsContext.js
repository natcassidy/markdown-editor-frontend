import React from 'react'

const SettingsContext = React.createContext()

const SettingsContextProvider = (props) => {
    const stringTest = "###"
    let settingSelection = {
        xlarge: `###`,
        large: "##",
        medium: "3",
        blockquote: ">",
        bold: "\\*\\*",
        italic: "\\*",
    }


    let settingsRegex = {
        xlarge: new RegExp(`^${settingSelection.xlarge} (.*$)`, 'gim'),
        large: new RegExp(`^${settingSelection.large} (.*$)`, 'gim'),
        medium: new RegExp(`^${settingSelection.medium} (.*$)`, 'gim'),
        blockquote: new RegExp(`^${settingSelection.blockquote} (.*$)`, 'gim'),
        bold: new RegExp(`${settingSelection.bold}(.*)${settingSelection.bold}`, 'gim'),
        italic: new RegExp(`${settingSelection.italics}(.*)${settingSelection.italics}`, 'gim'),
    }

    return (
        <SettingsContext.Provider value={{settingsRegex}}>
            {props.children}
        </SettingsContext.Provider>
    )
}

export { SettingsContext, SettingsContextProvider}