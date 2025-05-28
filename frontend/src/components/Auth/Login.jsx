import React, { useState } from "react";
import axios from "../../api/axios";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      setMsg("Login successful!");
      if (onLogin) onLogin();
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="mb-3 w-full border rounded px-3 py-2"
        required
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        className="mb-3 w-full border rounded px-3 py-2"
        required
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      {msg && <div className="mt-2 text-red-500">{msg}</div>}
    </form>
  );
}
