import React, { useContext, useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'

const Authentication = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const { setUsername, setToken, token } = useContext(UserContext)

    const handleUser = (e, field) => {
        let text = e.target.value

        setUser(text)
    }

    const handlePassword = (e, field) => {
        let text = e.target.value

        setPassword(text)
    }

    const handleSubmit = () => {
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password
            })
        }).then(response => response.json()).then(result => {
            setUsername(user)
            setToken(result.accessToken)
            setUser("")
            setPassword("")
        }).catch(err => {
            console.log('err', err)
        })
    }


    return (
        <div class="w-screen h-full flex justify-center content-center self-center">
            <div class="flex flex-col justify-center items-center items-stretch border-gray-100 border-2 p-8 w-1/4 h-auto gap-4 self-center shadow">
                <h4 class="font-bold font-mono text-xl text-green-400 self-center">Login</h4>
                <input name="username" value={user} onChange={(e) => handleUser(e)} type="text" placeholder="Username" class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                <input name="password" type="password" value={password} onChange={(e) => handlePassword(e)} placeholder="Password" class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                <button onClick={() => handleSubmit()} class="bg-blue-300 hover:bg-blue-400 p-1 shadow font-bold font-mono text-xl text-white" type="button">Enter</button>
            </div>
        </div>
    )
}

export default Authentication