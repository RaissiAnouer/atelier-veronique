import React, { useContext } from "react";
import { X, User, Mail, Shield, Calendar } from "lucide-react";
import { AppContext } from "../context/AppContext";

const ProfileModal = ({ isOpen, onClose }) => {
  const { user } = useContext(AppContext);

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity min-h-screen">
      <div className="bg-white mx-4 w-full max-w-md rounded-2xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-gray-900 to-gray-700 rounded-t-2xl relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Avatar */}
          <div className="absolute -bottom-10 left-8">
            <div className="w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center text-3xl font-bold text-gray-800">
                {user.firstName ? user.firstName.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-14 pb-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              {String(user.role).toLowerCase() === 'admin' ? 'Administrator' : 'Customer'}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Mail className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Email Address</p>
                <p className="text-sm text-gray-800 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Account Status</p>
                <p className="text-sm text-gray-800 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Active
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">
              Profile updates can be requested by contacting support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
