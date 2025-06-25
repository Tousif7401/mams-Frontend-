import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard();
  }, []);
const token=localStorage.getItem('token')
console.log(token)
  const getDashboard = async () => {

    const res = await axios.get(`http://localhost:5000/api/dashboard`,{headers:{
        'token':`Bearer ${token}`
    }});
    console.log(res)
    setData(res.data);
    console.log(res.data)
  };

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1e2d24] text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e2d24] text-white p-6">
      <h1 className="text-3xl font-bold text-center text-[#a3b18a] mb-8">Base Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#3a5a40] p-4 rounded-lg">
          <p className="text-sm text-[#d9ed92]">Opening Balance</p>
          <p className="text-2xl font-semibold">{data.openingBalance}</p>
        </div>

        <div className="bg-[#588157] p-4 rounded-lg">
          <p className="text-sm text-[#d9ed92]">Net Movement</p>
          <p className="text-2xl font-semibold">{data.netMovement}</p>
        </div>

        <div className="bg-[#a3b18a] p-4 rounded-lg text-black">
          <p className="text-sm">Assigned</p>
          <p className="text-2xl font-semibold">{data.assigned}</p>
        </div>

        <div className="bg-[#bc4749] p-4 rounded-lg">
          <p className="text-sm text-white">Expended</p>
          <p className="text-2xl font-semibold">{data.expended}</p>
        </div>

        <div className="bg-[#344e41] p-4 rounded-lg">
          <p className="text-sm text-[#d9ed92]">Closing Balance</p>
          <p className="text-2xl font-semibold">{data.closingBalance}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
