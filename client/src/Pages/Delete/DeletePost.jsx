import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/userContext';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
      <AlertDialog>
        <AlertDialogTrigger><TrashIcon className="h-5 w-5 text-red-500" /></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your post!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => removePost()}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

export default DeletePost;