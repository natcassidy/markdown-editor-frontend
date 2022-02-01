import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../UserContext'

const PrivateRoute = ({ children }) => {
    const { token } = useContext(UserContext)
    
    return token === ""
        ? <Navigate to="/" replace /> 
        : children 
}

export default PrivateRoute