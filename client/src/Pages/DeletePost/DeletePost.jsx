import { UserContext } from '@/context/userContext';
import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const { currentUser } = useContext(UserContext);
const token = currentUser?.token;

useEffect(() => {
    if (!token) {
        navigate('/login')
    }
}, [])

const DeletePost = () => {
  return (
    <Link className='text-red-500 uppercase font-bold'>Delete Post</Link>
  )
}

export default DeletePost