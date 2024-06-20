import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from '../PostAuthor/PostAuthor';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const PostItem = ({ postID, category, title, desc, authorID, thumbnail, createdAt }) => {
    const shortDesc = desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
    const postTitle = title.length > 100 ? title.substring(0, 100) + '...' : title;

    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-950 dark:text-gray-50 transition-transform transform hover:-translate-y-1">
            <Link to={`/posts/${postID}`}>
                <img
                    src={`http://localhost:5510/uploads/${thumbnail}`}
                    alt={title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <Link to={`/posts/${postID}`}>
                        <h3 className="text-lg font-semibold mb-2">{postTitle}</h3>
                        <div
                            className="text-gray-500 dark:text-gray-400 mb-4"
                            dangerouslySetInnerHTML={{ __html: shortDesc }}
                        />
                    </Link>

                    <PostAuthor authorID={authorID} createdAt={createdAt} />

                    <div className='flex items-end w-full justify-end'>
                        <Link to={`/posts/categories/${category}`}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>{category}</TooltipTrigger>
                                    <TooltipContent>
                                        <p>See more</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Link>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default PostItem;
