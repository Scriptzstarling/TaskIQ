import React, { useState } from "react";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      await axios.post(`/auth/reset-password/${token}`, { password });
      setMsg("Password reset successful! You can now login.");
    } catch (err) {
      setMsg("Password reset failed or link expired.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="New Password"
        className="mb-3 w-full border rounded px-3 py-2"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Reset Password</button>
      {msg && <div className="mt-2 text-green-600">{msg}</div>}
    </form>
  );
}
