import React from 'react';
import { useAuth } from '../context/authContext';
import AdminSidebar from '../components/dashboard/AdminSidebar';
import Navbar from '../components/dashboard/Navbar';
import { useSidebar } from '../context/SidebarContext'; // ✅ Import sidebar hover state

const AdminDashboard = () => {
  const { user } = useAuth();
  const { isHovered } = useSidebar(); 

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <AdminSidebar />
      <div
        className={`
          flex-1 transition-all duration-300 ease-in-out
          ${isHovered ? 'ml-64' : 'ml-20'}
        `}
      >
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-4">
            Welcome back, {user?.name}
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600">This is your dashboard overview.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
