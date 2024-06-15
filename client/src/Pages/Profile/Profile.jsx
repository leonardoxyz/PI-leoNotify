import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar1 from '../../assets/avatar15.jpg'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Profile = () => {
    const [avatar, setAvatar] = useState(Avatar1)
    const handleFileChange = (e) => {
        setAvatar(e.target.files[0]);
    };

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <div className='flex items-center justify-center p-4'>
                    <Link
                        to="/myposts/1"
                        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    >
                        MY POSTS
                    </Link>
                </div>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Update Profile</CardTitle>
                            <CardDescription>Make changes to your profile information.</CardDescription>
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <Avatar className="h-16 w-16 rounded-full">
                                <AvatarImage src="/placeholder-user.jpg" />
                                <img src={Avatar1} />
                            </Avatar>
                            <Button variant="outline" className="mt-2">
                                <input
                                    type='file'
                                    id='avatar'
                                    name='avatar'
                                    accept='image/png, image/jpeg'
                                    className='hidden'
                                    onChange={handleFileChange}
                                />
                                <label htmlFor='avatar' className='cursor-pointer'>
                                    Upload New Avatar
                                </label>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <form>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input id="fullName" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" placeholder="Enter your current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" placeholder="Enter your new password" value={setNewPassword} onChange={e => setNewPassword(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" placeholder="Confirm your new password" value={setConfirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </div>
                        <p className='text-red-500'>this is wrong message</p>
                    </CardContent>
                </form>

                <CardFooter>
                    <Button className="ml-auto">Save Changes</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Profile