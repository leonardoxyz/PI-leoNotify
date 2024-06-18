import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { UserContext } from '@/context/userContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
    const { currentUser } = useContext(UserContext);
    const [author, setAuthor] = useState({});

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
                                        <Link to="/logout" className="flex w-full items-center py-2 text-lg font-semibold">
                                            Logout
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
                                <NavigationMenuLink asChild>
                                    <Link
                                        to="/logout">
                                        <Button>Logout</Button>
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
                        <div className="ml-auto flex gap-2">
                            <Link to={`/profile/${currentUser.id}`}>
                                <Avatar>
                                    <AvatarImage src={`http://localhost:5510/uploads/${author.avatar}`} />
                                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                                </Avatar></Link>
                        </div>
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
