import React from 'react'

const Editor = ({markdown, handleMarkdown, title, updateTitle}) => {
    return (
        <div className="h-full w-1/2 bg-gray-500">
            <div className="h-full w-full bg-gray-600">
                <div className="h-full w-full flex flex-col divide-y-2 divide-gray-500 bg-gray-600 py-4 px-8">
                    <input value={title} onChange={(e) => updateTitle(e)} type="text" placeholder="Title" className="outline-none font-bold text-4xl p-4 bg-gray-600 text-gray-300 placeholder-gray-300"/>
                    <textarea value={markdown} onChange={(e) => handleMarkdown(e)} className="w-full h-full p-4 outline-none bg-gray-600 text-gray-300 placeholder-gray-300" placeholder="Notes here"></textarea>
                </div>
            </div>
        </div>
    )
}

export default Editor