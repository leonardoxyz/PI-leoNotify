import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar1 from '../../assets/avatar1.jpg';
import Avatar2 from '../../assets/avatar2.jpg';
import Avatar3 from '../../assets/avatar3.jpg';
import Avatar4 from '../../assets/avatar4.jpg';
import Avatar5 from '../../assets/avatar5.jpg';

const authorsData = [
    { id: 1, avatar: Avatar1, name: 'John Doe', posts: 3 },
    { id: 2, avatar: Avatar2, name: 'Jane Doe', posts: 5 },
    { id: 3, avatar: Avatar3, name: 'John Smith', posts: 2 },
    { id: 4, avatar: Avatar4, name: 'Jane Smith', posts: 4 },
    { id: 5, avatar: Avatar5, name: 'John Doe', posts: 3 }
];

const Authors = () => {
    const [authors, setAuthors] = useState(authorsData);

    return (
        <div className='flex min-h-screen items-center justify-center gap-8'>
            {authors.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-8">
                    {authors.map(({ id, avatar, name, posts }) => (
                        <Link key={id} to={`/posts/users/${id}`} className="flex flex-col items-center">
                            <img src={avatar} alt={name} className="rounded-full w-20 h-20 object-cover" />
                            <p className="mt-2">{name}</p>
                            <p className="text-sm text-gray-500">{posts} Posts</p>
                        </Link>
                    ))}
                </div>
            ) : (
                <p className='text-2xl font-bold uppercase'>No Authors Found</p>
            )}
        </div>
    );
};

export default Authors;
