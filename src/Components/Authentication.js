import React, { useContext } from 'react'
import { useState } from 'react/cjs/react.development'
import { UserContext } from '../UserContext'
import CreateUser from './CreateUser'

const Authentication = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [toggleHiddenUser, setToggleHiddenUser] = useState(false)

    const { setUsername, setToken, setExpireTime } = useContext(UserContext)

    const handleUser = (e) => {
        let text = e.target.value

        setUser(text)
    }

    const handlePassword = (e) => {
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
            setExpireTime(result.expireTime)
            setToken(result.accessToken)
            setUser("")
            setPassword("")
            localStorage.setItem("refresh_token", result.refreshToken)
        }).catch(err => {
            console.log('err', err)
        })
    }


    return (
        <>
            <CreateUser toggleHiddenUser={toggleHiddenUser} setToggleHiddenUser={setToggleHiddenUser}/>
            <div className="w-screen h-full flex justify-center content-center self-center bg-gray-200">
                <div className="flex flex-col justify-center items-center items-stretch bg-gray-300 rounded-md p-8 w-1/4 h-auto gap-4 self-center shadow">
                    <h4 className="font-bold text-xl text-black self-center">Please Login</h4>
                    <input name="username" value={user} onChange={(e) => handleUser(e)} type="text" placeholder="Username" className="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                    <input name="password" type="password" value={password} onChange={(e) => handlePassword(e)} placeholder="Password" className="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                    <button onClick={() => handleSubmit()} className="bg-green-200 hover:bg-green-400 p-1 shadow font-bold text-xl text-black rounded-md" type="button">Login</button>
                    <button onClick={() => setToggleHiddenUser(true)} className="bg-green-200 hover:bg-green-400 p-1 shadow font-bold text-xl text-black rounded-md" type="button">Create Account</button>
                </div>
            </div>
        </>
        
    )
}

export default Authentication