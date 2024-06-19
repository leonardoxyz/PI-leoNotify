import React, { useEffect, useState, useContext } from 'react';
import Loader from '@/components/Loader/Loader';
import { useParams } from 'react-router-dom';
import { UserContext } from '@/context/userContext';
import axios from 'axios';
import PostAuthor from '@/components/PostAuthor/PostAuthor';
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


const Detail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { currentUser } = useContext(UserContext);
    const [author, setAuthor] = useState({});

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

    if (error) {
        return <div className="text-red-500 text-center">{error.message}</div>;
    }

    return (
        <>
            {post && (
                <div className='container'>
                    <div className='flex h-20 items-center justify-center'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{post.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
            )}
            <div className="bg-white dark:bg-gray-900 px-4 py-6 md:px-6 lg:py-12">
                <div className="max-w-3xl mx-auto">
                    {post && (
                        <>
                            <div className="flex">
                                <div className="flex-1">
                                    <div className="">
                                        <p className="text-gray-500 dark:text-gray-400">
                                            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
                                            <span>Published: </span>{new Date(post.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="p-1 uppercase text-bold bg-primary/10 dark:bg-primary/20 mt-4 rounded-full inline-block text-primary dark:text-primary-400 text-sm font-medium">
                                        {post.category}
                                    </div>
                                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                                        {post.title}
                                    </h1>
                                </div>
                                <div className="flex-shrink-0">
                                    <img
                                        src={`http://localhost:5510/uploads/${post.thumbnail}`}
                                        alt={post.title}
                                        width={400}
                                        height={300}
                                        className="rounded-lg object-cover w-full md:w-[400px] md:h-[300px]"
                                    />
                                </div>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 mt-4">
                                {post.desc}
                            </p>
                        </>
                    )}
                </div>
            </div>

            <div className="pt-4">
                <Separator />
            </div>

            <div className="w-full max-w-2xl mx-auto space-y-8 py-4">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold">Discussion</h2>
                            <p className="text-gray-500 dark:text-gray-400">Share your thoughts and engage with the community.</p>
                        </div>
                        <Button variant="outline" size="sm">
                            View all comments
                        </Button>
                    </div>
                    <form className="grid gap-4">
                        <Textarea placeholder="Write your comment here..." className="min-h-[120px] resize-none" />
                        <div className="flex justify-end">
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="font-semibold">@iamwillpursell</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">May 15, 2023</div>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                                This is a great article! I really enjoyed learning more about the topic and the insights provided.
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <ThumbsUpIcon className="w-4 h-4" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MessageCircleIcon className="w-4 h-4" />
                                    <span className="sr-only">Reply</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <ShareIcon className="w-4 h-4" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="font-semibold">@HackSoft</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">May 12, 2023</div>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                                Interesting perspective. I have a few thoughts to add to this discussion and would love to hear your
                                feedback.
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <ThumbsUpIcon className="w-4 h-4" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MessageCircleIcon className="w-4 h-4" />
                                    <span className="sr-only">Reply</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <ShareIcon className="w-4 h-4" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12 border">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>AC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="font-semibold">@greed7513</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">May 10, 2023</div>
                            </div>
                            <div className="text-gray-700 dark:text-gray-300">
                                Thanks for sharing this informative article. I learned a lot from it and it has sparked some interesting
                                thoughts.
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <ThumbsUpIcon className="w-4 h-4" />
                                    <span className="sr-only">Like</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MessageCircleIcon className="w-4 h-4" />
                                    <span className="sr-only">Reply</span>
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <ShareIcon className="w-4 h-4" />
                                    <span className="sr-only">Share</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>



    );
};

function MessageCircleIcon(props) {
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
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
    )
}


function ShareIcon(props) {
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
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
        </svg>
    )
}


function ThumbsUpIcon(props) {
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
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
        </svg>
    )
}

export default Detail;