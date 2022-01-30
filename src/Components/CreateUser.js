import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CreateUser = ({toggleHiddenUser, setToggleHiddenUser}) => {
    const { token } = useContext(UserContext)
    const { setUsername, setToken, setExpireTime } = useContext(UserContext)
    const [user, setUser] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const hidden = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full top-0 left-0 flex items-center justify-center hidden"
    const notHidden = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full top-0 left-0 flex items-center justify-center"

    const handleUser = (e) => {
        let text = e.target.value

        setUser(text)
    }

    const handlePassword = (e, count) => {
        let text = e.target.value

        if(count == 1) {
            setPassword1(text)
        } else {
            setPassword2(text)
        }
    }
    
    const handleSubmit = () => {
        if(password1 !== password2) {
            alert("Please ensure both password inputs are the same!")
        } else {
            fetch("http://localhost:4000/create-user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user,
                    password: password1
                })
            }).then(response => response.json()).then(result => {
                console.log('response: ', result)
                setUsername(user)
                console.log('access token: ', result.accessToken)
                setExpireTime(result.expireTime)
                setToken(result.accessToken)
                localStorage.setItem("refresh_token", result.refreshToken)
                setUser("")
                setPassword1("")
                setPassword2("")
            }).catch(err => console.log('err ', err))
        }
    }

    return (
        <div className={toggleHiddenUser ? notHidden : hidden}>
            <div className="relative flex flex-col p-4 bg-gray-200 h-auto w-1/3 shadow-lg rounded-md">
                <button onClick={() => setToggleHiddenUser(false)} className="self-end">
                    <FontAwesomeIcon icon="times" color="#374151" size="lg"  />
                </button>
                <h2 className="mb-2 font-semibold text-lg">User Information</h2>
                <h3 className="my-1">Username: </h3>
                <input name="username" type="text" value={user} onChange={(e) => handleUser(e)} placeholder="Username" class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                <h3 className="my-1">Password: </h3>
                <input name="password" type="password" value={password1} onChange={(e) => handlePassword(e, 1)} placeholder="Password" class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                <h3 className="my-1">Re-enter Password: </h3>
                <input name="password" type="password" value={password2} onChange={(e) => handlePassword(e, 2)} placeholder="Password" class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                
                <button onClick={() => handleSubmit()} class="bg-green-200 hover:bg-green-400 p-1 mt-4 mb-2 shadow font-bold text-xl text-black rounded-md" type="button">Create New Account</button>
            </div>
        </div>
    )
}

export default CreateUser