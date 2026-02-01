import React, { useState } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input";
import axiosConfig from "../utils/axiosConfig";
import { API_ENDPOINTS } from "../utils/apiEndpoints";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const navigate=useNavigate();


  const handleSignup=async()=>{
    setIsLoading(true);
    try {
      const response = axiosConfig.post(API_ENDPOINTS.REGISTER,{fullName,email,password});
    if (response.status===201){
      toast.success("Profile Created Successfully");
      navigate("/login");
    }}catch(err){
      console.error("something went wrong", err);
      setError(err.message);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-[#F1ECE6] w-full h-screen overflow-hidden">
      <div className="w-full h-full flex items-center ">
        <img
          src={assets.tailor}
          className="w-1/2 h-full  object-cover shadow-lg"
          alt=""
        />
        <div className="w-full h-full">
          <div className=" text-center mt-10">
            <h1 className=" text-xl text-[#892923]">ATELIER VERONIQUE</h1>
            <p className=" text-[#B59A70] text-sm ">Collection Privé</p>
          </div>
          <form onSubmit={} className="flex flex-col items-center mt-15">
            <h1 className=" text-4xl font-bold">Create Your Account</h1>
            <Input
              label="Full Name"
              placeholder="Full Name"
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
            <Input
              label="Email Address"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Input
              label="Password"
              placeholder="********"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit" class="btn-quay">Boat Quay</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
