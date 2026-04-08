import React, { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";
import {
  ShoppingBag, BookOpen, Trash2, Edit2, Search, ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 8;

const AdminList = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GETCOLLECTION);
        if (response.status === 200) setProducts(response.data);
      } catch (err) {
        toast.error("Failed to fetch products.");
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GETBLOGS);
        if (response.status === 200) setBlogs(response.data);
      } catch (err) {
        toast.error("Failed to fetch blogs.");
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  const onDeleteProduct = async (productId) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETEPRODUCT(productId),
      );
      if (response.status === 200) {
        toast.success("Product deleted.");
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      toast.error(err.message || "Error deleting product.");
    }
  };

  // Filtered & paginated data
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredBlogs = blogs.filter((b) =>
    b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeData = activeTab === "products" ? filteredProducts : filteredBlogs;
  const totalPages = Math.ceil(activeData.length / ITEMS_PER_PAGE);
  const paginated = activeData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const isLoading = activeTab === "products" ? loadingProducts : loadingBlogs;

  return (
    <AdminLayout>
      <div className="p-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A96E] uppercase mb-2">
            Browse
          </p>
          <h1 className="text-3xl font-bold text-gray-900">All Items</h1>
          <p className="text-gray-500 mt-1.5 text-sm">
            View and manage all products and blog posts.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
            <div className="p-3 bg-[#C9A96E]/10 rounded-xl">
              <ShoppingBag size={20} className="text-[#C9A96E]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Products</p>
            </div>
          </div>
          <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <BookOpen size={20} className="text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{blogs.length}</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Blog Posts</p>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Card Header — Tabs + Search */}
          <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between gap-4 flex-wrap">
            {/* Tabs */}
            <div className="flex p-1 bg-gray-100 rounded-xl gap-1">
              {[
                { id: "products", label: "Products", icon: ShoppingBag },
                { id: "blogs", label: "Blogs", icon: BookOpen },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => handleTabChange(id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === id
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] w-64 transition-all"
              />
            </div>
          </div>

          {/* Table Body */}
          {isLoading ? (
            <div className="flex items-center justify-center py-24 text-gray-400">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading...</p>
              </div>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                {activeTab === "products"
                  ? <ShoppingBag size={28} className="text-gray-300" />
                  : <BookOpen size={28} className="text-gray-300" />
                }
              </div>
              <p className="font-medium text-gray-500">No {activeTab} found</p>
              <p className="text-sm mt-1">Try adjusting your search.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {activeTab === "products" ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase text-gray-400 tracking-[0.15em] bg-gray-50/60">
                      <th className="px-8 py-4 font-semibold">Product</th>
                      <th className="px-8 py-4 font-semibold">Category</th>
                      <th className="px-8 py-4 font-semibold">Price</th>
                      <th className="px-8 py-4 font-semibold">Best Seller</th>
                      <th className="px-8 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginated.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.images?.[0] || "https://placehold.co/80x80/f3f4f6/9ca3af?text=No+Img"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                            />
                            <span className="font-medium text-gray-900 text-sm">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#C9A96E]/10 text-[#8B6B3D]">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-gray-700 font-semibold text-sm">
                          {product.price?.toFixed(2)} TND
                        </td>
                        <td className="px-8 py-4">
                          {product.bestSeller ? (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                              ✓ Yes
                            </span>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(product.id)}
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
              ) : (
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase text-gray-400 tracking-[0.15em] bg-gray-50/60">
                      <th className="px-8 py-4 font-semibold">Blog Post</th>
                      <th className="px-8 py-4 font-semibold">Author</th>
                      <th className="px-8 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginated.map((blog) => (
                      <tr key={blog.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={blog.image || "https://placehold.co/80x80/f3f4f6/9ca3af?text=Blog"}
                              alt={blog.title}
                              className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                            />
                            <div>
                              <p className="font-medium text-gray-900 text-sm">{blog.title}</p>
                              <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-xs">
                                {blog.text}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className="text-sm text-gray-600">{blog.author}</span>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                              <Edit2 size={15} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
      </div>
    </AdminLayout>
  );
};

export default AdminList;
