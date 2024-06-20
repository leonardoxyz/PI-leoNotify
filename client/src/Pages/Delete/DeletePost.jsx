import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/userContext';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);


  const notify = () => {
    toast.success('Post deleted successfully');
  };


  const removePost = async () => {
    try {
      const res = await axios.delete(`http://localhost:5510/api/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
          notify();
        } else {
          navigate('/');
          notify();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button onClick={() => removePost()}>Delete Post</Button>
    </>
  );
};

export default DeletePost;