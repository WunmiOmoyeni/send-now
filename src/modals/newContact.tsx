"use client";

import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import React, { useState } from "react";
import { X } from "lucide-react";

type Contact = {
  contact_id: string;
  phone: string;
  fullName: string;
};

interface NewContactModalProps {
  open: boolean;
  onClose: () => void;
}

const NewContactModal: React.FC<NewContactModalProps> = ({ open, onClose }) => {
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!phone || !fullName) {
      alert("Please enter phone number and full name");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/saved/contacts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            contact_id: phone,
          }),
        }
      );

      const data = await res.json();
      console.log("New Contact", data);

      if (data.id) {
        const contactRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/saved/contact/${data.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        );
        const contactData = await contactRes.json();
        console.log("Newly Created Contact :", contactData);
      } else {
        console.warn("No id in POST response, refreshing contacts...");
      }

      setPhone("");
      setFullName("");
      onClose();
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Error saving contact");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-evenly bg-black/40 backdrop-blur-sm  animate-fadeIn">
      {/* Modal Box */}
      <div className="bg-white rounded-xl w-[90%] sm:w-full max-w-[30vw] p-10 shadow-xl transform transition-all scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            New Contact
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Phone */}
        <div className="mb-7">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Phone No
          </label>
          <div className="flex gap-2">
            {/* Flag Section */}
            <div className="flex items-center w-[70px] px-3 border border-[#18B1FF3B] rounded-lg">
              <PhoneInput
                country={"ng"}
                value={phone}
                onChange={(value, country: any) => {
                  // Ensure phone starts with correct prefix
                  if (!value.startsWith(`+${country.dialCode}`)) {
                    setPhone(`+${country.dialCode} `);
                  } else {
                    setPhone(value);
                  }
                }}
                enableSearch={false}
                disableDropdown={false}
               inputClass="!hidden" buttonClass="!border-none" containerClass="!flex !items-center justify-center !gap-2 !bg-transparent"
              />
            </div>

            {/* Number Input */}
            <input
              type="tel"
              placeholder="+234 ..."
              value={phone}
              onChange={(e) => {
                // Prevent removing the country prefix
                const input = e.target.value;
                const match = input.match(/^\+\d+/);
                if (match) {
                  setPhone(input);
                } else {
                  // fallback: if user deletes prefix, restore it
                  const currentCountryPrefix =
                    phone.match(/^\+\d+/)?.[0] || "+234";
                  setPhone(`${currentCountryPrefix} `);
                }
              }}
              className="flex-1 border border-[#18B1FF3B] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#18B1FF]"
            />
          </div>
        </div>

        <hr className="border-0 h-[1px] mb-6 bg-[#18B1FF3B]" />

        {/* Full Name */}
        <div className="mb-10">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-[#18B1FF3B] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#18B1FF]"
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-3 bg-[#18B1FF0D] p-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`flex-1 bg-[#18B1FF] text-white py-4 rounded-[50px] transition-all ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-[#1396d9]"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-[#18B1FF3B] py-2 rounded-[50px] hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContactModal;
