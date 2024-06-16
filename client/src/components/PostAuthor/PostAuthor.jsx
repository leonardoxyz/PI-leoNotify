import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import pt from 'javascript-time-ago/locale/pt';

TimeAgo.addDefaultLocale(pt);

const PostAuthor = ({ authorID, createdAt }) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        const getAuthor = async () => {
            if (!authorID) {
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5510/api/users/${authorID.toString()}`);
                setAuthor(res?.data);
            } catch (error) {
                console.error("Error fetching author:", error);
            }
        }
        getAuthor();
    } , [authorID]);


    return (
        <Link to={`/posts/users/${author._id}`} className='grid grid-cols-3 items-center gap-4'>
            <div className="col-span-1">
                <img src={`http://localhost:5510/uploads/${author?.avatar}`} alt="Author Avatar" className='rounded-full aspect-square overflow-hidden' />
            </div>
            <div className="col-span-2 flex flex-col justify-between">
                <h5 className="text-lg font-semibold">
                    {author?.name}
                </h5>
                <small><ReactTimeAgo date={new Date(createdAt)} locale='pt-Br' /></small>
            </div>
        </Link>
    );
};

export default PostAuthor;
