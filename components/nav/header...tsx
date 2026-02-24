"use client";

import { useState } from "react";
import Link from "next/link";

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="relative">
      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
        style={{ height: "64px" }} /* adjust height if your nav differs */
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-900">Cookery</div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-orange-500">
              Home
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-orange-500">
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-700 hover:text-orange-500"
            >
              Signup
            </Link>
            <button className="ml-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-2xl text-gray-700">
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
            <div className="flex flex-col space-y-3">
              <Link href="#" onClick={toggleMenu} className="text-gray-700">
                Home
              </Link>
              <Link href="#" onClick={toggleMenu} className="text-gray-700">
                Login
              </Link>
              <Link href="#" onClick={toggleMenu} className="text-gray-700">
                Signup
              </Link>
              <button
                onClick={toggleMenu}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-full"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* SVG Wave that sits *below* the navbar and blends into the hero */}
      <div
        aria-hidden
        className="absolute left-0 right-0 -bottom-1 z-40 pointer-events-none"
        style={{ height: 84 }} /* tweak height to taste */
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* fill matches hero background color below (update if you change hero bg) */}
          <path
            d="M0,32 C160,96 320,0 480,24 C640,48 800,112 960,88 C1120,64 1280,96 1440,72 L1440 160 L0 160 Z"
            fill="#e7f7f2"
          />
        </svg>
      </div>
    </header>
  );
};

export default Nav;
