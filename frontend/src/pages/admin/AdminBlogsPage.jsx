import React, { useEffect, useState, useCallback } from "react";
import axiosConfig from "../../utils/axiosConfig";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import AddBlogForm from "../../components/AddBlogForm";
import { Plus, Trash2, Search, BookOpen, Pen } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const AdminBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GETBLOGS);
      if (response.status === 200) setBlogs(response.data);
    } catch (err) {
      toast.error("Failed to fetch blog posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const onDeleteBlog = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;
    try {
      const response = await axiosConfig.delete(API_ENDPOINTS.DELETEBLOG(blogId));
      if (response.status === 200) {
        toast.success("Blog post deleted successfully.");
        setBlogs((prev) => prev.filter((b) => b.id !== blogId));
      }
    } catch (err) {
      toast.error("Failed to delete blog post.");
    }
  };

  const onEditBlog = (blogId) => {
    const blog = blogs.find(b => b.id === blogId);
    if (blog) {
      setEditData(blog);
      setOpenAddModal(true);
    }
  };

  const filtered = blogs.filter(
    (b) =>
      b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A96E] uppercase mb-2">
          Content
        </p>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
            <p className="text-gray-500 mt-1.5 text-sm">
              Manage your style guides and blog content. {blogs.length} posts
              total.
            </p>
          </div>
          <button
            onClick={() => {
              setEditData(null);
              setOpenAddModal(true);
            }}
            className="flex items-center gap-2 bg-[#1A1A1A] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all shadow-sm"
          >
            <Plus size={18} />
            New Post
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">All Posts</h3>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] w-64 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading blogs...</p>
            </div>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <BookOpen size={36} className="text-gray-200 mb-3" />
            <p className="font-medium text-gray-500">No blog posts found</p>
            <p className="text-sm mt-1">Try adjusting your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-gray-400 tracking-[0.15em] bg-gray-50/60">
                  <th className="px-8 py-4 font-semibold">Blog Post</th>
                  <th className="px-8 py-4 font-semibold">Author</th>
                  <th className="px-8 py-4 font-semibold">Date</th>
                  <th className="px-8 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((blog) => (
                  <tr
                    key={blog.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            blog.image ||
                            "https://placehold.co/80x80/f3f4f6/9ca3af?text=Blog"
                          }
                          alt={blog.title}
                          className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">
                            {blog.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-xs">
                            {blog.text}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-sm text-gray-600">
                        {blog.author}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-500">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => onEditBlog(blog.id)}
                          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all p-2"
                        >
                          <Pen size={15} />
                        </button>
                        <button
                          onClick={() => onDeleteBlog(blog.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-8 py-5 border-t border-gray-50 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* Add/Edit Blog Modal */}
      <Modal
        isOpen={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          setEditData(null);
        }}
        title={editData ? "Edit Blog Post" : "Create New Blog Post"}
      >
        <AddBlogForm 
          initialData={editData}
          onSuccess={() => {
            setOpenAddModal(false);
            setEditData(null);
            fetchBlogs();
          }} 
        />
      </Modal>
    </div>
  );
};

export default AdminBlogsPage;
