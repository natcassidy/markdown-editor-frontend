import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({save, newDocument}) => {
    return (
        <div className="bg-gray-500 h-16 w-screen flex justify-start items-center">
            <Link className="flex h-8 ml-8 items-center bg-gray-600 hover:bg-gray-700 rounded-l-full pl-2 pr-4" to={`/editor`} >
                <img src="https://img.icons8.com/material-outlined/24/000000/add.png"/>
                <div className="pb-0.5 text-bold pl-1 font-mono text-lg text-gray-300">New</div>
            </Link>
            <button type="button" onClick={() => save()} className="flex h-8 ml-1 items-center bg-gray-600 hover:bg-gray-700 rounded-r-full pr-2 pl-2">
                <img src="https://img.icons8.com/material-outlined/24/000000/save.png"/>
                <div className="pb-0.5 text-bold pl-1 font-mono text-lg text-gray-300">Save</div>
            </button>
        </div>
    )
}

export default Navbar