import React, { useState, useEffect } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { toast } from "react-hot-toast";
import uploadProductImages from "../utils/uploadProductImages";
import Input from "./Input";
import { assets } from "../assets/assets";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const AddBlogForm = ({ initialData = null, onSuccess }) => {
  const isEditMode = !!initialData;
  const [title, setTitle] = useState(initialData?.title || "");
  const [text, setText] = useState(initialData?.text || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [image, setImage] = useState(initialData?.image || null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = "";
      if (image && typeof image !== "string") {
        const urls = await uploadProductImages([image]);
        imageUrl = urls[0];
      } else if (typeof image === "string") {
        imageUrl = image;
      }

      const payload = {
        title,
        text,
        author,
        image: imageUrl,
      };

      let response;
      if (isEditMode) {
        response = await axiosConfig.patch(API_ENDPOINTS.EDITBLOG(initialData.id), payload);
      } else {
        response = await axiosConfig.post(API_ENDPOINTS.ADDBLOG, payload);
      }

      if (response.status === 201 || response.status === 200) {
        toast.success(isEditMode ? "Blog post updated successfully" : "Blog post created successfully");
        if (!isEditMode) {
          setTitle("");
          setText("");
          setAuthor("");
          setImage(null);
        }
        onSuccess?.();
      }
    } catch (err) {
      toast.error(err.message || "Failed to save blog post");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full max-w-5xl"
    >
      {/* Left Column: Media & Meta */}
      <div className="lg:col-span-5 flex flex-col gap-4 bg-gray-50/50 p-5 rounded-2xl border border-gray-100">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 tracking-wider uppercase mb-1">Cover Image</h4>
          <p className="text-xs text-gray-500 mb-3">Upload a high-quality cover image for your blog post.</p>
          <label htmlFor="blogImage" className="cursor-pointer group relative overflow-hidden rounded-xl bg-white border-2 border-dashed border-gray-200 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all aspect-video flex items-center justify-center shadow-sm">
            {image ? (
              <img
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                alt="Upload Cover"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#C9A96E] transition-colors">
                <img src={assets.upload_area} alt="Upload" className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-medium tracking-wider">CLICK TO UPLOAD</span>
              </div>
            )}
            {image && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white text-xs font-semibold px-4 py-1.5 bg-black/60 rounded-full backdrop-blur-sm">Replace Image</span>
              </div>
            )}
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="blogImage"
              hidden
              accept="image/*"
            />
          </label>
        </div>

        <div className="mt-2">
          <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1.5 block">Author Name <span className="text-red-500">*</span></label>
          <input
            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40 focus:border-[#C9A96E] transition-all text-sm font-medium"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g. Atelier Veronique Team"
            required
          />
        </div>
      </div>

      {/* Right Column: Title & Content */}
      <div className="lg:col-span-7 flex flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-0.5">Blog Title <span className="text-red-500">*</span></label>
            <input
              className="w-full px-3 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/40 focus:border-[#C9A96E] transition-all text-sm font-semibold text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Art of Modern Tailoring..."
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 relative z-10 w-full mb-4">
            <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Content <span className="text-red-500">*</span></label>
            <div className="bg-white rounded-xl overflow-hidden [&_.ql-container]:min-h-[180px] [&_.ql-container]:text-sm [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200 [&_.ql-toolbar]:bg-gray-50/50 [&_.ql-editor]:text-gray-700">
              <ReactQuill 
                theme="snow" 
                value={text} 
                onChange={setText} 
                className=""
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="w-full md:w-auto px-10 py-3 bg-[#1A1A1A] text-white rounded-xl text-sm font-bold tracking-wider hover:bg-gray-800 focus:ring-4 focus:ring-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-md shadow-[#C9A96E]/10"
          >
            {loading ? (isEditMode ? "SAVING..." : "PUBLISHING...") : (isEditMode ? "SAVE CHANGES" : "PUBLISH POST")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddBlogForm;
