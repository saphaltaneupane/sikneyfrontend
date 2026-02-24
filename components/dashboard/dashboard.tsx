"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart as HeartIcon, Clock, Menu as MenuIcon } from "lucide-react";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "sonner";

interface Recipe {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  duration: string;
  instructions: string;
  image: string;
  favorite?: boolean;
}

const inspirationalQuotes = [
  "Cooking is love made visible.",
  "Good food is the foundation of genuine happiness.",
  "The secret ingredient is always love.",
];

export function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(inspirationalQuotes[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9; // 3 per row x 3 rows

  // Fetch all recipes
  useEffect(() => {
    let isMounted = true;
    const fetchRecipes = async () => {
      setLoadingRecipes(true);
      try {
        const res = await axiosInstance.get("/recipes");
        if (isMounted) {
          const fetchedRecipes = res.data.recipes.map((r: Recipe) => ({
            ...r,
            favorite: r.favorite ?? false,
          }));
          setRecipes(fetchedRecipes);
        }
      } catch (error: unknown) {
        toast.error(
          (error as any)?.response?.data?.message || "Failed to fetch recipes",
        );
      } finally {
        if (isMounted) setLoadingRecipes(false);
      }
    };
    fetchRecipes();
    return () => {
      isMounted = false;
    };
  }, []);

  // Rotate quotes
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
    recipe.name.toLowerCase().includes(query.toLowerCase()),
  );

  const favoriteRecipes = filteredRecipes.filter((r) => r.favorite);
  const exploreRecipes = filteredRecipes;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = exploreRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe,
  );
  const totalPages = Math.ceil(exploreRecipes.length / recipesPerPage);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    localStorage.removeItem("user"); // remove user info
    router.push("/"); // redirect to login page
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const toggleFavorite = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === id ? { ...r, favorite: !r.favorite } : r)),
    );
  };

  const handleMenuAction = (action: string) => {
    setMenuOpen(false);
    if (action === "signout") router.push("/");
    else if (action === "edit") router.push("/edit-profile");
    else if (action === "recipe") router.push("/my-recipes");
    else if (action === "add") router.push("/addrecipe");
  };

  const RecipeCard = ({ recipe }: { recipe: Recipe }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col transform transition hover:scale-105 hover:shadow-xl">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-40 w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://placehold.co/600x400?text=Recipe";
        }}
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg">{recipe.name}</h3>
          <p className="text-xs text-orange-600 font-semibold mt-1 uppercase flex items-center gap-1">
            <Clock className="w-3 h-3" /> {recipe.duration}
          </p>
          <p className="text-gray-500 text-sm mt-2 line-clamp-3">
            {recipe.description || recipe.instructions}
          </p>
        </div>
        <div className="flex mt-4 justify-between items-center gap-2">
          <button
            onClick={() => toggleFavorite(recipe._id)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <HeartIcon
              className={`w-5 h-5 transition ${
                recipe.favorite ? "text-red-500" : "text-gray-400"
              }`}
            />
          </button>
          <button
            onClick={() => router.push(`/recipes/${recipe._id}`)}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center relative">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Chef!</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all"
          >
            <MenuIcon className="w-4 h-4" /> Menu
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
              <button
                onClick={() => handleMenuAction("add")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Add Recipe
              </button>
              <button
                onClick={() => handleMenuAction("recipe")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                My Recipes
              </button>
              <button
                onClick={() => handleMenuAction("edit")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => handleLogout()}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quote Card */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl shadow-lg text-white mb-10">
        <h3 className="text-orange-100 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <HeartIcon className="w-4 h-4" /> Inspiration
        </h3>
        <p className="text-2xl font-semibold mt-3 leading-relaxed">
          &quot;{currentQuote}&quot;
        </p>
      </div>

      {/* Favorite Recipes */}
      {favoriteRecipes.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Favorite Recipes
          </h2>
          {loadingRecipes ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {favoriteRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Explore Recipes */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {query ? `Results for "${query}"` : "Explore Recipes"}
      </h2>
      {loadingRecipes ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-56 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : currentRecipes.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No recipes found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition ${
                  currentPage === i + 1
                    ? "bg-orange-500 text-white border-orange-500"
                    : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
