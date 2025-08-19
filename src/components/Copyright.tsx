import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Copyright() {
  return (
    <div className="w-full px-6 py-6 md:py-8 bg-white">
      <div className="max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Left Side */}
        <div className="text-sm md:text-base text-gray-600 font-[Inter-Regular]">
          © 2025 SendNow. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex justify-center md:justify-end space-x-4">
          <a
            href="#"
            className="bg-[#18B1FF] p-2 rounded-full text-white hover:opacity-80 transition"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="#"
            className="bg-[#18B1FF] p-2 rounded-full text-white hover:opacity-80 transition"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="#"
            className="bg-[#18B1FF] p-2 rounded-full text-white hover:opacity-80 transition"
          >
            <FaTwitter size={18} />
          </a>
          <a
            href="#"
            className="bg-[#18B1FF] p-2 rounded-full text-white hover:opacity-80 transition"
          >
            <FaLinkedinIn size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
