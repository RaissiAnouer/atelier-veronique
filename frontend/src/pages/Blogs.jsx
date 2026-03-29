import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import axiosConfig from "../utils/axiosConfig";
import BlogItems from "../components/BlogItems";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const handleClick = (id, title) => {
    navigate(`/style-guide/${id}/${title.replace(/\s+/g, "-").toLowerCase()}`);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GETBLOGS);
        if (response.status === 200) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 px-10 mb-8 ">
        {blogs.map((blog) => (
          <div onClick={() => handleClick(blog.id, blog.title)} key={blog.id}>
            <BlogItems
              key={blog.id}
              image={blog.image}
              title={blog.title}
              text={blog.text}
              author={blog.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
