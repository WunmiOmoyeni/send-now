"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../../images/logo.svg";
import { profile } from "console";

export default function VerifyDetails() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      sessionStorage.setItem("name", name);
      sessionStorage.setItem("description", description);

      if (profilePic) {
        const reader = new FileReader();
        reader.onloadend = () => {
          sessionStorage.setItem("profilePic", reader.result as string);
        };
        reader.readAsDataURL(profilePic);
      }

      const accessToken = sessionStorage.getItem("access_token"); // or however you're storing it
      if (!accessToken) {
        throw new Error("No access token found. Please log in again.");
      }

      const profileRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!profileRes.ok) {
        throw new Error("Profile update failed");
      }

      setSuccessMessage("Profile updated successfully ✅");
      router.push("/chat-page");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      {/* Logo */}
      <div className="absolute top-8 left-[60px]">
        <Image
          src={logo}
          alt="logo"
          className="w-24 h-auto sm:w-32 md:w-40 lg:w-[180px]"
        />
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[300px] lg:w-[360px] max-w-md h-auto">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 text-gray-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 
                  2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 
                  5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
            )}
          </div>
          <label className="mt-3 text-sm text-blue-600 cursor-pointer font-[Inter-Regular]">
            Upload Profile Picture
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-[Inter-Regular]">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="lg:w-[300px] border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 font-[Inter-Regular]"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-[Inter-Regular]">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="lg:w-[300px] border border-gray-300 rounded-lg px-4 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 font-[Inter-Regular]"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-[Inter-Regular]">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-600 text-sm font-[Inter-Regular]">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full lg:w-[300px] ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white py-3 rounded-lg transition-all font-[Inter-Regular]`}
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
