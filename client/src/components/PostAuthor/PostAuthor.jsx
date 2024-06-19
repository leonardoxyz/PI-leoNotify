import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import pt from 'javascript-time-ago/locale/pt';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

TimeAgo.addDefaultLocale(pt);

const PostAuthor = ({ authorID, createdAt }) => {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        const getAuthor = async () => {
            if (!authorID) {
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5510/api/users/${authorID}`);
                setAuthor(res?.data);
            } catch (error) {
                console.error("Error fetching author:", error);
            }
        }
        getAuthor();
    }, [authorID]);

    return (
        <>
            {author && (
                <Link to={`/posts/users/${author._id}`} className="flex items-center gap-1">
                    <img src={`http://localhost:5510/uploads/${author?.avatar}`} alt={author.username} className="w-14 h-14 rounded-full" />
                    <span>{author.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-[1px]">
                        <ReactTimeAgo date={createdAt} locale="pt" />
                    </span>
                </Link>

            )}
        </>
    );
};

export default PostAuthor;