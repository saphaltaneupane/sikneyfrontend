"use client";

import Image from "next/image";
import Link from "next/link";

export default function RouteLogin() {
  return (
    // Main section stays clean white
    <section className="w-full py-24 bg-white flex justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-6">
        {/* LEFT IMAGE SECTION - Shading effect applied here */}
        <div className="relative flex justify-center items-center order-2 md:order-1">
          {/* 1. Large soft glow (Mint green shading from your reference) */}
          <div className="absolute w-80 h-80 bg-[#e8f7f5] rounded-full blur-[60px] opacity-80"></div>

          {/* 2. Soft circular base (Mimicking the 'plate' style) */}
          <div className="absolute w-72 h-72 bg-[#f0f9f8] rounded-full border border-white/50 shadow-sm -z-10"></div>

          {/* 3. The Image */}
          <div className="relative z-10 transition-transform duration-500 hover:scale-105">
            <Image
              src="/images/login.png"
              alt="Cookery Web App Illustration"
              width={380}
              height={380}
              className="w-auto h-auto drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* RIGHT TEXT SECTION */}
        <div className="order-1 md:order-2">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#1a2b3c] leading-[1.1] tracking-tight">
            Bookmark the <br />
            <span className="text-gray-900">Web App</span>
          </h2>

          <div className="mt-8 max-w-md">
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Experience ultimate convenience with the fully-featured Cookery
              Web App, accessible directly from your browser.
            </p>
          </div>

          <Link
            href="/login"
            className="mt-10 inline-block bg-[#1a2b3c] hover:bg-green-700 text-white font-bold px-10 py-4 rounded-full shadow-lg transition-all transform active:scale-95"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </section>
  );
}
