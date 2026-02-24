"use client";

import Image from "next/image";
import Link from "next/link";

export default function CreateAccount() {
  return (
    // Section background stays clean white
    <section className="w-full py-20 bg-white flex justify-center overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6">
        {/* LEFT TEXT SECTION */}
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a2b3c] leading-tight">
            Create a <br /> Cookery <br /> account
          </h2>

          <div className="mt-6 space-y-4 max-w-md">
            <p className="text-gray-600 text-lg leading-relaxed">
              Sign up to CookBook and give it a go for free with a 14-day trial
              or with limited features and recipes.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              Your recipes will be saved safely and securely in our Cloud
              Kitchen, ready to sync across all of your devices!
            </p>
          </div>

          <Link
            href="/signup"
            className="mt-10 inline-block bg-[#00a651] hover:bg-[#008541] text-white font-bold px-10 py-3.5 rounded-full shadow-md transition-all hover:scale-105"
          >
            SIGN UP
          </Link>
        </div>

        {/* RIGHT IMAGE SECTION - Only this area has the color effect */}
        <div className="relative flex justify-center items-center py-10">
          {/* 1. Large soft glow (Mint green color from image 2) */}
          <div className="absolute w-80 h-80 bg-[#e8f7f5] rounded-full blur-3xl opacity-80"></div>

          {/* 2. Defined circular "Plate" background (Matches the style in image 2) */}
          <div className="absolute w-72 h-72 bg-[#f0f9f8] rounded-full border border-white shadow-sm -z-10"></div>

          {/* 3. The Illustration Image */}
          <div className="relative z-10 drop-shadow-xl">
            <Image
              src="/images/createaccount.png"
              alt="CookBook Account Illustration"
              width={380}
              height={380}
              className="w-auto h-auto rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
