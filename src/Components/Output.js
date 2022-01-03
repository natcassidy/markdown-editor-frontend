import React from 'react'

const Output = ({markdown, updatedMarkdown}) => {
    // const stringTest = "<h1>Test</h1>"
    // const applyTag = (input) => {
    //     switch(input.category) {
    //         case "header":
    //             return (
    //                 <div readOnly className="font-bold readOnly text-4xl font-mono text-gray-300">
    //                     {input.text}
    //                 </div>
    //             )
    //             break
    //         case "empty":
    //             return(<br></br>)
    //             break
    //         default:
    //             return (
    //                 <div className="font-mono text-gray-300">
    //                     {input.text}
    //                 </div>
    //             )
    //     }
    // }


    return (
        <div className="h-full w-1/2 bg-gray-500 pl-0.5">
            <div className="h-full w-full bg-gray-600">
                <div className="h-full w-full py-4 px-8 bg-gray-600">
                    <div className="w-full h-full overflow-auto p-4 outline-none inside text-gray-300 font-mono font-sm"
                    dangerouslySetInnerHTML={{__html: updatedMarkdown}}>
                    {/* {updatedMarkdown.length === 0 ? 
                        <p className="font-mono text-gray-300">Output displays here</p> :
                        updatedMarkdown.map(line => {
                            return applyTag(line)
                        })
                    } */}
                    {console.log('output called, here is the markdown', updatedMarkdown)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Output