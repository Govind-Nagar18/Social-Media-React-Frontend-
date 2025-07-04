import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axiosinstance from '../axiosinstance';

export default function Signup() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const api = Axiosinstance;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", name);
    formData.append("password", password);

    try {
      const res = await api.post("/register/login/", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { access } = res.data;
      localStorage.setItem("token", access);
      alert("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">Fill out the form to get started.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
           Login
          </button>
        </form>
      <button onClick={() => navigate("/signup")} className="mt-4 text-blue-600 hover:underline">
        Signup
      </button>
      </div>
    </div>
  );
}
