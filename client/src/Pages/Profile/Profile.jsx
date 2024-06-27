import { useState, useContext, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserContext } from '@/context/userContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
    const { currentUser, updateUserAvatar } = useContext(UserContext);
    const navigate = useNavigate();
    const token = currentUser?.token;

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changeAvatar, setChangeAvatar] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            fetchUserData();
        }
    }, [token, navigate]);

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`http://localhost:5510/api/users/${currentUser.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const userData = res.data;
            setName(userData.name);
            setEmail(userData.email);
            setAvatar(userData.avatar);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const changeAvatarHandler = async () => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatar);
            const res = await axios.post(`http://localhost:5510/api/users/change-avatar`, formData, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });
            const newAvatar = res.data.avatar;
            setAvatar(newAvatar);
            setAvatarPreview('');
            updateUserAvatar(newAvatar);
        } catch (error) {
            handleRequestError(error);
        }
    };

    const updateProfile = async (updatedData) => {
        try {
            const res = await axios.patch(
                `http://localhost:5510/api/users/edit-user/${currentUser.id}`,
                updatedData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return res;
        } catch (error) {
            throw error;
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const updatedData = {
                name,
                email,
                currentPassword,
                newPassword,
                confirmPassword,
            };

            const res = await updateProfile(updatedData);

            if (res.status === 200) {
                toast.success('Profile updated successfully');
                toast.success('Your password is: ' + newPassword);
                navigate('/logout');
            }
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        console.error('Error updating user profile:', error);
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError('Failed to update profile');
        }
    };

    return (
        <form onSubmit={handleProfileUpdate}>
            <div className="flex-grow place-content-center">
                <div className="flex items-center justify-center py-6">
                    <Card className="w-full max-w-lg mx-auto">
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>Update your profile information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-4 justify-center">
                                <Avatar className="h-24 w-24">
                                    {avatarPreview ? (
                                        <AvatarImage src={avatarPreview} alt="User avatar" />
                                    ) : (
                                        avatar ? (
                                            <AvatarImage src={`http://localhost:5510/uploads/${avatar}`} alt="User avatar" />
                                        ) : (
                                            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                        )
                                    )}
                                </Avatar>
                                <Button variant="outline" onClick={() => setChangeAvatar(!changeAvatar)}>
                                    Change Avatar
                                </Button>
                            </div>
                            {changeAvatar && (
                                <div className="mt-4">
                                    <Label htmlFor="avatar">Upload New Avatar</Label>
                                    <Input id="avatar" type="file" onChange={handleFileChange} />
                                    <Button onClick={changeAvatarHandler} className="mt-2">
                                        Save Avatar
                                    </Button>
                                </div>
                            )}
                            <div className="mt-4 space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
                            </div>
                            <div className="mt-4 space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                            </div>
                            <div className="mt-4 space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter your current password" />
                            </div>
                            <div className="mt-4 space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter a new password" />
                            </div>
                            <div className="mt-4 space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" />
                            </div>
                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                    <strong className="font-bold">Oops!</strong>
                                    <span className="block sm:inline"> {error}</span>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="ml-auto" type="submit">
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </form>
    );
};

export default Profile;