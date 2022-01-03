import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Documents = () => {
    const [loadDocuments, setLoadDocuments] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/documents', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log('data ', data)
            setLoadDocuments(data)
        })
    }, []);

    return (
        <div>
            <nav className="bg-gray-200 w-full h-16 drop-shadow flex items-center">
        <h2 className="text-green-500 font-mono font-bold text-3xl ml-16 ">Markdown Editor</h2>
        </nav>
        <div className="h-full w-full flex p-16 gap-8 flex-wrap" id="display-board">
            {loadDocuments.length > 0 && loadDocuments.map(item => {
                return (
                    <Link to={`/editor/${item.documentID}`} className="border-2 rounded-md border-gray-200 h-56 sm:w-1/4 md:w-1/6 hover:border-gray-400 hover:shadow-md overflow-hidden overflow-ellipsis">
                        <div key={item.documentID} >
                            <p className="text-xs p-2 text-gray-400 hover:text-gray-500">{item.content}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
        </div>
    )
}

export default Documents