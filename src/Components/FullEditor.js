import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Editor from './Editor'
import Output from './Output'
import Navbar from './Navbar'
import UserSettings from './UserSettings'
import Commands from './Commands'
import { UserContext } from '../UserContext'
import { SettingsContext } from '../SettingsContext'

const FullEditor = () => {
    const [title, setTitle] = useState("")
    const [markdown, setMarkdown] = useState("")
    const [updatedMarkdown, setUpdatedMarkdown] = useState("")
    const [loadDocuments, setLoadDocuments] = useState([])
    const [toggleHiddenUser, setToggleHiddenUser] = useState(false)
    const [toggleHiddenCommands, setToggleHiddenCommands] = useState(false)

    let { id } = useParams()
    let navigate = useNavigate()
    // const [newDoc, setNewDoc] = useState(true)

    const { token } = useContext(UserContext)
    const { settingsRegex: {xlarge, large, medium, blockquote, bold, italic}, changeSettings, setSettingsLoaded } = useContext(SettingsContext)
    
    useEffect(() => {
        if ( id !== undefined ) {
            fetch(`https://ultimate-markdown-server-h.herokuapp.com/documents/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log('response from GET /documents/id: ', data)
                setMarkdown(data.content)
                setTitle(data.title)
            })
            .catch((err) => {
                console.log('token: ', token)
                console.log('error caught ', err)
            })
        } else {
            setTitle("")
            setMarkdown("")
        }
    }, [id])

    useEffect(() => {   
        fetch('https://ultimate-markdown-server-h.herokuapp.com/documents', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('response from GET /documents: ', data)
            setLoadDocuments(data)
        }).catch(err => {
            console.log('token: ', token)
            console.log('error caught ', err)
        })
    }, [id])

    useEffect(() => {
        fetch('https://ultimate-markdown-server-h.herokuapp.com/settings', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('response from GET /settings: ', data)
            changeSettings("xlarge", data.xlargesize)
            changeSettings("large", data.largesize)
            changeSettings("medium", data.medium)
            changeSettings("blockquote", data.blockquote)
            changeSettings("bold", data.bold)
            changeSettings("italic", data.italic)
            setSettingsLoaded(true)
        }).catch(err => {
            console.log('token: ', token)
            console.log('error caught ', err)
        })
    }, [])

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
    
    const save = () => {
        console.log('Save button clicked')
        if(id === undefined) {
            fetch('https://ultimate-markdown-server-h.herokuapp.com/new-document', {
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
                console.log('data from new doc: ', data.rows[0])
                navigate(`/editor/${data.rows[0].documentid}`)
            })
            .catch((error) => {
                console.log('token: ', token)
                console.error('Error:', error);
            })
        } else {
            fetch('https://ultimate-markdown-server-h.herokuapp.com/documents', {
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
            .catch((error) => {
                console.log('token: ', token)
                console.error('Error:', error)
            })
        }
    }

    const deleteDocument = () => {
        fetch(`https://ultimate-markdown-server-h.herokuapp.com/documents/${id}`, {
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
                console.log('token: ', token)
                console.error('Error:', error)
            })
    }

    const handleMarkdown = (e) => {
        let newMarkdown = e.target.value

        setMarkdown(newMarkdown)
    }

    const convertMarkdown = () => {
        let text = markdown
        let convertedText = text
            .replace(xlarge, '<h3 class="text-gray-300 text-4xl">$1</h3>')
            .replace(large, '<h2 class="text-gray-300 text-2xl">$1</h2>')
            .replace(medium, '<h1 class="text-gray-300 text-lg">$1</h1>')
            .replace(blockquote, '<blockquote class="p-2 bg-gray-500 text-gray-300 text-md">$1</blockquote>')
            .replace(bold, '<p class="font-extrabold">$1</p>')
            .replace(italic, '<p class="italic">$1</p>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
            .replace(/\n/gim, '<br />')

        convertedText.trim()
        setUpdatedMarkdown(convertedText)
    }

    return (
        <>
            <div className="h-full w-full flex">
                <Commands toggleHiddenCommands={toggleHiddenCommands} setToggleHiddenCommands={setToggleHiddenCommands}/>
                <UserSettings toggleHiddenUser={toggleHiddenUser} setToggleHiddenUser={setToggleHiddenUser}/>
                <Navbar save={save} toggleHiddenCommands={toggleHiddenCommands} setToggleHiddenCommands={setToggleHiddenCommands} setToggleHiddenUser={setToggleHiddenUser} markdown={markdown} deleteDocument={deleteDocument} id={id} loadDocuments={loadDocuments}/>
                <Editor title={title} updateTitle={updateTitle} handleMarkdown={handleMarkdown} markdown={markdown}/>
                <Output markdown={markdown} updatedMarkdown={updatedMarkdown} />
            </div>
        </>
    )
}

export default FullEditor