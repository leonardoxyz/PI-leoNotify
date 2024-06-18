import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { UserContext } from '@/context/userContext';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import axios from 'axios';

export default function Header() {
    const { currentUser } = useContext(UserContext);
    const [author, setAuthor] = useState({});

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (!currentUser?.id) {
                return;
            }

            try {
                const res = await axios.get(`http://localhost:5510/api/users/${currentUser.id}`);
                setAuthor(res?.data);
            } catch (error) {
                console.error("Error fetching current user:", error);
            }
        }
        fetchCurrentUser();
    }, [currentUser]);

    return (
        <>
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <header className="flex h-20 w-full items-center px-4 md:px-6 justify-between">
                    <>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="lg:hidden">
                                    <MenuIcon className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            {currentUser?.id && (
                                <SheetContent side="left">
                                    <div className="grid gap-2 py-6">
                                        <Link to="/" className="flex w-full items-center py-2 text-lg font-semibold">
                                            leoBlog
                                        </Link>

                                        <Link to="/create" className="flex w-full items-center py-2 text-lg font-semibold">
                                            Create Post
                                        </Link>
                                        <Link to="/authors" className="flex w-full items-center py-2 text-lg font-semibold">
                                            Authors
                                        </Link>
                                    </div>
                                </SheetContent>
                            )}

                            {!currentUser?.id && (
                                <SheetContent side="left">
                                    <div className="grid gap-2 py-6">
                                        <Link to="/" className="flex w-full items-center py-2 text-lg font-semibold">
                                            leoBlog
                                        </Link>
                                        <Link to="/authors" className="flex w-full items-center py-2 text-lg font-semibold">
                                            Authors
                                        </Link>
                                    </div>
                                </SheetContent>
                            )}
                        </Sheet>
                    </>
                    {currentUser?.id && (
                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to={`/`}
                                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                    >
                                        leoBlog
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/create"
                                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                    >
                                        Create Post
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/authors"
                                        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                    >
                                        Authors
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuList>
                        </NavigationMenu>
                    )}
                    {!currentUser?.id && (
                        <>
                            <NavigationMenu className="hidden lg:flex">
                                <NavigationMenuList>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/"
                                            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                        >
                                            Home
                                        </Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            to="/authors"
                                            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                                        >
                                            Authors
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuList>
                            </NavigationMenu>

                            <div className="ml-auto flex gap-2">
                                <Link to="/login">
                                    <Button variant="outline">Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button>Sign Up</Button>
                                </Link>
                            </div>
                        </>
                    )}

                    {currentUser && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="group relative inline-block cursor-pointer">
                                    <Avatar className="h-10 w-10 transition-transform duration-200 ease-in-out group-hover:scale-105">
                                        {author?.avatar ? (
                                            <AvatarImage src={`http://localhost:5510/uploads/${author.avatar}`} alt={author.name} />
                                        ) : (
                                            <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="absolute top-0 left-0 h-full w-full rounded-full bg-gray-900/10 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100 group-focus-within:opacity-100" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800">
                                <Link to={`/profile/${currentUser.id}`}>
                                    <DropdownMenuItem className="cursor-pointer flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-colors ">
                                        Profile
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator className="my-1" />
                                <Link to="/logout">
                                    <DropdownMenuItem className="cursor-pointer flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900">
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </header>
            </div>
        </>
    );
}


function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
}
