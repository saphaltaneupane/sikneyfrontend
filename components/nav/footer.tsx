"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* BRAND */}
          <div>
            <Link href="/" className="text-3xl font-bold text-white">
              Cookery<span className="text-[#00a651]">.</span>
            </Link>
            <p className="mt-4 text-gray-400 leading-relaxed max-w-sm">
              Your digital kitchen companion. Discover, organize, and share your
              favorite recipes effortlessly.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/recipes" className="hover:text-white transition">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="hover:text-white transition">
                  Favorites
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER / CTA */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Inspired</h4>
            <p className="text-gray-400 mb-4">
              Weekly recipe ideas and kitchen tips—straight to your inbox.
            </p>
            <Link
              href="/signup"
              className="inline-block text-sm font-semibold text-white border border-gray-700 px-5 py-2 rounded-lg hover:bg-[#00a651] hover:border-[#00a651] transition"
            >
              Join for free →
            </Link>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Cookery App. All rights reserved.
          </p>

          {/* SOCIALS */}
          <div className="flex items-center gap-6">
            <Link
              href="https://www.instagram.com/"
              className="hover:text-[#00a651] transition"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="https://x.com/"
              className="hover:text-[#00a651] transition"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://www.facebook.com/"
              className="hover:text-[#00a651] transition"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="mailto:support@cookery.app"
              className="hover:text-[#00a651] transition"
              aria-label="Email"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
