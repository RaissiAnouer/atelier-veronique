import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Product from "./components/Product";
import Blogs from "./pages/Blogs";
import BlogContent from "./components/BlogContent";
import PublicRoute from "../routes/PublicRoute";
import AdminRoute from "../routes/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminBlogsPage from "./pages/admin/AdminBlogsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminCustomersPage from "./pages/admin/AdminCustomersPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
            path="/signup"
          />
          <Route
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
            path="/login"
          />
          <Route element={<Home />} path="/home" />
          <Route element={<Collections />} path="/collection" />
          <Route element={<Collections />} path="/collection/:category" />
          <Route element={<Blogs />} path="/style-guide" />
          <Route element={<BlogContent />} path="/style-guide/:id/:title" />
          <Route element={<Product />} path="/collection/product/:id" />
          <Route element={<CheckoutPage />} path="/checkout" />
          <Route element={<OrderSuccess />} path="/order-success" />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="blogs" element={<AdminBlogsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
