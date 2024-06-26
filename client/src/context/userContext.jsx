import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(() => localStorage.getItem('token'));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    const updateUserAvatar = (newAvatar) => {
        setCurrentUser((prevUser) => ({
            ...prevUser,
            avatar: newAvatar,
        }));
    };

    return (
        <UserContext.Provider value={{ currentUser, token, setCurrentUser, setToken, updateUserAvatar }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;