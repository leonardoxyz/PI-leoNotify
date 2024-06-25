 
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5510/api/users/${authorID}`);
        setAuthor(res.data); // Supondo que res.data contenha { username, avatar }
      } catch (error) {
        console.error('Failed to fetch author details:', error);
      }
    };

    fetchAuthorDetails();
  }, [authorID]);

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        {author?.avatar ? (
          <AvatarImage src={`http://localhost:5510/uploads/${author.avatar}`} alt={author.username} />
        ) : (
          <AvatarFallback>{author.username ? author.username[0].toUpperCase() : 'U'}</AvatarFallback>
        )}
      </Avatar>
      <span className="text-gray-500 dark:text-gray-400">
        {author.username && (
          <>
            <span>By {author.username}</span>
            <span>Published: {new Date(createdAt).toLocaleDateString()}</span>
          </>
        )}
      </span>
    </div>
  );
};

export default PostAuthor;
