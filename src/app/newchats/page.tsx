"use client";

import { useEffect, useState } from "react";
import { LucideGroup, Plus } from "lucide-react";
import Image from "next/image";

type Contact = {
  id: string;
  contact: string;
  contact_id: string;
};

export default function NewChat() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/saved/contacts?page=1&page_size=20`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data = await res.json();
        console.log("Contacts API Response:", data);
        setContacts(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occured");
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  return (
    <div className="flex flex-col lg:border lg:border-[#18B1FF4D] rounded-xl bg-white h-[80vh]  p-4 sm:p-5 w-full max-w-md md:max-w-[50vw] lg:max-w-[70vw]">
      <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">New Chats</h2>

      {/* Buttons */}
      <div className="space-y-2 mb-6 ">
        <button className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-gray-50 transition-colors bg-[#18B1FF0D]">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#18B1FF] rounded-full flex items-center justify-center text-white text-base sm:text-lg">
            <LucideGroup/>
          </div>
          <span className="font-[Inter-Regular] text-gray-900 text-sm sm:text-base">New group</span>
        </button>

        <button className="flex items-center space-x-3 p-3 rounded-lg w-full hover:bg-gray-50 transition-colors bg-[#18B1FF0D]">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#18B1FF] rounded-full flex items-center justify-center text-white text-base sm:text-lg">
            <Plus/>
          </div>
          <span className="font-medium text-gray-900 text-sm sm:text-base">New Contact</span>
        </button>
      </div>

      {/* Contacts */}
      <h3 className="text-xs sm:text-sm text-gray-500 mb-2">Saved Contacts</h3>
      <div className="space-y-3 max-h-[50vh] sm:max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {loading ? (
          <p className="text-gray-500 text-center mt-6">Loading contacts...</p>
        ) : error ? (
          <p className="text-red-500 text-center mt-6">{error}</p>
        ) : contacts.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No contacts found</p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Profile Picture */}
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-300 flex-shrink-0">
                <Image
                  src="/default-user.png"
                  alt={`Profile picture of ${contact.contact}`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Contact Info */}
              <div className="flex flex-col">
                <p className="font-medium text-gray-900">{contact.contact}</p>
                <p className="text-xs text-gray-500">{contact.contact_id}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
