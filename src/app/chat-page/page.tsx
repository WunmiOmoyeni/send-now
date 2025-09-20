"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../images/logo.svg";

export default function ChatPage() {
  const [profile, setProfile] = useState<{
    name: string;
    picture: string;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = sessionStorage.getItem("access_token");
      if (!accessToken) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.name,
          picture: data.profile_picture
            ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.profile_picture}`
            : "",
        });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-[Inter-Regular]">
      <div className="w-full flex justify-center py-4">
        <div className="w-full max-w-7xl px-6">
          <Image src={Logo} alt="logo" className="w-56 h-10 object-contain" />
        </div>
      </div>

      {/*Main Layout */}
      <div className="flex flex-1 justify-center ">
        <div className="w-full  flex">
          {/* Sidebar */}
          <div className="w-16 flex flex-col items-center py-4 space-y-4 h-[80vh] mr-5">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </div>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors bg-gray-100">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </div>
            </button>

            <div className="flex-1" />

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v11z" />
                </svg>
              </div>
            </button>

            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 mt-2">
              <img
                src={profile?.picture || "/default-user.png"} // fallback if no pic
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="w-64 bg-white border border-[#18B1FF4D] rounded-xl flex flex-col mr-5 h-[80vh]">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search or Start a new chat"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-[12px]"
                />
              </div>
            </div>

            <div className="px-4 pb-4">
              <button className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 bg-[#18B1FF] rounded-full flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
                <div className="text-left">
                  <div className="font-medium text-gray-900 text-[15px]">
                    Start a new chat
                  </div>
                  <div className="text-xs text-gray-500 text-[10px]">
                    With Family or Friend
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center border border-[#18B1FF4D] rounded-xl bg-white h-[80vh] max-w-[80vw]">
            <div className="flex items-center justify-center w-56 mb-6">
              <Image
                src={Logo}
                alt="SendNow Logo"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-gray-500 text-center max-w-sm text-sm leading-relaxed">
              Real-time conversations, media sharing, and smart features to keep
              communication smooth and intuitive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
