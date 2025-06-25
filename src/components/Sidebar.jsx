import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const SidebarLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex h-screen font-[Product Sans]">
      {/* Sidebar */}
      <div className="w-[220px] bg-[#1b4332] text-[#d8f3dc] p-5">
        <h2 className="text-xl font-bold mb-10">Military Resources</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="text-[#95d5b2] text-base hover:underline">Dashboard</Link>
          <Link to="/purchase" className="text-[#95d5b2] text-base hover:underline">Purchase</Link>
          <Link to="/transferform" className="text-[#95d5b2] text-base hover:underline">Transfer Request</Link>
          <Link to="/Transfer" className="text-[#95d5b2] text-base hover:underline">Tranfer Status</Link>
          <Link to="/AboutUs" className="text-[#95d5b2] text-base hover:underline">About Us</Link>

          <button
            onClick={handleLogout}
            className="mt-6 bg-[#40916c] text-white px-4 py-2 rounded hover:bg-[#2d6a50]"
          >
            Logout
          </button>
        </nav>
      </div>

     
      <div className="flex-1 bg-black text-white p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold text-[#95d5b2]">Military Resources Management</h1>
        <hr className="my-4 border-gray-600" />
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
