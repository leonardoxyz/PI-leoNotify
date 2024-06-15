import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PostAuthor from '../PostAuthor/PostAuthor';

const PostItem = ({ postID, category, title, desc, authorID, thumbnail }) => {
    const shortDesc = desc.length > 100 ? desc.substring(0, 100) + '...' : desc;
    const postTitle = title.length > 50 ? title.substring(0, 50) + '...' : title;
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-950 dark:text-gray-50">
            <img src={thumbnail} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
            <div className="p-4">
                <Link to={`/posts/${postID}`}>
                    <h3 className="text-lg font-semibold mb-2">{postTitle}</h3>
                </Link>
                <p className="text-gray-500 dark:text-gray-400 mb-4">{shortDesc}</p>

                <Link to={`/posts/categories/${category}`}>
                    <div className="flex items-end">
                        <PostAuthor />
                        <Button size="sm" className="">
                            {category}
                        </Button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PostItem;
