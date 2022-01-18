import React, {useContext} from 'react'
import { Navigate, Route } from 'react-router-dom'
import { UserContext } from '../UserContext'

const LoginRedirect = ({ children }) => {
    const { token } = useContext(UserContext)
    
    return token == ""
        ? children 
        : <Navigate to="/editor" replace /> 
}

export default LoginRedirect