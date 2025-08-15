"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../images/logo.svg";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white sm:mx-8 lg:mx-[70px] rounded-[20px] sm:rounded-[30px] lg:rounded-[50px]">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto py-10 sm:py-16 px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-full lg:max-w-md mt-6 lg:mt-[100px]">
              <h3 className="font-bold text-3xl sm:text-4xl lg:text-[64px] leading-tight mb-4">
                Keep up with the latest
              </h3>
              <p className="text-gray-400 text-base sm:text-lg">
                Join our newsletter to stay up to date on features and releases.
              </p>
            </div>

            <div className="w-full lg:w-auto mt-8 lg:mt-[100px]">
              <p className="mb-4 sm:mb-[40px] text-base sm:text-[16px]">Stay up to date</p>
              {!isSubscribed ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto lg:min-w-[400px]"
                >
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <div className="text-green-400 font-semibold text-lg">
                  ✓ Thanks for subscribing!
                </div>
              )}
              <p className="mt-4 sm:mt-[30px] text-sm text-gray-400">
                By subscribing you agree to our Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Image src={logo} alt="SendNow Logo" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
              Secure, instant messaging for the modern world. Connect with confidence.
            </p>
            <div className="flex space-x-4">
              {[...Array(3)].map((_, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883..." /> {/* replace with actual paths */}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="space-y-6 sm:space-y-0 sm:flex sm:flex-col">
            <h4 className="text-lg font-semibold mb-4">Community</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Refer a Friend
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Gift
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Help</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
