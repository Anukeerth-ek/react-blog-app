import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './Pages/Home.jsx';
import Blog from './Pages/Blog.jsx';
import About from './Pages/About.jsx';
import Contact from './Pages/Contact.jsx';
import Service from './Pages/Service.jsx';
import Login from './Pages/Login.jsx';
import SingleBlog from './Pages/SingleBlog.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children : [
     {
       path: "/",
       element: <Home/>,     
      },
      {
        path: "/blog",
        element: <Blog/>
      },
      {
        path: "/about",
        element: <About/>
      },
      {
        path: "/contact",
        element: <Contact/>
      },
      {
        path: "/service",
        element: <Service/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/blog/:id",
        element: <SingleBlog/>,
        loader: async ({ params }) => {
          try {
            const blogId = params.id;
            const response = await fetch(`/modern-react-js-blog-starter-files/api/blogsData.json?id=${blogId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch blog data');
            }
            const data = await response.json();
            
            return data;
          } catch (error) {
            console.error('Fetch Error:', error);
            throw error;
          }
        },
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router} />

  </React.StrictMode>,
)
