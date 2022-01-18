import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({save, deleteDocument, id}) => {
    let { setToken } = useContext(UserContext)
    const [loadDocuments, setLoadDocuments] = useState([])
    const { token, username } = useContext(UserContext)


    useEffect(() => {   
        fetch('http://localhost:3001/documents', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('data ', data)
            setLoadDocuments(data)
        }).catch(err => {
            console.log('error caught ', err)
        })
    }, [])

    const logout = () => {
        setToken("")
    }

    const selected = "flex items-center px-8 py-2 bg-green-200 border-r-4 border-green-400 w-full"
    const deselected = "flex items-center px-8 py-2 w-full hover:bg-gray-300"

    return (
        <div className="bg-gray-200 w-2/6 h-full flex-col justify-start items-center">
            <Link className="h-16 w-full" to={`/editor`} >
                <div className="flex items-center p-4 m-2 bg-gray-300 rounded-md">
                    <FontAwesomeIcon icon="user-circle" color="#374151" size="lg" />
                    <div className="pl-4">{username}</div>
                </div>
            </Link>
            <Link className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full" to={`/editor`} >
                <FontAwesomeIcon icon="plus" color="#374151" size="md" />
                <div className="pl-4">New</div>
            </Link>
            <button type="button" onClick={() => deleteDocument()} className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full">
                <FontAwesomeIcon icon="trash" color="#374151" size="md" />
                <div className="pl-4">Delete</div>
            </button>
            <button type="button" onClick={() => save()} className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full">
                <FontAwesomeIcon icon="save" color="#374151" size="md" />
                <div className="pl-4">Save</div>
            </button>
            <button type="button" onClick={() => logout()} className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full">
                <FontAwesomeIcon icon="sign-out-alt" color="#374151" size="md" />
                <div className="pl-4">Log Out</div>
            </button>
            <div className="h-8 border-b border-gray-600" />
            <div className="h-4" />
            {loadDocuments.length > 0 && loadDocuments.map(item => {
                return (
                    <Link key={item.documentID} className="" to={`/editor/${item.documentID}`} >
                        <button className={id == item.documentID ? selected : deselected}>
                            <FontAwesomeIcon icon="file" color="#374151" size="md" />
                            <p className="pl-4 truncate">{item.title}</p>
                        </button>
                    </Link>
                )
            })}
        </div>
    )
}

export default Navbar