import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Editor from './Editor'
import Output from './Output'
import Navbar from './Navbar'

const FullEditor = () => {
    const [title, setTitle] = useState("")
    const [markdown, setMarkdown] = useState("")
    const [updatedMarkdown, setUpdatedMarkdown] = useState("")
    const { id } = useParams()
    const [newDoc, setNewDoc] = useState(true)

    const updateTitle = (e) => {
        let newTitle = e.target.value

        setTitle(newTitle)
    }

    const handleMarkdown = (e) => {
        let newMarkdown = e.target.value

        setMarkdown(newMarkdown)
    }

    const newDocument = () => {
        setTitle("")
        setMarkdown("")
    }

    const save = () => {
        if(newDoc === true) {
            fetch('http://localhost:3001/new-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content: markdown,
                    user: "Nathaniel"
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setNewDoc(false)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        } else {
            fetch('http://localhost:3001/documents', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    content: markdown,
                    id
                }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            })
        }
    }

    useEffect(() => {
        fetch(`http://localhost:3001/documents/${id}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log('data ', data)
            setMarkdown(data[0].content)
            setTitle(data[0].title)
            setNewDoc(false)
        })
        .catch((error) => {
            console.error('Error:', error);
        })
    }, [])

    useEffect(() => {
        console.log('markdown use effect: ', markdown)
        convertMarkdown()
    }, [markdown])

    useEffect(() => {
        console.log('title use effect: ', title)
        convertMarkdown()
    }, [title])

    const convertMarkdown = () => {
        let text = markdown
        let convertedText = text
        .replace(/^### (.*$)/gim, '<h3 class="text-gray-300 font-mono text-md">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-gray-300 font-mono text-lg">$1</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-gray-300 font-mono text-2xl">$1</h1>')
        .replace(/^\> (.*$)/gim, '<blockquote class="p-2 bg-gray-500 text-gray-300 font-mono text-md">$1</blockquote>')
        .replace(/\*\*(.*)\*\*/gim, '<p class="font-extrabold">$1</p>')
        .replace(/\*(.*)\*/gim, '<p class="italic">$1</p>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
        .replace(/\n$/gim, '<br />')

        convertedText.trim()
        console.log('here is converted text', convertedText)
        setUpdatedMarkdown(convertedText)
    }

    return (
        <>
            <Navbar save={save} newDoc={newDocument} markdown={markdown}/>
            <div className="h-full w-full flex">
                <Editor title={title} updateTitle={updateTitle} handleMarkdown={handleMarkdown} markdown={markdown}/>
                <Output markdown={markdown} updatedMarkdown={updatedMarkdown} />
            </div>
        </>
    )
}

export default FullEditor