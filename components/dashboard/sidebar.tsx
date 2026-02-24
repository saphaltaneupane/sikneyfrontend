"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Home,
  Heart,
  UtensilsCrossed,
  ShoppingCart,
  Search,
} from "lucide-react";

const MOCK_USER = {
  displayName: "Chef Guest",
  email: "guest@cookbook.com",
};

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const currentSearch = searchParams.get("search") || "";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set("search", value);
    else params.delete("search");

    router.push(`${pathname}?${params.toString()}`);
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "AllRecipes", href: "/myrecepie", icon: UtensilsCrossed },
    { name: "Favorites", href: "/fav", icon: Heart },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 h-screen sticky top-0 bg-gray-50 border-r border-gray-200 p-6">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Cookery</h2>
            <p className="text-sm text-gray-500">Your CookBook</p>
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 mb-6 px-4 py-3 bg-orange-100 rounded-xl hover:shadow-md transition w-full"
          >
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
              {(MOCK_USER.displayName?.[0] || "G").toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase">Your Cart</p>
              <p className="text-sm font-semibold text-gray-900">
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
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 w-full"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm font-medium">Cart Items</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around md:hidden bg-white border-t py-2">
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
