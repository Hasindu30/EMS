import React from 'react';
import { useAuth } from '../../context/authContext';
import { useSidebar } from '../../context/SidebarContext'; // ✅ Import sidebar context

const Navbar = () => {
  const { user } = useAuth();
  const { isHovered } = useSidebar(); // ✅ Access hover state

  return (
    <div
      className={`fixed top-0 right-0 z-30 h-16 bg-white shadow-sm border-b
        flex items-center justify-between px-6 transition-all duration-300
        ${isHovered ? 'ml-64 w-[calc(100%-16rem)]' : 'ml-20 w-[calc(100%-5rem)]'}
      `}
    >
      <div className="flex items-center gap-4">
        <p className="text-gray-700 font-medium">Welcome, {user?.name}</p>
      </div>
      <div>
        <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
