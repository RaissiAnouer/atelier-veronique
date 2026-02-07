import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import toast from "react-hot-toast";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { AlertCircle } from "lucide-react";
import { validateEmail } from "../utils/validation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Password is required");
      setIsLoading(false);
      return;
    }
    setError("");
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });
      if (response.status === 200) {
        toast("Login successful");
        console.log(response.data);
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-full h-screen ">
      <div className="w-full md:w-1/2 h-full flex justify-center pt-10">
        <form
          onSubmit={(e) => handleLogin(e)}
          className="flex flex-col gap-4 w-3/4 md:w-1/2"
        >
          <Title text1="ATELIER" text2="VERONIQUE" />
          <div>
            <h3 className="mt-10 font-medium text-lg text-gray-800 mb-[-10px]">
              CREATE YOUR ACCOUNT
            </h3>
            <p className="text-sm text-gray-500 font-md my-2">
              Please enter your login details to continue.
            </p>
          </div>
          <Input
            label="EMAIL "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            label="PASSWORD "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
          />
          {error && (
            <div className="flex items-center gap-1 ">
              <AlertCircle size={14} className="text-red-500" />
              <p className="text-red-500 text-sm ">{error}</p>
            </div>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className="py-2  border-1 text-xs  hover:text-gray-500 border-r-[2px] border-l-[2px] cursor-pointer mt-10"
          >
            LOGIN
          </button>
        </form>
      </div>
      <img
        src={assets.login}
        className="w-1/2 h-full hidden md:block object-cover"
        alt=""
      />
    </div>
  );
};

export default Login;
