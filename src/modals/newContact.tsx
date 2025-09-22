"use client";

import React, { useState } from "react";
import { X, ChevronDown } from "lucide-react";

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
        const contactRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/saved/contact/${data.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            }
        });
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">New Contact</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Phone No</label>
          <input
            type="tel"
            placeholder="+234 ..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#18B1FF]"
          />
        </div>

        {/* Full Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#18B1FF]"
          />
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-[#18B1FF] text-white py-2 rounded-xl hover:bg-[#1396d9] transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContactModal;
