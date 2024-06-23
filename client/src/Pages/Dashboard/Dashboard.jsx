import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserContext } from '@/context/userContext';
import Loader from '@/components/Loader/Loader';
import axios from 'axios';
import DeletePost from '../Delete/DeletePost';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const { id } = useParams();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`http://localhost:5510/api/posts/users/${id}`, {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` },
                });
                const cleanedPosts = res.data.map(post => ({
                    ...post,
                    desc: cleanDescription(post.desc),
                    shortDesc: createShortDesc(post.desc),
                }));
                setPosts(cleanedPosts);
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchPosts();
    }, [id, token]);

    const cleanDescription = (description) => {
        return description.replace(/<[^>]+>/g, '');
    };

    const createShortDesc = (description) => {
        const cleanDesc = cleanDescription(description);
        return cleanDesc.length > 150 ? cleanDesc.substring(0, 150) + '...' : cleanDesc;
    };

    if (isLoading) return (<Loader />);

    return (
        <div className="flex items-center justify-center">
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container grid gap-8 px-4 md:px-6">
                    <div className="grid gap-6">
                        <>
                            {posts.length === 0 ? (
                                <div className='container flex flex-col justify-center items-center'>
                                    <h1 className='font-bold text-4xl uppercase'>No posts found</h1>
                                </div>

                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Your Blog Posts</h2>
                                    </div>
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {posts.map(post => (
                                            <div key={post._id} className="group relative overflow-hidden rounded-lg">
                                                <img
                                                    src={`http://localhost:5510/uploads/${post.thumbnail}`}
                                                    alt="Blog Post"
                                                    width={400}
                                                    height={300}
                                                    className="h-60 w-full object-cover transition-opacity group-hover:opacity-50"
                                                />
                                                <div className="absolute inset-0 z-20 flex flex-col justify-between bg-gradient-to-t from-gray-900/80 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                                    <div>
                                                        <Link to={`/posts/${post._id}`}>
                                                            <h3 className="text-lg font-semibold">{post.title}</h3>
                                                            <p className="text-sm text-gray-300">
                                                                {post.shortDesc}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Link to={`/posts/${post._id}/edit`}>
                                                            <Button variant="ghost" size="icon">
                                                                <FilePenIcon className="h-5 w-5" />
                                                                <span className="sr-only">Edit</span>
                                                            </Button>
                                                        </Link>
                                                        <DeletePost postId={post._id} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    </div>
                </div>
            </section>
        </div>
    );
};

function FilePenIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
        </svg>
    );
}

export default Dashboard;