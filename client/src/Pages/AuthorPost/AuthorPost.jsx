import React, { useEffect, useState } from 'react';
import PostItem from '@/components/PostItem/PostItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '@/components/Loader/Loader';

const AuthorPost = () => {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`http://localhost:5510/api/posts/users/${id}`);
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
        <div className="container">
            {posts.length > 0 ? <div className="container grid grid-cols-3 gap-16 ">
                {posts.map(({ _id: id, thumbnail, category, title, desc, creator, authorID, createdAt }) => {
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
}

export default AuthorPost;
