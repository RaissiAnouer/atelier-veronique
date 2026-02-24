import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Product from "./components/Product";
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
          <Route element={<Product />} path="/collection/:id" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
