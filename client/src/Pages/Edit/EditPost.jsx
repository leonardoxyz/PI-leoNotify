import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/context/userContext';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [desc, setDesc] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const POST_CATEGORIES = [
        'Uncategorized', 'General', 'News', 'Technology', 'Entertainment',
        'Music', 'Movies', 'Gaming', 'Sports', 'Health', 'Science', 'Travel',
        'Food', 'Education', 'Fashion', 'Books', 'Art', 'Design', 'Photography',
        'Lifestyle', 'Fitness', 'Cars', 'Animals', 'Nature', 'Humor', 'DIY',
        'Advice', 'Relationships', 'Parenting', 'Spirituality', 'Religion',
        'Philosophy', 'Politics', 'History', 'Psychology', 'Writing', 'Poetry',
        'True Stories', 'Short Stories', 'Fan Fiction', 'Erotica', 'Thriller',
        'Mystery', 'Horror', 'Fantasy', 'Science Fiction', 'Romance', 'Teen Fiction',
        'Adventure', 'Action', 'Children', 'Comics', 'Manga', 'Graphic Novels',
        'Classics', 'Literature', 'Contemporary', 'Historical', 'Urban', 'Paranormal',
        'Young Adult', 'Chick Lit', 'Suspense', 'Dystopian', 'Self Help', 'Motivational',
        'Spiritual', 'Cookbooks', 'Biographies', 'Math', 'Physics', 'Chemistry', 'Biology',
        'Astronomy', 'Geology', 'Engineering', 'Economics', 'Business', 'Marketing',
        'Management', 'Leadership', 'Public Relations', 'Advertising', 'Sales', 'Finance',
        'Investing', 'Stocks', 'Real Estate', 'Personal Finance', 'Budgeting', 'Retirement',
        'Taxes', 'Insurance', 'Credit', 'Debt', 'Banking', 'Cryptocurrency', 'Blockchain',
        'Startups', 'Venture Capital', 'Angel Investing'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!");
    };

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [])

    return (
        <div className='flex min-h-screen items-center justify-center'>
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Edit Topic</CardTitle>
                    <CardDescription>Fill out the form to edit a old discussion topic.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter topic title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</Label>
                            <div className="relative">
                                <select
                                    id="category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="block w-full px-4 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                >
                                    {POST_CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM7 10V8h6v2H7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="description">Description</Label>
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                value={desc}
                                onChange={setDesc}
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <Input
                                id="thumbnail"
                                type="file"
                                onChange={e => setThumbnail(e.target.files[0])}
                                accept="image/png, image/jpeg"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Edit Topic
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditPost;
