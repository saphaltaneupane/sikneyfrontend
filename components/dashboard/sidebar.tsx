"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Home,
  PlusCircle,
  Heart,
  User,
  Search,
  UtensilsCrossed,
} from "lucide-react";
import ProfileModal from "./editprofile";

// Mock user data
const MOCK_USER = {
  displayName: "Chef Guest",
  email: "guest@cookbook.com",
};

export function SidebarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Get current search value from URL
  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "MyRecipes", href: "/myrecepie", icon: UtensilsCrossed },
    { name: "Add a recipe", href: "/addrecipe", icon: PlusCircle },
    { name: "Favorites", href: "/fav", icon: Heart },
  ];

  return (
    <>
      <aside className="sticky top-0 h-screen w-64 bg-linear-to-b from-green-50 to-green-100 border-r border-green-200 flex-col p-6 hidden md:flex">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Cookery</h2>
            <p className="text-sm text-gray-600">Your CookBook</p>
          </div>

          <button
            onClick={() => setIsProfileOpen(true)}
            className="flex items-center gap-3 mb-6 px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all w-full text-left"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shrink-0">
              {(MOCK_USER.displayName?.[0] || "G").toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                Welcome back
              </p>
              <p className="text-sm font-semibold text-gray-900 truncate">
                {MOCK_USER.displayName}
              </p>
            </div>
          </button>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={currentSearch}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-green-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              let isActive = pathname === item.href;

              // Special case: Add Recipe → highlight only if pathname is /addrecipe
              if (item.name === "Add a recipe" && pathname !== "/addrecipe") {
                isActive = false;
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg"
                      : "text-gray-700 hover:bg-white hover:shadow-md"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              );
            })}

            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-gray-700 hover:bg-white hover:shadow-md w-full"
            >
              <User className="w-5 h-5" />
              <span className="font-medium text-sm">Edit Profile</span>
            </button>
          </nav>
        </div>
      </aside>

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}

// Wrapper component to support Suspense
export default function Sidebar() {
  return (
    <Suspense
      fallback={
        <div className="w-64 bg-green-50 h-screen border-r border-green-200" />
      }
    >
      <SidebarContent />
    </Suspense>
  );
}
