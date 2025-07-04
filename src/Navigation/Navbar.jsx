import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Navbar({ setsearchinput }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">MyApp</Link>
        </div>

        {/* Search Input */}
        {token && (
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 w-full md:w-1/3 shadow-sm">
            <Search size={20} className="text-gray-500 mr-2" />
            <input
              type="text"
              onChange={(e) => setsearchinput(e.target.value)}
              placeholder="Search post..."
              className="bg-transparent outline-none w-full text-sm text-gray-700"
            />
          </div>
        )}

        {/* Navigation Links */}
        <ul className="flex flex-wrap gap-4 text-gray-700 font-medium text-sm md:text-base justify-center md:justify-end">
          {token ? (
            <>
              <li>
                <Link
                  to="/"
                  className="hover:text-blue-600 transition duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/post"
                  className="hover:text-blue-600 transition duration-300 ease-in-out"
                >
                  Post
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-blue-600 transition duration-300 ease-in-out"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                  className="hover:text-red-500 transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/signup"
                className="hover:text-blue-600 transition duration-300 ease-in-out"
              >
                Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
