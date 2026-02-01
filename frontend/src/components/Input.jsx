import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = (label, value, onChange, placeholder, type) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="mt-4">
      <div className="relative">
        <input
          className="border-b focus:outline-none focus:border-[#892923] w-64 py-2 mt-2"
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          label={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {type === "pasword" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
            {showPassword ? (
              <Eye
                size={20}
                className="text-purple-600"
                onClick={toggleShowPassword}
              />
            ) : (
              <EyeOff
                size={20}
                className="text-slate-400"
                onClick={toggleShowPassword}
              />
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
