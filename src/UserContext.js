import React, { useState, useEffect } from 'react'

const UserContext = React.createContext()

const UserContextProvider = (props) => {
    const [username, setUsername] = useState("")
    const [token, setToken] = useState("")

    useEffect(() => {
        console.log('access token update ', token)
    }, [token])

    return (
        <UserContext.Provider value={{username, setUsername, token, setToken}}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }