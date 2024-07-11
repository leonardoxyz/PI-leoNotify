import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const changeInputHandler = (e) => {
        setUserData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const registerUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5510/api/users/register", userData);
            if (res.data.success) {
                navigate('/login');
            }
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred during registration.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="mx-auto max-w-md space-y-6 py-12">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create an Account</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign up to get started with our platform.</p>
                </div>
                <form onSubmit={registerUser}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" placeholder="Junior" required value={userData.name} onChange={changeInputHandler} name="name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="Junior@example.com" required value={userData.email} onChange={changeInputHandler} name="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required value={userData.password} onChange={changeInputHandler} name="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input id="confirm-password" type="password" required value={userData.password2} onChange={changeInputHandler} name="password2" />
                        </div>
                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                            Create Account
                        </Button>
                        <div className='flex items-center'>
                            <small className="text-center text-sm text-gray-500 dark:text-gray-400">Already have an account?&ensp;</small>
                            <Link className='font-bold text-blue-500' to="/login">SIGN IN</Link>
                        </div>
                        {error && <p className='text-red-500'>{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;