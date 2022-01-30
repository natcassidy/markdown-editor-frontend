import React, {useState, useEffect, useContext} from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import Editor from './Editor'
import Output from './Output'
import Navbar from './Navbar'
import UserSettings from './UserSettings'
import { UserContext } from '../UserContext'
import { SettingsContext } from '../SettingsContext'

const FullEditor = () => {
    const [title, setTitle] = useState("")
    const [markdown, setMarkdown] = useState("")
    const [updatedMarkdown, setUpdatedMarkdown] = useState("")
    const [loadDocuments, setLoadDocuments] = useState([])
    const [toggleHiddenUser, setToggleHiddenUser] = useState(false)

    let { id } = useParams()
    let navigate = useNavigate()
    // const [newDoc, setNewDoc] = useState(true)

    const { token } = useContext(UserContext)
    const { settingsRegex: { xlarge, large, medium, blockquote, bold, italic }} = useContext(SettingsContext)
    
    useEffect(() => {
        if ( id != undefined ) {
            fetch(`http://localhost:3001/documents/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => response.json())
            .then(data => {
                setMarkdown(data[0].content)
                setTitle(data[0].title)
                // setNewDoc(false)
            })
            .catch((err) => {
                console.log('error caught ', err)
            })
        } else {
            setTitle("")
            setMarkdown("")
        }
    }, [id])

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
            setLoadDocuments(data)
        }).catch(err => {
            console.log('error caught ', err)
        })
    }, [id])

    useEffect(() => {
        convertMarkdown()
    }, [markdown])

    useEffect(() => {
        convertMarkdown()
    }, [title])


    const updateTitle = (e) => {
        let newTitle = e.target.value

        setTitle(newTitle)
    }

    const handleMarkdown = (e) => {
        let newMarkdown = e.target.value

        setMarkdown(newMarkdown)
    }

    const save = () => {
        console.log('Save button clicked')
        if(id == undefined) {
            //This has not been tested after adding in the authorization header
            fetch('http://localhost:3001/new-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content: markdown
                }),
            })
            .then(response => response.json())
            .then(data => {
                navigate(`/editor/${data.insertId}`)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        } else {
            fetch('http://localhost:3001/documents', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content: markdown,
                    id
                }),
            })
            .then(response => response.json())
            .then(data => {
            })
            .catch((error) => {
                console.error('Error:', error)
            })
        }
    }

    const deleteDocument = () => {
        fetch(`http://localhost:3001/documents/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => response.json())
            .then(data => {
                navigate(`/editor`)
            })
            .catch((error) => {
                console.error('Error:', error)
            })
    }

    const convertMarkdown = () => {
        let text = markdown
        let convertedText = text
        .replace(xlarge, '<h3 class="text-gray-300 font-mono text-md">$1</h3>')
        .replace(large, '<h2 class="text-gray-300 font-mono text-lg">$1</h2>')
        .replace(medium, '<h1 class="text-gray-300 font-mono text-2xl">$1</h1>')
        .replace(blockquote, '<blockquote class="p-2 bg-gray-500 text-gray-300 font-mono text-md">$1</blockquote>')
        .replace(bold, '<p class="font-extrabold">$1</p>')
        .replace(italic, '<p class="italic">$1</p>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n$/gim, '<br />')

        convertedText.trim()
        setUpdatedMarkdown(convertedText)
    }

    return (
        <>
            <div className="h-full w-full flex">
                <UserSettings toggleHiddenUser={toggleHiddenUser} setToggleHiddenUser={setToggleHiddenUser}/>
                <Navbar save={save} setToggleHiddenUser={setToggleHiddenUser} markdown={markdown} deleteDocument={deleteDocument} id={id} loadDocuments={loadDocuments}/>
                <Editor title={title} updateTitle={updateTitle} handleMarkdown={handleMarkdown} markdown={markdown}/>
                <Output markdown={markdown} updatedMarkdown={updatedMarkdown} />
            </div>
        </>
    )
}

export default FullEditor