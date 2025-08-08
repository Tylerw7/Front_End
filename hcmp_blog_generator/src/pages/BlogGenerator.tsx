import React, {useState, useEffect} from 'react';

import axios from 'axios';
import BlogChat from '../components/blog_generator/BlogChat';



const BlogGenerator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    useEffect(() => {
        const checkAuth = async () => {
          try {
            // Call API without setting Authorization header; cookie is sent automatically
            const response = await axios.post(
              "https://hcmpblog-server-7cdb5790849d.herokuapp.com/auth",
              {},
              { withCredentials: true }
            );
            setIsAuthenticated(true);
          } catch (error) {
            console.error(error);
            setIsAuthenticated(false);
          }
        };
    
        checkAuth();
      }, []);



    return ( 
        <>
        {isAuthenticated ? (<BlogChat />): "false"}
        </>
     );
}
 
export default BlogGenerator;