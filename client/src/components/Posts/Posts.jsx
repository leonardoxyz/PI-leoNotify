import React, { useState } from 'react';
import PostItem from '../PostItem/PostItem';
import Thumbnail1 from '../../assets/blog1.jpg';
import Thumbnail2 from '../../assets/blog2.jpg';
import Thumbnail3 from '../../assets/blog3.jpg';
import Thumbnail4 from '../../assets/blog4.jpg';
import { DUMMY_POSTS } from '@/data';

const Posts = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS);
    console.log(posts);
    return (
        <div className="posts">
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
    );
};

export default Posts;
