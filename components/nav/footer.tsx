"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* TOP SECTION: 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* BRAND COLUMN */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-3xl font-bold text-white tracking-tight"
            >
              Cookery<span className="text-[#00a651]">.</span>
            </Link>
            <p className="mt-6 text-white text-lg leading-relaxed">
              Your digital kitchen companion. Organize, discover, and share your
              favorite recipes with ease.
            </p>
          </div>

          {/* STAY INSPIRED COLUMN */}
          <div className="md:text-right">
            <h4 className="text-xl font-bold text-white mb-4">Stay Inspired</h4>
            <p className="text-white text-lg mb-6">
              Join our community for weekly recipe tips and kitchen hacks.
            </p>
            {/* Optional: Simple underline link for engagement */}
            <Link
              href="/signup"
              className="text-white font-semibold hover:underline underline-offset-4"
            >
              Get started for free →
            </Link>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* COPYRIGHT */}
          <p className="text-white text-sm font-medium">
            © {new Date().getFullYear()} Cookery App. All rights reserved.
          </p>

          {/* SOCIAL LINKS - Attractive Hover Effects */}
          <div className="flex items-center space-x-8">
            <Link
              href="https://www.instagram.com/"
              className="text-gray-400 hover:text-[#00a651] transition-all transform hover:-translate-y-1"
            >
              <span className="sr-only">Instagram</span>
              <Instagram size={22} />
            </Link>
            <Link
              href="https://x.com/"
              className="text-gray-400 hover:text-[#00a651] transition-all transform hover:-translate-y-1"
            >
              <span className="sr-only">Twitter</span>
              <Twitter size={22} />
            </Link>
            <Link
              href="https://www.facebook.com/"
              className="text-gray-400 hover:text-[#00a651] transition-all transform hover:-translate-y-1"
            >
              <span className="sr-only">Facebook</span>
              <Facebook size={22} />
            </Link>
            <Link
              href="https://mail.google.com/mail/u/0/#inbox"
              className="text-gray-400 hover:text-[#00a651] transition-all transform hover:-translate-y-1"
            >
              <span className="sr-only">Email</span>
              <Mail size={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
