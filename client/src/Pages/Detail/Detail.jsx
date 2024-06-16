import { Button } from '@/components/ui/button';
import React, { useEffect, useState, useContext } from 'react';
import Thumbnail from '../../assets/blog22.jpg';
import Loader from '@/components/Loader/Loader';
import DeletePost from '../Delete/DeletePost';
import { useParams } from 'react-router-dom';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Detail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`http://localhost:5510/api/posts/${id}`);
                setPost(res.data);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };
        getPost();
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-6 flex flex-col min-h-screen">
            {error && <div className="text-red-500 text-center">{error.message}</div>}
            {post && (
                <>
                    <div className='flex items-center'>
                        {currentUser?.id === post.creator && (
                            <div className="flex gap-2">
                                <Link to={`/posts/${post?._id}/edit`}>
                                    <Button variant="outline" size="sm">
                                        Edit
                                    </Button>
                                </Link>
                                <DeletePost />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-semibold">{post.title}</h1>
                        {currentUser && currentUser.id === post.authorID && <DeletePost postID={post._id} />}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-gray-500 dark:text-gray-400">
                            <span>Category: </span>
                            <Button size="sm" className="mr-2">
                                {post.category}
                            </Button>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            <span>Published: </span>
                            {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="mt-4">
                        <img src={`http://localhost:5510/uploads/${post.thumbnail}`} alt={post.title} className="w-full h-96 object-cover" />
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-500 dark:text-gray-400">{post.desc}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Detail;
