import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/avatar1.jpg';

const PostAuthor = () => {
    return (
        <Link to={`/posts/users/sdfsdf`} className='grid grid-cols-3 items-center gap-4'>
            <div className="col-span-1">
                <img src={Avatar} alt="Author Avatar" className='rounded-full aspect-square overflow-hidden' />
            </div>
            <div className="col-span-2 flex flex-col justify-between">
                <h5 className="text-lg font-semibold">
                    By: John Doe
                </h5>
                <small>Just now</small>
            </div>
        </Link>
    );
};

export default PostAuthor;
