import React, { useEffect, useState } from 'react';
import PostItem from '../PostItem/PostItem';
import Loader from '../Loader/Loader';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get("http://localhost:5510/api/posts");
                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
            setIsLoading(false);
        }
        fetchPosts();
    }, []);


    if (isLoading) {
        return <Loader />
    }

    return (
        <div className="pb-4">
            {posts.length > 0 ? <div className="container grid grid-cols-3 gap-16 ">
                {posts.map(({ _id: id, thumbnail, category, title, desc, creator, createdAt }) => {
                    return (
                        <PostItem
                            key={id}
                            postID={id}
                            thumbnail={thumbnail}
                            category={category}
                            title={title}
                            desc={desc}
                            authorID={creator}
                            createdAt={createdAt}
                        />
                    );
                })}
            </div> : <div className='container flex flex-col justify-center items-center'>
                <h1 className='font-bold text-4xl uppercase'>No posts found</h1>
            </div>}
        </div>
    );
};

export default Posts;