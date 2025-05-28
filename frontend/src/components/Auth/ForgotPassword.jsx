import React, { useState } from "react";
import axios from "../../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      await axios.post("/auth/forgot-password", { email });
      setMsg("If this email is registered, a reset link will be sent.");
    } catch {
      setMsg("Error sending reset email.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-3 w-full border rounded px-3 py-2"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Send Reset Link</button>
      {msg && <div className="mt-2 text-green-600">{msg}</div>}
    </form>
  );
}
