import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser));
    }, [currentUser]);

    const updateUserAvatar = (newAvatar) => {
        setCurrentUser((prevUser) => ({
            ...prevUser,
            avatar: newAvatar,
        }));
    };

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, updateUserAvatar }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;