import { DUMMY_POSTS } from '@/data';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Thumbnail1 from '../../assets/blog1.jpg';
import Thumbnail2 from '../../assets/blog2.jpg';
import Thumbnail3 from '../../assets/blog3.jpg';
import Thumbnail4 from '../../assets/blog4.jpg';

const Dashboard = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS);

    return (
        <>
            <div className="flex min-h-screen items-center justify-center">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container grid gap-8 px-4 md:px-6">
                        <div className="grid gap-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Your Blog Posts</h2>
                            </div>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {posts.map(post => (
                                    <div key={post.id} className="group relative overflow-hidden rounded-lg">
                                        <Link to="#" className="absolute inset-0 z-10">
                                            <span className="sr-only">View</span>
                                        </Link>
                                        <img
                                            src={post.thumbnail}
                                            alt="Blog Post"
                                            width={400}
                                            height={300}
                                            className="h-60 w-full object-cover transition-opacity group-hover:opacity-50"
                                        />
                                        <div className="absolute inset-0 z-20 flex flex-col justify-between bg-gradient-to-t from-gray-900/80 to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                                            <div>
                                                <h3 className="text-lg font-semibold">{post.title}</h3>
                                                <p className="text-sm text-gray-300">
                                                    {post.desc}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link to="/posts/1">
                                                    <Button variant="ghost" size="icon">
                                                        <EyeIcon className="h-5 w-5" />
                                                        <span className="sr-only">View</span>
                                                    </Button>
                                                </Link>
                                                <Link to="/posts/1/edit">
                                                    <Button variant="ghost" size="icon" href="">
                                                        <FilePenIcon className="h-5 w-5" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                </Link>
                                                <Link to="/posts/1/delete">
                                                    <Button variant="ghost" size="icon">
                                                        <TrashIcon className="h-5 w-5" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

function EyeIcon(props) {
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
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

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

function TrashIcon(props) {
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
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
    );
}

export default Dashboard;
