import React, { useState, useContext } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { UserContext } from '@/context/userContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);

    const changeInputHandler = (e) => {
        setUserData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await axios.post("http://localhost:5510/api/users/login", userData);
            const user = res.data;
            setCurrentUser(user);
            navigate('/');
            notify();
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred during login.');
        }
    };

    const notify = () => {
        toast.success('Login successful!');
    };

    return (
        <>
            <div className="mx-auto max-w-md space-y-6 py-32 flex flex-col items-center justify-center">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your email and password to sign in.</p>
                </div>
                <form onSubmit={loginUser}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                                value={userData.email}
                                onChange={changeInputHandler}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                value={userData.password}
                                onChange={changeInputHandler}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Link to="#" className="text-sm font-medium text-blue-500 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            Sign in
                        </Button>
                        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium text-blue-500 hover:underline uppercase" prefetch={false}>
                                Sign up
                            </Link>
                        </div>
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
