import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ label, value, onChange, type, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);
  const isPassword = type === "password";

  return (
    <div className="mt-6 relative w-full">
      {/* Input */}
      <input
        {...props}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        placeholder=" " // Required for the peer-placeholder-shown logic
        className={`peer block w-full text-lg bg-transparent border-b-2 border-gray-300 
                   focus:border-gray-800 outline-none pb-2 pt-1 transition-colors
                   ${isPassword ? "pr-10" : "pr-0"}`}
      />
      {/* Floating label */}
      <label
        className="absolute left-0 top-2 text-gray-500 text-xs transition-all duration-300 pointer-events-none
                   peer-focus:-top-4 peer-focus:text-xs peer-focus:text-gray-800
                   peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-sm"
      >
        {label}
      </label>

      {/* Password toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute right-0 top-2 text-gray-400 hover:text-gray-800 transition-colors"
          tabIndex="-1" // Prevents tabbing to the eye icon instead of the next input
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )}
    </div>
  );
};

export default Input;
