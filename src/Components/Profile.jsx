import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axiosinstance from "../axiosinstance";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [MyPost, setMyPost] = useState([]);
  const [edit, setedit] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const api = Axiosinstance;
  const baseURL = api.defaults.baseURL;

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const Getpost = async () => {
      try {
        const response = await api.get("/post/myposts/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyPost(response.data);
      } catch (error) {
        console.error("Error fetching my posts:", error);
        alert("Failed to fetch your posts. Please try again later.");
      }
    };

    const fetchData = async () => {
      try {
        const res = await api.get("/register/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to fetch profile data. Please login again.");
        navigate("/login");
      }
    };

    Getpost();
    fetchData();
  }, [token, navigate]);

  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await api.delete(`/post/myposts/${postId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyPost((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again later.");
      }
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.target[0].value);
    formData.append("content", e.target[1].value);
    if (e.target[2].files[0]) {
      formData.append("poster", e.target[2].files[0]);
    }

    try {
      const response = await api.put(`/post/myposts/${edit}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMyPost((prevPosts) =>
        prevPosts.map((post) => (post.id === edit ? response.data : post))
      );
      setedit(null);
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start mt-8 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Welcome to Your Profile</h1>

      {user ? (
        <>
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg text-center mb-8">
            <img
              src={`${baseURL}/${user.image}`}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-200"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">{user.username}</h2>
            <p className="text-gray-600 mt-1">Email: {user.email}</p>
            <p className="text-gray-600">Phone: {user.phone}</p>
            <button
              onClick={handlelogout}
              className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          <div className="w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">My Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MyPost.length === 0 ? (
                <p className="text-gray-600 text-center col-span-2">No posts available.</p>
              ) : (
                MyPost.map((post) => (
                  <div key={post.id} className="bg-white p-4 rounded-xl shadow-md">
                    {edit === post.id ? (
                      <form onSubmit={handleUpdatePost} className="space-y-3">
                        <h3 className="text-lg font-semibold">Edit Post</h3>
                        <input
                          type="text"
                          defaultValue={post.title}
                          className="w-full border p-2 rounded"
                          placeholder="Post Title"
                        />
                        <textarea
                          defaultValue={post.content}
                          className="w-full border p-2 rounded"
                          rows="4"
                          placeholder="Post Content"
                        />
                        <input
                          type="file"
                          className="w-full border p-2 rounded"
                        />
                        <div className="flex gap-3">
                          <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            onClick={() => setedit(null)}
                            className="flex-1 bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3 className="text-xl font-semibold text-blue-700">{post.title}</h3>
                        <p className="text-gray-600 mb-2">{post.content}</p>
                        <img
                          src={`${baseURL}/${post.poster}`}
                          alt="Post Poster"
                          className="w-full h-48 object-cover rounded mb-2"
                        />
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={`${baseURL}/${post.user.image}`}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium">{post.user.username}</p>
                            <p className="text-sm text-gray-500">{post.user.email}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={() => setedit(post.id)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center">Loading profile...</p>
      )}
    </div>
  );
}
