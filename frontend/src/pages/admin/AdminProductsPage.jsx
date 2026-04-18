import React, { useEffect, useState, useCallback } from "react";
import axiosConfig from "../../utils/axiosConfig";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";
import Modal from "../../components/Modal";
import AddProductForm from "../../components/AddProductForm";
import { Plus, Trash2, Search, ShoppingBag, Pen } from "lucide-react";

const ITEMS_PER_PAGE = 8;

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GETCOLLECTION);
      if (response.status === 200) setProducts(response.data);
    } catch (err) {
      toast.error("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GETCOUNT);
      if (response.status === 200) setCategories(response.data);
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const onDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETEPRODUCT(productId),
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully.");
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      }
    } catch (err) {
      toast.error("Failed to delete product.");
    }
  };

  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const onEditProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setEditData(product);
      setOpenAddModal(true);
    }
  };

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A96E] uppercase mb-2">
          Catalog
        </p>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-500 mt-1.5 text-sm">
              Manage your product catalog. {products.length} products total.
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
            Add Product
          </button>
        </div>
      </div>

      {/* Category Pills */}
      {categories.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => {
              setSelectedCategory("all");
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === "all"
                ? "bg-[#1A1A1A] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            All ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setSelectedCategory(cat.category);
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                selectedCategory === cat.category
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {cat.category} ({cat.count})
            </button>
          ))}
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
          <h3 className="font-semibold text-gray-800">
            {selectedCategory === "all" ? "All Products" : selectedCategory}
          </h3>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search products..."
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
              <p className="text-sm">Loading products...</p>
            </div>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <ShoppingBag size={36} className="text-gray-200 mb-3" />
            <p className="font-medium text-gray-500">No products found</p>
            <p className="text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-gray-400 tracking-[0.15em] bg-gray-50/60">
                  <th className="px-8 py-4 font-semibold">Product</th>
                  <th className="px-8 py-4 font-semibold">Category</th>
                  <th className="px-8 py-4 font-semibold">Price</th>
                  <th className="px-8 py-4 font-semibold">Best Seller</th>
                  <th className="px-8 py-4 font-semibold">Sizes</th>
                  <th className="px-8 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            product.images?.[0] ||
                            "https://placehold.co/80x80/f3f4f6/9ca3af?text=No+Img"
                          }
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                        />
                        <div>
                          <span className="font-medium text-gray-900 text-sm">
                            {product.name}
                          </span>
                          <p className="text-xs text-gray-400 mt-0.5 line-clamp-1 max-w-[200px]">
                            {product.description}
                          </p>
                        </div>
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
                      <div className="flex gap-1 flex-wrap">
                        {product.sizes?.map((s) => (
                          <span
                            key={s.id}
                            className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded"
                          >
                            {s.size}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            onEditProduct(product.id);
                          }}
                          className="text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all p-2"
                        >
                          <Pen size={15} />
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

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={openAddModal}
        onClose={() => {
          setOpenAddModal(false);
          setEditData(null);
          // fetchProducts(); // Removing fetch here so it doesn't spin when just cancelling
        }}
        title={editData ? "Edit Product" : "Add New Product"}
      >
        <AddProductForm 
          initialData={editData} 
          onSuccess={() => {
            setOpenAddModal(false);
            setEditData(null);
            fetchProducts();
          }} 
        />
      </Modal>
    </div>
  );
};

export default AdminProductsPage;
