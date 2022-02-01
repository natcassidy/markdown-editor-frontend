import React from 'react'

const Output = ({updatedMarkdown}) => {

    return (
        <div className="h-full w-1/2 bg-gray-500 pl-0.5">
            <div className="h-full w-full bg-gray-600">
                <div className="h-full w-full py-4 px-8 bg-gray-600">
                    <div className="w-full h-full overflow-auto p-4 outline-none inside text-gray-300 font-sm"
                    dangerouslySetInnerHTML={{__html: updatedMarkdown}}>
                    {console.log('output called, here is the markdown', updatedMarkdown)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Output