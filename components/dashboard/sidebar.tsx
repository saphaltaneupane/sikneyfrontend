"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Home, Heart, UtensilsCrossed, Search, LogOut } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const userObj = JSON.parse(storedUser);
        setUsername(userObj.username || "Guest");
      } catch {
        setUsername("Guest");
      }
    }
  }, []);

  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("search", value);
    else params.delete("search");

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    router.push("/");
  };

  // Updated navigation items
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "AllRecipes", href: "/myrecepie", icon: UtensilsCrossed },
    { name: "Favorites", href: "/fav", icon: Heart },
    { name: "About Us", href: "/aboutus", icon: Home }, // You can change the icon if needed
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen sticky top-0 bg-transparent p-6">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Cookery</h2>
              <p className="text-sm text-gray-500">Your CookBook</p>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl w-full">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                {(username?.[0] || "G").toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase">User</p>
                <p className="text-sm font-semibold text-gray-900">
                  {username}
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={currentSearch}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 bg-white/70 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      isActive
                        ? "bg-orange-500 text-white"
                        : "text-gray-700 hover:bg-white/60"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-100/60 w-full mt-6"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around bg-white border-t py-2 md:hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-orange-500" : "text-gray-600"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
