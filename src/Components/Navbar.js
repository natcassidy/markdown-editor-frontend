import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({save, deleteDocument, id, loadDocuments, setToggleHiddenUser, setToggleHiddenCommands}) => {
    let { setToken } = useContext(UserContext)
    const { username } = useContext(UserContext)


    const logout = () => {
        setToken("")
    }

    const selected = "flex items-center px-8 py-2 bg-green-200 border-r-4 border-green-400 w-full"
    const deselected = "flex items-center px-8 py-2 w-full hover:bg-gray-300"

    return (
        <div className="bg-gray-200 flex w-2/6 h-full flex-col justify-start items-center">
            <button className="h-16 w-full" onClick={() => setToggleHiddenUser(true)} >
                <div className="flex items-center p-4 m-2 bg-gray-300 rounded-md">
                    <FontAwesomeIcon icon="user-circle" color="#374151" size="lg" />
                    <div className="pl-4">{username}</div>
                </div>
            </button>
            <button onClick={() => setToggleHiddenCommands(true)} className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full">
                    <FontAwesomeIcon icon="edit" color="#374151"/>
                    <div className="pl-4">Edit Commands</div>
            </button>
            <Link className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full" to={`/editor`} >
                <FontAwesomeIcon icon="plus" color="#374151"/>
                <div className="pl-4">New</div>
            </Link>
            <button type="button" onClick={() => deleteDocument()} className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full">
                <FontAwesomeIcon icon="trash" color="#374151" />
                <div className="pl-4">Delete</div>
            </button>
            <button type="button" onClick={() => save()} className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full">
                <FontAwesomeIcon icon="save" color="#374151"/>
                <div className="pl-4">Save</div>
            </button>
            <button type="button" onClick={() => logout()} className="h-8 flex items-center pl-8 hover:bg-gray-300 w-full">
                <FontAwesomeIcon icon="sign-out-alt" color="#374151"/>
                <div className="pl-4">Log Out</div>
            </button>
            <div className="h-8 border-b border-gray-600" />
            <div className="h-4" />
            <ul className="overflow-y-scroll list-none flex-col w-11/12 h-3/6">
                {loadDocuments.length > 0 && loadDocuments.map(item => {
                    return (
                        <li key={item.documentID}>
                            <Link className="" to={`/editor/${item.documentid}`} >
                                <button className={id == item.documentid ? selected : deselected}>
                                    <FontAwesomeIcon icon="file" color="#374151"/>
                                    <p className="pl-4 truncate">{item.title}</p>
                                </button>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Navbar