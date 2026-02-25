"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Clock, ShoppingCart } from "lucide-react";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axiosInstance.get("/recipes");

        console.log("RESPONSE:", res.data);

        setRecipes(res.data.recipes || []);
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

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  if (recipes.length === 0)
    return <p className="text-center mt-10 text-gray-500">No recipes found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Recipes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
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

              <p className="text-sm text-gray-500 mt-1">{recipe.description}</p>

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

                  {/* Add to Cart Button */}
                  <button
                    className="flex items-center gap-1 px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm"
                    onClick={() => router.push(`/recipes/${recipe._id}`)}
                  >
                    view details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
