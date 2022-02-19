import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserSettings = ({toggleHiddenUser, setToggleHiddenUser}) => {
    const { token } = useContext(UserContext)
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const hidden = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full top-0 left-0 flex items-center justify-center hidden"
    const notHidden = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full top-0 left-0 flex items-center justify-center"

    const handlePassword = (e, count) => {
        let text = e.target.value

        if(count === 1) {
            setPassword1(text)
        } else {
            setPassword2(text)
        }
        
    }
    
    const handleSubmit = () => {
        if(password1 !== password2) {
            alert("Please ensure both password inputs are the same!")
        } else {
            fetch("https://ultimate-markdown-auth-h.herokuapp.com/update-password", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    password: password1
                })
            }).then(data => {
                console.log('response: ', data)
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
                <h3 className="my-1">Change Password: </h3>
                <input name="password" type="password" value={password1} onChange={(e) => handlePassword(e, 1)} placeholder="Password" className="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                <h3 className="my-1">Re-enter Password: </h3>
                <input name="password" type="password" value={password2} onChange={(e) => handlePassword(e, 2)} placeholder="Password" className="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                
                <button onClick={() => handleSubmit()} className="bg-green-200 hover:bg-green-400 p-1 mt-4 mb-2 shadow font-bold text-xl text-black rounded-md" type="button">Update Information</button>
            </div>
        </div>
    )
}

export default UserSettings