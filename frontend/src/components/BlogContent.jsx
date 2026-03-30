import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import Navbar from "./Navbar";

const BlogContent = () => {
  const [blogContent, setBlogContent] = useState(null);
  const { id } = useParams();

  const fetchBlogContent = async (id) => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GETBLOGBYID(id));
      if (response.status === 200) {
        setBlogContent(response.data);
      }
    } catch (error) {
      console.error("Error fetching blog content:", error);
    }
  };

  useEffect(() => {
    fetchBlogContent(id);
  }, [id]);

  if (!blogContent) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="relative w-full h-[400px]">
        <img
          className="w-full h-full object-cover"
          src={blogContent.image}
          alt={blogContent.title}
        />
        <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 bg-white px-10 py-6 ">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase ">
            {blogContent.title}
          </h1>
          <p className="text-gray-700 leading-relaxed text-lg pt-12">
            {blogContent.text}
          </p>

          <div className="text-end text-sm text-gray-400 pt-8">
            Author: {blogContent.author}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
