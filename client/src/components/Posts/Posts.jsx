import React, { useEffect, useState } from 'react';
import PostItem from '../PostItem/PostItem';
import Thumbnail1 from '../../assets/blog1.jpg';
import Thumbnail2 from '../../assets/blog2.jpg';
import Thumbnail3 from '../../assets/blog3.jpg';
import Thumbnail4 from '../../assets/blog4.jpg';
import { DUMMY_POSTS } from '@/data';
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
        <div className="container">
            {posts.length > 0 ? <div className="container grid grid-cols-3 gap-16">
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
            </div> : <div className='container flex justify-center items-center min-h-screen'>
                <h1 className='font-bold text-4xl uppercase'>No posts found </h1>
            </div>}
        </div>
    );
};

export default Posts;
