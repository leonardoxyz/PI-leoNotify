import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }
    return (
        <div className='flex flex-col min-h-screen items-center justify-center'>
            <div className="mx-auto max-w-md space-y-6 py-12">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create an Account</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign up to get started with our platform.</p>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" placeholder="John Doe" required value={userData.name} onChange={changeInputHandler} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required value={userData.email} onChange={changeInputHandler} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required value={userData.password} onChange={changeInputHandler} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" required value={userData.password2} onChange={changeInputHandler} />
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        Create Account
                    </Button>
                    <p className='p-4 bg-red-500 rounded-md text-2xl font-medium justify-center items-center flex'>This is a wrong message!</p>
                    <div className='flex items-center justify-center'>
                        <small>Already have an account?&ensp;</small>
                        <Link className='font-bold text-blue-500' to="/login">SIGN IN</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Register