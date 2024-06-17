import React, { useEffect, useState } from 'react'
import { DUMMY_POSTS } from '@/data';
import PostItem from '@/components/PostItem/PostItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorPost = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { category } = useParams();

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
        };
        try {
            const res = axios.get(`http://localhost:5510/api/posts/categories/${category}`)
            setPosts(res?.data)
        } catch (error) {
            console.log(error)
        }
        fetchPosts();
    }, [category])
    return (
        <div className="flex flex-col min-h-screen">
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