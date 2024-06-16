import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '@/context/userContext'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const {setCurrentUser} = useContext(UserContext)
    const navigate = useNavigate();

    setCurrentUser(null)
    localStorage.removeItem('token')
    navigate('/login')
    return (
        <div>Logout</div>
    )
}

export default Logout