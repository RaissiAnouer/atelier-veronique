import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />
          <Route element={<Home />} path="/home" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
