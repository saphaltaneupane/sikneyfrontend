"use client";

import React, { useEffect, useState, Suspense } from "react"; // Removed useCallback for simplicity
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Clock, ArrowLeft } from "lucide-react";

// 1. Keep mock data outside the component to prevent re-renders
const inspirationalQuotes = [
  "Cooking is love made visible.",
  "Good food is the foundation of genuine happiness.",
  "The secret ingredient is always love.",
];

const MOCK_RECIPES = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    duration: 25,
    ingredients: "200g spaghetti\n100g pancetta",
    steps: "1. Cook pasta.",
  },
  {
    id: "2",
    name: "Avocado Toast",
    duration: 10,
    ingredients: "Bread, Avocado",
    steps: "1. Toast bread.",
  },
];

export function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const [recipes, setRecipes] = useState<typeof MOCK_RECIPES>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(inspirationalQuotes[0]);
  const [favorites, setFavorites] = useState([]);

  // FIXED FETCH LOGIC:
  // Instead of useCallback, we define the async function INSIDE useEffect.
  // This is the safest way to avoid the "Promise" error in React.
  useEffect(() => {
    let isMounted = true; // Prevents memory leaks

    const loadData = async () => {
      setLoadingRecipes(true);
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (isMounted) {
        setRecipes(MOCK_RECIPES);
        setLoadingRecipes(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []); // Only runs once on mount

  // Quote Rotation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => {
        const idx = inspirationalQuotes.indexOf(prev);
        return inspirationalQuotes[(idx + 1) % inspirationalQuotes.length];
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    (recipe.name || "").toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Chef!</p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium"
        >
          Sign Out
        </button>
      </div>

      {/* Quote Card */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl shadow-lg text-white mb-10">
        <h3 className="text-orange-100 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <Heart className="w-4 h-4" /> Inspiration
        </h3>
        <p className="text-2xl font-semibold mt-3 leading-relaxed">
          &quot;{currentQuote}&quot;
        </p>
      </div>

      {/* Recipe Grid */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {query ? `Results for "${query}"` : "Explore Recipes"}
      </h2>

      {loadingRecipes ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-48 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
            >
              <h3 className="font-bold">{recipe.name}</h3>
              <p className="text-xs text-orange-600 font-bold mt-2 uppercase">
                {recipe.duration} MINS
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
