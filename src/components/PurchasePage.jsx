import React, { useState, useEffect } from "react";
import axios from "axios";

export const PurchasePage = ({ user }) => {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    asset_id: "",
    quantity: ""
  });

  useEffect(() => {
    getAssets();
  }, []);

  const getAssets = async () => {
    const res = await axios.get("http://localhost:5000/assets");
    console.log(assets,res.data)
    setAssets(res.data);
  };
// const getUser = async ()=>{
//   const user=await axios.get("/userinfo",{headers:{
//     Authorization:q
//   }})
// }
  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      // base_id: user.base_id,
      asset_id: parseInt(formData.asset_id),
      quantity: parseInt(formData.quantity)
    };
    const token=localStorage.getItem("token")
    console.log(token)
    console.log(localStorage.getItem("token"))
    const res = await axios.post("http://localhost:5000/api/purchase", payload, {
      headers: {
        token: `Bearer ${token}`
      }
    });
    console.log(res)
    alert("Purchase added");
    setFormData({ asset_id: "", quantity: "" });
  };

  return (
    <div className="min-h-screen bg-[#1e2d24] text-white p-6">
      <h2 className="text-2xl font-bold text-[#a3b18a] mb-6">Purchase Asset</h2>

      <form
        onSubmit={submit}
        className="bg-[#3a5a40] p-6 rounded-lg w-full max-w-md space-y-4"
      >
        <div>
          <label className="block mb-1">Asset Type</label>
          <select
            name="asset_id"
            value={formData.asset_id}
            onChange={(e) =>
              setFormData({ ...formData, asset_id: e.target.value })
            }
            className="w-full p-2 rounded text-black"
            required
          >
            <option value="">Select Asset</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.type})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            className="w-full p-2 rounded text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-[#6a994e] text-white px-4 py-2 rounded hover:bg-[#52796f]"
        >
          Record Purchase
        </button>
      </form>
    </div>
  );
};

export default PurchasePage;
