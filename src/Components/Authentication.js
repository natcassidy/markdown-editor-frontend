import React from 'react'
import { useState } from 'react/cjs/react.development'

const Authentication = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState()
    const [token, setToken] = useState()

    const handleUsername = (e, field) => {
        let text = e.target.value

        setUsername(text)
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
                username,
                password
            })
        }).then(result => {
            setUser(result.json())
            setUsername("")
            setPassword("")
        }).catch(err => {
            console.log('err', err)
        })
    }


    return (
        <div>
            <div class="flex bg-blue-300 h-16 justify-end items-center">
                <button class="bg-gray-500 hover:bg-gray-600 py-2 px-4 font-bold font-mono text-xl text-white rounded-md shadow-inner" type="button">Login</button>
                <div>
                    <h4 class="font-bold font-mono text-xl text-white hover:text-green-400 mr-8 ml-4">Test</h4>
                </div>
            </div>
            <div class="w-screen h-full flex justify-center content-center self-center">
                <div class="flex flex-col justify-center items-center items-stretch border-gray-100 border-2 p-8 w-1/4 h-auto gap-4 self-center shadow">
                    <h4 class="font-bold font-mono text-xl text-green-400 self-center">Login</h4>
                    <input name="username" value={username} onChange={(e) => handleUsername(e)} type="text" placeholder="Username" class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                    <input name="username" value={password} onChange={(e) => handlePassword(e)} type="text" placeholder="Password" class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                    <button onClick={() => handleSubmit()} class="bg-blue-300 hover:bg-blue-400 p-1 shadow font-bold font-mono text-xl text-white" type="button">Enter</button>
                </div>
            </div>
        </div>
    )
}

export default Authentication