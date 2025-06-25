import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const TransferForm = () => {
  const [bases, setBases] = useState([]);
  const [assets, setAssets] = useState([]);
  const [transfers, setTransfers] = useState([]);
 const token=localStorage.getItem("token")
 console.log("this is the token in the transfer",token)


  const [form, setForm] = useState({
    from_base_id: '',
    to_base_id: '',
    asset_id: '',
    quantity: ''
  });

  const [transferId, setTransferId] = useState('');
  const [message, setMessage] = useState('');
  const [toBase,setTobase]=useState('')

  useEffect(() => {
    getBases();
    getAssets();
    getTransfers();
    getbase()
  }, []);

  const getBases = async () => {
    console.log("this is the base")
    const res = await axios.get('https://mams-backend-ewub.onrender.com/bases');
    setBases(res.data);
    
  };

  const getAssets = async () => {
    const res = await axios.get('http://localhost:5000/assets');
    setAssets(res.data);
    console.log(res.data)
  };

  const getTransfers = async () => {
    console.log("this is the transfer")
    const res = await axios.get('http://localhost:5000/assets');
    setTransfers(res.data || []);
  };    
  const getbase=async()=>{

        const res =await axios.get('http://localhost:5000/getuserinfo',{headers: {'token':`Bearer ${token}`}})
        console.log("this is the getbase")
        setTobase(res.data)

  }

  const handleRequest = async (e) => {
    console.log("this is handling")
    e.preventDefault();
    console.log(form,"ths isasdbahvhj ")
    if (!form.from_base_id || !toBase || !form.asset_id || !form.quantity) return;

    try {
      await axios.post('http://localhost:5000/api/transfer/request', {
        ...form,
        quantity: parseInt(form.quantity),
        to_base_id:parseInt(toBase)
      },{headers:{token: `Bearer ${token}`}});
      setForm({ from_base_id: '', to_base_id: toBase, asset_id: '', quantity: '' });
      setMessage('Transfer requested.');
      getTransfers();
    } catch {
      setMessage('Error requesting transfer.');
    }
  };

  const handleProcess = async (e) => {
    e.preventDefault();
    if (!transferId) return;

    try {
      await axios.post('/api/transfer/process', { transfer_id: parseInt(transferId) });
      setTransferId('');
      setMessage('Transfer marked as done.');
      getTransfers();
    } catch {
      setMessage('Error processing transfer.');
    }
  };

  return (
    <div className="space-y-6 bg-black">
      <h2 className="text-2xl text-white font-bold">Asset Transfers</h2>

      {message && (
        <div className="p-3 bg-white/10 text-white border border-white/20 rounded-lg">{message}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Request Transfer */}
        <form onSubmit={handleRequest} className="bg-white/10 p-5 rounded-xl border border-white/20 space-y-4">
          <h3 className="text-white text-lg font-medium">Request Transfer</h3>

          <select name="from_base_id" value={form.from_base_id} onChange={e => setForm({ ...form, from_base_id: e.target.value })}
            className="w-full bg-black text-white  p-3 rounded-lg">
            <option value="">From Base</option>
            {bases.map((b) => (
              <option key={b.id} value={b.id}>{b.id}</option>
            ))}
          </select>
            
          <select name="to_base_id" 
            className="w-full bg-black text-white p-3 rounded-lg">
            <option value="">{toBase}</option>
           
          </select>

          <select name="asset_id" value={form.asset_id} onChange={e => setForm({ ...form, asset_id: e.target.value })}
            className="w-full bg-black text-white p-3 rounded-lg">
            <option value="">Asset</option>
            {assets.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          <input type="number" name="quantity" value={form.quantity}
            onChange={e => setForm({ ...form, quantity: e.target.value })}
            placeholder="Quantity"
            className="w-full bg-black text-white p-3 rounded-lg" />

          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg">Request Transfer</button>
        </form>

       
        <form onSubmit={handleProcess} className="bg-white/10 p-5 rounded-xl border border-white/20 space-y-4">
          <h3 className="text-white text-lg font-medium">Mark as Transferred</h3>

          <select value={transferId} onChange={e => setTransferId(e.target.value)}
            className="w-full bg-black text-white p-3 rounded-lg">
            <option value="">Pending Transfers</option>
            {transfers.filter((t) => t.status === 'requested').map((t) => (
              <option key={t.id} value={t.id}>
                ID: {t.id} - {t.asset_id} from {t.from_base_id} to {t.to_base_id}
              </option>
            ))}
          </select>

          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg">Mark Transferred</button>
        </form>
      </div>

     
      <div className="bg-white/10 p-5 rounded-xl border border-white/20">
        <h3 className="text-white text-lg font-semibold mb-3">Transfers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-white">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-2">Asset ID</th>
                <th className="p-2">From</th>
                <th className="p-2">To</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map((t) => (
                <tr key={t.id} className="border-b border-white/10">
                  <td className="p-2">{t.asset_id}</td>
                  <td className="p-2">{t.from_base_id}</td>
                  <td className="p-2">{t.to_base_id}</td>
                  <td className="p-2">{t.quantity}</td>
                  <td className="p-2">{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
