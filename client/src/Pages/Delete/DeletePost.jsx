import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/userContext';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const DeletePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <Button>Delete Post</Button>
    </>
  )
}

export default DeletePost