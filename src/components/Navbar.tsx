"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../images/logo.svg";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <nav className="w-full max-w-[1400px] mx-auto flex justify-between items-center py-4 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-white via-white/80 to-transparent lg:rounded-[40px] relative">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Image
            src={logo}
            alt="logo"
            className="w-[120px] h-[32px] sm:w-[150px] sm:h-[40px] lg:w-[180px] lg:h-[50px] xl:w-[215px] xl:h-[60px]"
            priority
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center justify-end flex-1 font-[Inter-Regular]">
          <div className="flex items-center space-x-6 xl:space-x-8 2xl:space-x-12">
            <a
              href="#"
              className="text-lg xl:text-xl 2xl:text-[25px] font-medium hover:font-semibold transition-all duration-200 whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="#"
              className="text-lg xl:text-xl 2xl:text-[25px] font-medium hover:font-semibold transition-all duration-200 whitespace-nowrap"
            >
              About
            </a>
            <a
              href="#"
              className="text-lg xl:text-xl 2xl:text-[25px] font-medium hover:font-semibold transition-all duration-200 whitespace-nowrap"
            >
              Contact
            </a>
            <a
              href="#faq"
              className="text-lg xl:text-xl 2xl:text-[25px] font-medium hover:font-semibold transition-all duration-200 whitespace-nowrap"
            >
              FAQ
            </a>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden z-50 flex-shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 bg-white flex flex-col justify-center items-center space-y-6 text-center z-40">
            <a
              href="#"
              className="border-[0.5px] border-[rgba(24,177,255,0.23)] w-full py-4 text-[25px] mx-auto font-medium hover:font-semibold transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#"
              className="border-[0.5px] border-[rgba(24,177,255,0.23)] w-full py-4 text-[25px] font-medium hover:font-semibold transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#"
              className="border-[0.5px] border-[rgba(24,177,255,0.23)] w-full py-4 text-[25px] font-medium hover:font-semibold transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="#faq"
              className="border-[0.5px] border-[rgba(24,177,255,0.23)] w-full py-4 text-[25px] font-medium hover:font-semibold transition-all duration-200"
              onClick={() => setMenuOpen(false)}
            >
              FAQ
            </a>
          </div>
        )}
      </nav>
    </div>
  );
}