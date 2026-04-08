import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Product from "./components/Product";
import Blogs from "./pages/Blogs";
import BlogContent from "./components/BlogContent";
import AdminAdd from "./pages/AdminAdd";
import AdminList from "./pages/AdminList";
import AdminOrders from "./pages/AdminOrders";

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
          <Route element={<Home />} path="/home" />
          <Route element={<Collections />} path="/collection" />
          <Route element={<Collections />} path="/collection/:category" />
          <Route element={<Blogs />} path="/style-guide" />
          <Route element={<BlogContent />} path="/style-guide/:id/:title" />
          <Route element={<Product />} path="/collection/product/:id" />

          {/* Admin */}
          <Route path="/admin" element={<Navigate to="/admin/add" replace />} />
          <Route element={<AdminAdd />} path="/admin/add" />
          <Route element={<AdminList />} path="/admin/list" />
          <Route element={<AdminOrders />} path="/admin/orders" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
