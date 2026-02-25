"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Clock } from "lucide-react";
import axios from "axios";
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
  createdBy: string;
}

export default function RecipeCard() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axiosInstance.get("/recipes");
        setRecipes(res.data.recipes || []);
        setFilteredRecipes(res.data.recipes || []);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(
            error.response?.data?.message || "Failed to fetch recipes",
          );
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    // Filter recipes based on search query
    if (searchQuery.trim() === "") {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, recipes]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (recipes.length === 0)
    return <p className="text-center mt-10 text-gray-500">No recipes found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Recipes</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Recipe Cards */}
      {filteredRecipes.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">
          No recipes match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden bg-gray-200">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/600x400?text=Recipe";
                  }}
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900">{recipe.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {recipe.description}
                </p>

                <div className="mt-3 flex justify-between items-center flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-orange-600 text-sm">
                    <Clock className="w-4 h-4" />
                    {recipe.duration}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Favorite Button */}
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                      <Heart className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* View Details Button */}
                    <button
                      className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm"
                      onClick={() => router.push(`/recipes/${recipe._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
