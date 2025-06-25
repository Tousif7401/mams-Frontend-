import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const { register, handleSubmit } = useForm();
const navigate=useNavigate()
  const onSubmit = async (data) => {
    
    const result = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    
        if(result.status==201){
             navigate('/Login') 
        }
      
   
    
  };

  return (
    <div className="min-h-screen w-[100%] flex items-center justify-center bg-[#2f3e46] px-4">
      <div className=" bg-[#354f52] rounded-xl shadow-xl p-8">
        <h2 className="text-2xl text-center font-bold text-[#dad7cd] mb-6">Register New User</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="px-4 py-2 rounded bg-[#cad2c5] text-black"
          />
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="px-4 py-2 rounded bg-[#cad2c5] text-black"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="px-4 py-2 rounded bg-[#cad2c5] text-black"
          />
          <select
            {...register("role")}
            className="px-4 py-2 rounded bg-[#cad2c5] text-black"
          >
            <option value="">Select Role</option>
            <option value="admin">admin</option>
            <option value="commander">commander</option>
            <option value="logistics">logistics Officer</option>
          </select>
          <input
            type="number"
            {...register("base_id")}
            placeholder="Base ID"
            className="px-4 py-2 rounded bg-[#cad2c5] text-black"
          />
          <button
            type="submit"
            className="col-span-2 w-full bg-[#52796f] text-white py-2 rounded"
          >
            Register
          </button>
          
        </form>
        <div className="flex items-center justify-center text-center mt-5 text-white">
          <h4>Already have an account? <a onClick={()=>{navigate('/Login')}} className="cursor-pointer text-green-300">Login</a></h4>
            </div>
      </div>
    </div>
  );
}
