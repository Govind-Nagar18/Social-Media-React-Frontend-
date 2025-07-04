import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-4">MyWebsite</h2>
          <p className="text-sm text-gray-300">
            Build and share your voice with the world. Discover content, connect with people, and express your ideas.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xl font-semibold text-blue-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/post" className="hover:text-white">Create Post</a></li>
            <li><a href="/profile" className="hover:text-white">Profile</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-xl font-semibold text-blue-300 mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="bg-blue-400 p-2 rounded-full hover:bg-blue-500 transition">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-pink-500 p-2 rounded-full hover:bg-pink-600 transition">
              <Instagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-blue-800 p-2 rounded-full hover:bg-blue-900 transition">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </div>
    </footer>
  );
}
