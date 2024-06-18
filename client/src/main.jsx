import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';
import Home from './Pages/Home/Home';
import Detail from './Pages/Detail/Detail';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Profile from './Pages/Profile/Profile';
import Author from './Pages/Authors/Authors';
import CreatePost from './Pages/Create/CreatePost';
import CategoryPosts from './Pages/Category/CategoryPosts';
import AuthorPost from './Pages/AuthorPost/AuthorPost';
import Dashboard from './Pages/Dashboard/Dashboard';
import EditPost from './Pages/Edit/EditPost';
import DeletePost from './Pages/Delete/DeletePost';
import Logout from './Pages/Logout/Logout';
import UserProvider from './context/userContext';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserProvider><Layout /></UserProvider>,
    children: [
      { index: true, element: <Home /> },
      { path: "posts/:id", element: <Detail /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "authors", element: <Author /> },
      { path: "create", element: <CreatePost /> },
      { path: "posts/categories/:category ", element: <CategoryPosts /> },
      { path: "posts/users/:id", element: <AuthorPost /> },
      { path: "myposts/:id", element: <Dashboard /> },
      { path: "posts/:id/edit", element: <EditPost /> },
      { path: "posts/:id/delete", element: <DeletePost /> },
      { path: "logout", element: <Logout /> },
      { path: "*", element: <ErrorPage /> },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </React.StrictMode>
);