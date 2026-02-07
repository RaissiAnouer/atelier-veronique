import React, { useState } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/validation";
import { toast } from "react-hot-toast";
import Title from "../components/Title";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName.trim()) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter valid email address");
      setIsLoading(false);
      return;
    }
    setError("");
    try {
      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
      });
      if (response.status === 201) {
        toast.success("Profile Created Successfully");
        navigate("/login");
      }
    } catch (err) {
      if (err.status === 403) {
        setError("User with this email already exist");
      } else {
        console.error("something went wrong", err);
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex w-full h-screen ">
      <div className="w-full md:w-1/2 h-full flex justify-center pt-2 ">
        <form
          onSubmit={(e) => handleSignup(e)}
          className="flex flex-col gap-4 w-3/4 md:w-1/2"
        >
          <Title text1="ATELIER" text2="VERONIQUE" />
          <div>
            <h3 className="mt-10 font- text-lg text-gray-800 mb-[-10px]">
              CREATE YOUR ACCOUNT
            </h3>
            <p className="text-sm text-gray-500 font-md my-2">
              We need some information about you to create your account.
            </p>
          </div>
          <Input
            label="FULL NAME "
            value={fullName}
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
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
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="py-2  border-1 text-xs  hover:text-gray-500 border-r-[2px] border-l-[2px] cursor-pointer mt-10"
          >
            REGISTER
          </button>
        </form>
      </div>
      <img
        src={assets.login}
        className="md:w-1/2 h-full hidden md:block object-cover"
        alt=""
      />
    </div>
  );
};

export default Signup;
