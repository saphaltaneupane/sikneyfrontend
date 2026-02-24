"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
// 1. Added icon imports
import { Apple, Play, Globe } from "lucide-react";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const transitionClasses =
    "transition-all duration-1000 cubic-bezier(0.34, 1.56, 0.64, 1)";
  const saladTopStart =
    "transform -translate-y-32 -translate-x-10 opacity-0 rotate-[-20deg] scale-75";
  const saladBottomStart =
    "transform translate-y-32 -translate-x-10 opacity-0 rotate-[20deg] scale-75";
  const watermelonStart =
    "transform translate-x-32 opacity-0 rotate-[15deg] scale-75";
  const endClasses =
    "transform translate-x-0 translate-y-0 opacity-100 rotate-0 scale-100";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: "#e7f7f2" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-28">
        <div
          className={`hidden lg:block absolute -top-10 left-6 w-64 h-64 rounded-full overflow-hidden drop-shadow-lg 
            ${transitionClasses} delay-100 ${isVisible ? endClasses : saladTopStart}`}
        >
          <Image
            src="/images/salad.png"
            alt="plate top left"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div
          className={`absolute -bottom-12 left-6 w-80 h-80 rounded-full overflow-hidden drop-shadow-2xl 
            ${transitionClasses} delay-300 ${isVisible ? endClasses : saladBottomStart}`}
        >
          <Image
            src="/images/salad.png"
            alt="salad"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div
          className={`absolute top-20 right-6 w-60 h-60 md:w-80 md:h-80 overflow-hidden rounded-full drop-shadow-lg 
            ${transitionClasses} delay-500 ${isVisible ? endClasses : watermelonStart}`}
        >
          <Image
            src="/images/watermelongreen.png"
            alt="watermelon"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div
          className={`relative text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight text-gray-900 drop-shadow-sm">
            Start building
            <br />
            <span className="block">your CookBook</span>
          </h1>

          <p className="mt-6 md:mt-8 max-w-2xl mx-auto text-gray-600 text-base md:text-lg">
            Get started, sign up and access all download links and extensions
          </p>

          <div className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <a
              href="#"
              className="flex items-center gap-4 px-4 md:px-6 py-3 md:py-3 bg-black text-white rounded-lg shadow-lg min-w-[220px] hover:scale-105 transition-transform"
            >
              {/* Added Apple Icon */}
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
                <Apple size={20} fill="currentColor" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-70">Download on the</div>
                <div className="font-semibold">App Store</div>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 px-4 md:px-6 py-3 md:py-3 bg-black text-white rounded-lg shadow-lg min-w-[220px] hover:scale-105 transition-transform"
            >
              {/* Added Play Icon */}
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black">
                <Play size={18} fill="currentColor" />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-70">GET IT ON</div>
                <div className="font-semibold">Google Play</div>
              </div>
            </a>

            <Link
              href="/login"
              className="flex items-center gap-4 px-4 md:px-6 py-3 md:py-3 bg-black text-white rounded-lg shadow-lg min-w-[220px] hover:scale-105 transition-transform"
            >
              {/* Added Web/Globe Icon */}
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center text-black">
                <Globe size={20} />
              </div>
              <div className="text-left">
                <div className="text-xs opacity-70">Login to the</div>
                <div className="font-semibold">Web App</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
