import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SettingsContext } from "../SettingsContext"

const Commands = ({toggleHiddenCommands, setToggleHiddenCommands}) => {
    const { xlarge, setXlarge, large, setLarge, medium, setMedium, blockquote, setBlockquote, bold, setBold, italic, setItalic } = useContext(SettingsContext)
    const [tempXlarge, setTempXlarge] = useState("")
    const [tempLarge, setTempLarge] = useState("")
    const [tempMedium, setTempMedium] = useState("")
    const [tempBlockquote, setTempBlockquote] = useState("")
    const [tempBold, setTempBold] = useState("")
    const [tempItalic, setTempItalic] = useState("")

    const hidden = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full top-0 left-0 flex items-center justify-center hidden"
    const notHidden = "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-screen w-full top-0 left-0 flex items-center justify-center"

    const handleInput = (e, type) => {
        let text = e.target.value

        switch(type){
            case xlarge:
                setTempXlarge(text)
                break
            case large: 
                setTempLarge(text)
                break
            case medium: 
                setTempMedium(text)
                break
            case blockquote: 
                setTempBlockquote(text)
                break
            case bold: 
                setTempBold(text)
                break
            case italic: 
                setTempItalic(text)
                break
        }
    }

    const handleSubmit = () => {
        if(tempXlarge != ""){
            setXlarge(tempXlarge)
            setTempXlarge("")
        }

        if(tempLarge != ""){
            setLarge(tempLarge)
            setTempLarge("")
        }

        if(tempMedium != ""){
            setMedium(tempMedium)
            setTempMedium("")
        }

        if(tempBlockquote != ""){
            setBlockquote(tempBlockquote)
            setTempBlockquote("")
        }

        if(tempBold != ""){
            setBold(tempBold)
            setTempBold("")
        }

        if(tempItalic != ""){
            setItalic(tempItalic)
            setTempItalic("")
        }
        setToggleHiddenCommands(false)
    }

    return (
        <div className={toggleHiddenCommands ? notHidden : hidden}>
            <div className="relative flex flex-col p-4 bg-gray-200 h-auto w-4/10 shadow-lg rounded-md">
                <button onClick={() => setToggleHiddenCommands(false)} className="self-end">
                    <FontAwesomeIcon icon="times" color="#374151" size="lg"  />
                </button>

                <h2 className="mb-2 font-semibold text-lg justify-between">Update Commands</h2>
                <div className="flex">
                    <div className="mr-4">
                        <h3 className="my-2 text-2xl">Extra Large Font </h3>
                        <input name="xlarge" type="text" value={tempXlarge} onChange={(e) => handleInput(e, xlarge)} placeholder={xlarge} class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                        
                        <h3 className="my-1 text-lg">Large Font </h3>
                        <input name="large" type="text" value={tempLarge} onChange={(e) => handleInput(e, large)} placeholder={large} class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                        
                        <h3 className="my-1 text-md">Medium Font </h3>
                        <input name="medium" type="text" value={tempMedium} onChange={(e) => handleInput(e, medium)} placeholder={medium} class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                        
                    </div>

                    <div className="border-l-2 border-gray-300 pl-4">
                        <h3 className="mb-2 p-2 bg-gray-500 text-gray-300 text-md">Blockquote </h3>
                        <input name="blockquote" type="text" value={tempBlockquote} onChange={(e) => handleInput(e, blockquote)} placeholder={blockquote} class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                        
                        <h3 className="mt-2 mb-1 font-extrabold">Bold </h3>
                        <input name="bold" type="text" value={tempBold} onChange={(e) => handleInput(e, bold)} placeholder={bold} class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input>
                        
                        <h3 className="my-1 mb-1 italic">Italic </h3>
                        <input name="italic" type="text" value={tempItalic} onChange={(e) => handleInput(e, italic)} placeholder={italic} class="p-1 shadow focus:ring-2 focus:ring-gray-400 focus:outline-none focus:border-transparent rounded"></input> 
                    </div>
                </div>
                
                
                
                
                
                <button onClick={() => handleSubmit()} class="bg-green-200 hover:bg-green-400 p-1 mt-4 mb-2 shadow font-bold text-xl text-black rounded-md" type="button">Update Settings</button>
            </div>
        </div>
    )
}

export default Commands