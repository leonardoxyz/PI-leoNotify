import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
            <div className="container max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    <MountainIcon className="h-6 w-6" />
                </Link>
                <nav>
                    <ul className="flex items-center space-x-4 text-sm">
                        <li>
                            <Link to="/posts/categories/Art" className="hover:underline">
                                Art
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/categories/Technology" className="hover:underline">
                                Technology
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/categories/Education" className="hover:underline">
                                Education
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/categories/Entertainment" className="hover:underline">
                                Entertainment
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/categories/Weather" className="hover:underline">
                                Weather
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

function MountainIcon(props) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    );
}
