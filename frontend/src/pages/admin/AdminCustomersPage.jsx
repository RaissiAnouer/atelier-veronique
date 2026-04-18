import React, { useEffect, useState, useCallback } from "react";
import axiosConfig from "../../utils/axiosConfig";
import { API_ENDPOINTS } from "../../utils/apiEndpoints";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination";
import { Trash2, Search, Users, Shield, User } from "lucide-react";

const ITEMS_PER_PAGE = 10;

const AdminCustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_PROFILES);
      if (response.status === 200) setCustomers(response.data);
    } catch (err) {
      toast.error("Failed to fetch customers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const onDeleteCustomer = async (customerId) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this customer? This action cannot be undone."
      )
    )
      return;
    try {
      const response = await axiosConfig.delete(
        API_ENDPOINTS.DELETE_PROFILE(customerId)
      );
      if (response.status === 200) {
        toast.success("Customer deleted successfully.");
        setCustomers((prev) => prev.filter((c) => c.id !== customerId));
      }
    } catch (err) {
      toast.error("Failed to delete customer.");
    }
  };

  const filtered = customers.filter(
    (c) =>
      c.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const adminCount = customers.filter((c) => c.role === "ADMIN").length;
  const userCount = customers.filter((c) => c.role === "USER").length;

  return (
    <div className="p-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold tracking-[0.3em] text-[#C9A96E] uppercase mb-2">
          People
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-500 mt-1.5 text-sm">
          Manage user accounts. {customers.length} registered users.
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl">
            <Users size={20} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {customers.length}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Total Users
            </p>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
          <div className="p-3 bg-violet-50 rounded-xl">
            <Shield size={20} className="text-violet-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{adminCount}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Admins
            </p>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <User size={20} className="text-blue-500" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{userCount}</p>
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Customers
            </p>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-8 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">All Users</h3>
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]/30 focus:border-[#C9A96E] w-72 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading customers...</p>
            </div>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Users size={36} className="text-gray-200 mb-3" />
            <p className="font-medium text-gray-500">No customers found</p>
            <p className="text-sm mt-1">Try adjusting your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] uppercase text-gray-400 tracking-[0.15em] bg-gray-50/60">
                  <th className="px-8 py-4 font-semibold">User</th>
                  <th className="px-8 py-4 font-semibold">Email</th>
                  <th className="px-8 py-4 font-semibold">Role</th>
                  <th className="px-8 py-4 font-semibold">Joined</th>
                  <th className="px-8 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.map((customer) => (
                  <tr
                    key={customer.id}
                    className="hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#C9A96E]/15 flex items-center justify-center">
                          <span className="text-sm font-bold text-[#C9A96E]">
                            {customer.fullName
                              ?.charAt(0)
                              ?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {customer.fullName}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-500">
                      {customer.email}
                    </td>
                    <td className="px-8 py-4">
                      {customer.role === "ADMIN" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-violet-50 text-violet-700">
                          <Shield size={10} />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Customer
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-4 text-sm text-gray-500">
                      {customer.createdAt
                        ? new Date(customer.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex justify-end">
                        {customer.role !== "ADMIN" ? (
                          <button
                            onClick={() => onDeleteCustomer(customer.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={15} />
                          </button>
                        ) : (
                          <span className="text-xs text-gray-300 p-2">
                            Protected
                          </span>
                        )}
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
    </div>
  );
};

export default AdminCustomersPage;
