import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Axiosinstance from "../axiosinstance";

export default function Home({ debouncesearch }) {
  const [allpost, setAllPost] = useState([]);
  const [displaycomment, setDisplayComment] = useState(null);
  const [allcomment, setAllComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [filterdata, setfilterdata] = useState([]);
  const token = localStorage.getItem("token");

  const api = Axiosinstance;
  const baseURL = api.defaults.baseURL;


  const Getdata = async () => {
    try {
      const res = await api.get("/post/allpost/");
      setAllPost(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to load posts.");
    }
  };

  const handleLike = async (id) => {
    try {
      const res = await api.post(
        `/post/like/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
    } catch (err) {
      console.log("Like Error:", err);
      alert("Failed to like/unlike post");
    }
    Getdata();
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      await api.post(
        `/post/comment/${postId}/`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Comment added!");
      setNewComment("");
      setSelectedPostId(null);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to comment.");
    }
    Getdata();
  };

  useEffect(() => {
    Getdata();
  }, []);

  useEffect(() => {
    const searchdata = allpost.filter((post) =>
      post.title
        .toLowerCase()
        .includes(
          debouncesearch.toLowerCase() ||
            post.content.toLowerCase().includes(debouncesearch.toLowerCase())
        )
    );
    setfilterdata(searchdata);
  },[debouncesearch, allpost]);

  return (
    <div className="min-h-screen bg-gradient-to-tr mt-9 from-blue-50 to-gray-100 p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Welcome to the Home Page
        </h1>
        <p className="text-gray-600">
          Explore posts, like and share your thoughts!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filterdata.length > 0 ? (
          filterdata.map((post, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3">
              <img
                src={`${baseURL}/${post.user.image}`}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {post.user.username}
                </p>
                <p className="text-sm text-gray-500">{post.user.email}</p>
              </div>
            </div>
            <h2 className="mt-4 font-semibold text-lg text-blue-600">
              {post.title}
            </h2>
            <p className="text-gray-700 mb-2">{post.content}</p>
            {post.poster && (
              <img
                src={`${baseURL}/${post.poster}`}
                alt="Post"
                className="w-full h-48 object-cover rounded-lg mb-3 "
              />
            )}
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => handleLike(post.id)}
                className="text-blue-600 hover:underline"
              >
                ❤️ Likes {post.likes_count}
              </button>
              <button
                onClick={() => setSelectedPostId(post.id)}
                className="text-green-600 hover:underline"
              >
                💬 Add Comment
              </button>
              <button
                onClick={() => setDisplayComment(post.id)}
                className="text-purple-600 hover:underline"
              >
                👀 Show Comments
              </button>
            </div>

            {selectedPostId === post.id && (
              <form
                onSubmit={(e) => handleCommentSubmit(e, post.id)}
                className="flex flex-col gap-2"
              >
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment..."
                  className="border rounded px-3 py-2 w-full"
                />
                <div className="flex gap-5">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                  <button
                    onClick={() => setSelectedPostId(null)}
                    type="submit"
                    className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700"
                  >
                    Cancle
                  </button>
                </div>
              </form>
            )}

            {displaycomment === post.id && (
              <div className="mt-3">
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((cmt, idx) => (
                    <div key={idx} className="bg-gray-100 rounded p-2 mb-1">
                      <p className="text-sm font-semibold">
                        {cmt.user.username}
                      </p>
                      <p className="text-gray-700 text-sm">{cmt.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No comments yet.</p>
                )}
                <button
                  onClick={() => setDisplayComment(null)}
                  className="text-sm text-red-500 mt-2 hover:underline"
                >
                  Hide Comments
                </button>
              </div>
            )}
          </motion.div>
        ))
        ):(
          
          <p>No posts available.</p>
          
        )}
      </div>

      <div className="grid grid-cols-1 mt-5 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {allpost.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No posts available.
          </p>
        ) : (
          allpost.map((post, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={`${baseURL}/${post.user.image}`}
                  alt="User Avatar"
                  className="w-12 h-12 border-2 border-blue-200 p-1 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {post.user.username}
                  </p>
                  <p className="text-sm text-gray-500">{post.user.email}</p>
                </div>
              </div>
              <h2 className="mt-4 font-semibold text-lg text-blue-600">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-2">{post.content}</p>
              {post.poster && (
                <img
                  src={`${baseURL}/${post.poster}`}
                  alt="Post"
                  className="w-full h-48 border-2 border-blue-200 object-cover p-1 rounded-lg mb-3"
                />
              )}
              <div className="flex flex-wrap gap-2 mb-2">
                <button
                  onClick={() => handleLike(post.id)}
                  className="text-blue-600 hover:underline"
                >
                  ❤️ Likes {post.likes_count}
                </button>
                <button
                  onClick={() => setSelectedPostId(post.id)}
                  className="text-green-600 hover:underline"
                >
                  💬 Add Comment
                </button>
                <button
                  onClick={() => setDisplayComment(post.id)}
                  className="text-purple-600 hover:underline"
                >
                  👀 Show Comments
                </button>
              </div>

              {selectedPostId === post.id && (
                <form
                  onSubmit={(e) => handleCommentSubmit(e, post.id)}
                  className="flex flex-col gap-2"
                >
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    className="border rounded px-3 py-2 w-full"
                  />
                  <div className="flex gap-5">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setSelectedPostId(null)}
                      type="submit"
                      className="bg-blue-600 text-white rounded px-4 py-1 hover:bg-blue-700"
                    >
                      Cancle
                    </button>
                  </div>
                </form>
              )}

              {displaycomment === post.id && (
                <div className="mt-3">
                  {post.comments && post.comments.length > 0 ? (
                    post.comments.map((cmt, idx) => (
                      <div key={idx} className="bg-gray-100 rounded p-2 mb-1">
                        <p className="text-sm font-semibold">
                          {cmt.user.username}
                        </p>
                        <p className="text-gray-700 text-sm">{cmt.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No comments yet.</p>
                  )}
                  <button
                    onClick={() => setDisplayComment(null)}
                    className="text-sm text-red-500 mt-2 hover:underline"
                  >
                    Hide Comments
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}