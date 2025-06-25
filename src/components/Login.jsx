import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const { register, handleSubmit } = useForm();
const navigate=useNavigate()
  const onSubmit = async (data) => {
    console.log("this is the dayas")
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    console.log(res)
    if(res){

    
    const result = await res.json();
    console.log("this is the post request",result)
    console.log(result)
    localStorage.setItem("token", result.token);
    alert("Logged in");
    navigate('/Dashboard')
    }else{
      alert('invalid creds')
    }
    } catch (error) {
        alert("invalid creds")
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f3e46] px-4">
      <div className="w-full max-w-md bg-[#354f52] rounded-xl shadow-xl p-8">
        <h2 className="text-2xl text-center font-bold text-[#dad7cd] mb-6">Military Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-[#cad2c5] text-black"
          />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-[#cad2c5] text-black"
          />
          <button type="submit" className="w-full bg-[#52796f] text-white py-2 rounded">
            Login
          </button>
        </form>
         <div className="flex items-center justify-center text-center mt-5 text-white">
          <h4>New User? <a onClick={()=>{navigate('/')}} className="cursor-pointer text-green-300">Register</a></h4>
            </div>
      </div>
    </div>
  );
}
