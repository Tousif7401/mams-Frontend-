import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import { PurchasePage } from "./components/PurchasePage";
import { Transfer } from "./components/Transfer";
import { TransferForm } from "./components/TransferForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/Sidebar";
import AboutUs from "./components/Aboutus";

export default function App() {
  return (
      <Routes>
        {/* Routes without sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />

        {/* Routes with sidebar */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/transferform" element={<TransferForm />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/AboutUs" element={<AboutUs />} />
        </Route>
      </Routes>
  );
}
