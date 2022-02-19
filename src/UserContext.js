import React, { useState, useEffect } from 'react'

const UserContext = React.createContext()

const UserContextProvider = (props) => {
    const [username, setUsername] = useState("")
    const [token, setToken] = useState("")
    const [expireTime, setExpireTime] = useState("")
    
    useEffect(() => {
        if (expireTime !== "" && expireTime !== undefined) {
            let expireTimeDigit = expireTime.match(/\d+/)[0]
            let expireTimeUnit = expireTime.match(/\D/)[0]
            let expireTimeTotal
            switch (expireTimeUnit) {
                case 's':
                    expireTimeTotal = expireTimeDigit * 1000
                    break;
                case 'm':
                    expireTimeTotal = expireTimeDigit * 60000
                    break;
                case 'h':
                    expireTimeTotal = expireTimeDigit * 1440000
                    break;
                default:
                    break;
            }
            console.log('UseEffect: Expiretimetotal: ', expireTimeTotal)
            setTimeout(handleRefreshToken, expireTimeTotal)
        }
    }, [token])

    const handleRefreshToken = () => {
        fetch("https://ultimate-markdown-auth-h.herokuapp.com/refresh", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem("refresh_token")
            })
        }).then(response => response.json()).then(result => {
            setExpireTime(result.expireTime)
            setToken(result.accessToken)
            console.log('Handle Refresh: Result: ', result)
            console.log('Handle Resfresh: Token: ', token)
            console.log('Handle Resfresh: Expire Time: ', expireTime)
        }).catch(err => {
            console.log('err', err)
        })
    }

    return (
        <UserContext.Provider value={{username, setUsername, token, setToken, setExpireTime}}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }