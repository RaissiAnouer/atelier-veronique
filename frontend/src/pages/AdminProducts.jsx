import React, { useEffect, useState } from "react";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import toast from "react-hot-toast";
import Pagination from "../components/Pagination";
import { Plus, Edit2, Trash2, Package } from "lucide-react";
import Modal from "../components/Modal";
import AddProductForm from "../components/AddProductForm";

const ITEMS_PER_PAGE = 5;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GETCOLLECTION);
        if (response.status === 200) setProducts(response.data);
      } catch (err) {
        toast.error(err.message || "Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  const onDeleteProduct = async (productId) => {
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETEPRODUCT(productId),
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully.");
        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (err) {
      toast.error(
        err.message || "An error occurred while deleting the product.",
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {" "}
      <aside className="w-72 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-8">
          <h2 className="text-xl font-bold tracking-tighter text-gray-900">
            AV ADMIN
          </h2>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Management
          </p>
          <NavItem label="Dashboard" active={false} />
          <NavItem label="Products" active={true} />
          <NavItem label="Orders" active={false} />
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Inventory</h1>
            <p className="text-gray-500 mt-1">
              Manage your catalog and stock levels.
            </p>
          </div>
          <button
            onClick={() => setOpenAddModal(true)}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all shadow-sm"
          >
            <Plus size={18} />
            Add Product
          </button>
        </header>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">All Products</h3>
            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              {products.length} Items Total
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase text-gray-400 tracking-wider bg-gray-50/50">
                  <th className="px-8 py-4 font-semibold">Product</th>
                  <th className="px-8 py-4 font-semibold">Category</th>
                  <th className="px-8 py-4 font-semibold">Price</th>
                  <th className="px-8 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            product.image?.[0] ||
                            "https://via.placeholder.com/150"
                          }
                          alt=""
                          className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                        />
                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-gray-600 font-medium">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(product.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Area */}
          <div className="px-8 py-6 border-t border-gray-50 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </main>
      <Modal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        title="Add New Product"
      >
        <AddProductForm />
      </Modal>
    </div>
  );
};

const NavItem = ({ label, active }) => (
  <div
    className={`
    flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all
    ${
      active
        ? "bg-gray-900 text-white shadow-md"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }
  `}
  >
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default AdminProducts;
