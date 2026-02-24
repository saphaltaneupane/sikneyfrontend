"use client";

import React, { useState } from "react";
import { X, Loader2, Save, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosinstance";

export function AddRecipeModal() {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    duration: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        toast.error("Please login first");
        router.push("/login");
        return;
      }

      // Convert ingredients textarea to array
      const ingredientsArray = recipe.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter((item) => item !== "");

      const res = await axiosInstance.post(
        "/add/recipe",
        {
          name: recipe.name,
          description: recipe.description,
          duration: recipe.duration,
          instructions: recipe.instructions,
          ingredients: ingredientsArray,
          image: recipe.image || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(res.data.message || "Recipe created successfully");

      router.push("/myrecepie");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create recipe");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Add New Recipe</h2>

          <button
            onClick={() => router.push("/myrecipe")}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 grid md:grid-cols-2 gap-8">
          {/* LEFT SIDE */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Recipe Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Chicken Biryani"
                className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={recipe.name}
                onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Short Description
              </label>
              <textarea
                required
                rows={3}
                placeholder="Write a short description..."
                className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={recipe.description}
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
              />
            </div>

            {/* Duration */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Cooking Time (minutes)
              </label>
              <div className="relative mt-1">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  required
                  type="number"
                  placeholder="30"
                  className="w-full border rounded-xl p-3 pl-10 focus:ring-2 focus:ring-orange-400 outline-none"
                  value={recipe.duration}
                  onChange={(e) =>
                    setRecipe({ ...recipe, duration: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Image URL (Optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={recipe.image}
                onChange={(e) =>
                  setRecipe({ ...recipe, image: e.target.value })
                }
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-5">
            {/* Ingredients */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Ingredients (one per line)
              </label>
              <textarea
                required
                rows={6}
                placeholder="1 cup rice
2 onions
1 tbsp oil"
                className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={recipe.ingredients}
                onChange={(e) =>
                  setRecipe({ ...recipe, ingredients: e.target.value })
                }
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="text-sm font-medium text-gray-600">
                Instructions
              </label>
              <textarea
                required
                rows={6}
                placeholder="Step 1: Heat oil...
Step 2: Add onions..."
                className="w-full mt-1 border rounded-xl p-3 focus:ring-2 focus:ring-orange-400 outline-none"
                value={recipe.instructions}
                onChange={(e) =>
                  setRecipe({ ...recipe, instructions: e.target.value })
                }
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => router.push("/myrecipe")}
              className="px-6 py-2 rounded-xl border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center gap-2 transition"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Recipe
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
