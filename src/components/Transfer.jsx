import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Clock, ArrowLeftRight, CheckCircle, Loader2 } from 'lucide-react';

export const Transfer= () => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    fetchTransfers();
  }, []);

  const fetchTransfers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transfer/');
      console.log("thisi",res)
      setTransfers(res.data);
    } catch (err) {
      console.error('Failed to fetch transfers:', err);
    } finally {
      console.log("This is fine")
    }
  };

  const processTransfer = async (id) => {
    try {
      fetchTransfers(); // Refresh list
    } catch (err) {
      console.error('Failed to process transfer:', err);
    }
  };
  console.log(transfers)

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
        
        <span>Manage Transfer Requests</span>
      </h2>

      
        
      
        <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden">
          <table className="w-full text-white table-auto">
            <thead className="bg-slate-800 text-left">
              <tr>
                <th className="p-3">From</th>
                <th className="p-3">To</th>
                <th className="p-3">Asset</th>
                <th className="p-3">Qty</th>
                <th className="p-3">Status</th>
                
              </tr>
            </thead>
            <tbody>
              {transfers.map((transfer) => (
                <tr key={transfer.id} className="border-t border-white/10">
                  <td className="p-3">{transfer.from_base_id}</td>
                  <td className="p-3">{transfer.to_base_id}</td>
                  <td className="p-3">{transfer.asset_id}</td>
                  <td className="p-3">{transfer.quantity}</td>
                  <td className="p-3">
                    {transfer.status === 'requested' && <span className="text-yellow-400">Requested</span>}
                    {transfer.status === 'transferred' && <span className="text-blue-400">Transferred</span>}
                    {transfer.status === 'accepted' && <span className="text-green-400">Accepted</span>}
                  </td>
                  <td className="p-3">
                    {transfer.status === 'requested' ? (
                      <button
                        onClick={() => processTransfer(transfer.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm"
                      >
                        Mark as Transferred
                      </button>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </div>
  );
};
