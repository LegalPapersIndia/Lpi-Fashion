import React from "react";
import { LogOut, Package, Users, ShoppingBag, Settings } from "lucide-react";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between px-6 lg:px-10 py-5 bg-gray-900 border-b border-gray-800">
      
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-black text-xl">L</span>
        </div>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
            LPI Fashion
          </h1>
          <p className="text-xs text-amber-400 font-medium tracking-wider">ADMIN PANEL</p>
        </div>
      </div>

      {/* Right: User + Logout */}
      <div className="flex items-center gap-6">
        {/* Optional: Admin Info */}
        <div className="hidden sm:flex items-center gap-3 text-gray-300">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin</p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            setToken("");
            localStorage.removeItem("adminToken");
            window.location.replace("/admin/login");
          }}
          className="group flex items-center gap-3 px-6 py-3 bg-gray-800 hover:bg-red-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-600/20"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-medium tracking-wide">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;