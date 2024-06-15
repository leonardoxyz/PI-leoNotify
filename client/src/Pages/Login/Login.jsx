import React from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"

const Login = () => {
    return (
        <div className="mx-auto max-w-md space-y-6 py-32 flex flex-col items-center justify-center">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">Enter your email and password to sign in.</p>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
                <div className="flex items-center justify-between">
                    <Link href="#" className="text-sm font-medium text-blue-500 hover:underline" prefetch={false}>
                        Forgot password?
                    </Link>
                </div>
                <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    Sign in
                </Button>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{" "}
                    <Link href="#" className="font-medium text-blue-500 hover:underline" prefetch={false}>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login