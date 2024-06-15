import React, { useState } from 'react'
import { DUMMY_POSTS } from '@/data';
import PostItem from '@/components/PostItem/PostItem';

const AuthorPost = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS);
    return (
        <div className="flex flex flex-col min-h-screen">
            {posts.length > 0 ? <div className="container grid grid-cols-3 gap-16">
                {posts.map(({ id, thumbnail, category, title, desc, authorID }) => {
                    return (
                        <PostItem
                            key={id}
                            postID={id}
                            thumbnail={thumbnail}
                            category={category}
                            title={title}
                            desc={desc}
                            authorID={authorID}
                        />
                    );
                })}
            </div> : <div className='container flex justify-center items-center min-h-screen'>
                <h1 className='font-bold text-4xl uppercase'>No posts found </h1>
            </div>}
        </div>
    )
}

export default AuthorPost