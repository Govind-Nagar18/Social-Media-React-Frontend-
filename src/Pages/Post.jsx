import React, { useState } from "react";
import { motion } from "framer-motion";
import Axiosinstance from "../axiosinstance";

export default function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [poster, setPoster] = useState(null);

  const api = Axiosinstance;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (poster) {
      formData.append("poster", poster);
    }

    const token = localStorage.getItem("token");

    try {
      const res = await api.post(
        "/post/create/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Post created!");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post.");
    }
    setTitle("");
    setContent("");
    setPoster(null);
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4 py-12">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6"
      >
        <h1 className="text-3xl font-extrabold text-center text-blue-700">
          Create a New Post
        </h1>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="w-full border-2 border-blue-200 focus:border-blue-500 transition-all p-3 rounded-lg shadow-sm focus:outline-none"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post Content"
          className="w-full border-2 border-blue-200 focus:border-blue-500 transition-all p-3 rounded-lg shadow-sm focus:outline-none"
          rows="4"
          required
        />

        <input
          type="file"
          onChange={(e) => setPoster(e.target.files[0])}
          className="w-full border-2 border-blue-200 p-3 rounded-lg shadow-sm focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold p-3 rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        >
          🚀 Create Post
        </button>
      </motion.form>
    </div>
  );
}
