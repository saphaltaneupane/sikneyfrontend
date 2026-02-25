"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "sonner";
import { Pencil, Trash2, Eye } from "lucide-react";

export default function MyRecipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Fetch recipes
  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await axiosInstance.get("/recipes/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(res.data.recipes);
      } catch (err: any) {
        toast.error("Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, [token]);

  // ✏️ Edit
  const handleEdit = async (recipe: any) => {
    const name = prompt("Recipe Name", recipe.name);
    const description = prompt("Description", recipe.description);

    if (!name || !description) return;

    try {
      const res = await axiosInstance.put(
        `/edit/recipe/${recipe._id}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setRecipes((prev) =>
        prev.map((r) => (r._id === recipe._id ? res.data.recipe : r)),
      );

      toast.success("Recipe updated");
    } catch {
      toast.error("Update failed");
    }
  };

  // 🗑️ Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe?")) return;

    try {
      await axiosInstance.delete(`/delete/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecipes((prev) => prev.filter((r) => r._id !== id));
      toast.success("Recipe deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p className="text-gray-500">No recipes added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <div
              key={r._id}
              className="relative bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
            >
              {/* 🔹 Image */}
              <img
                src={r.image?.[0] || "https://placehold.co/600x400?text=Recipe"}
                alt={r.name}
                className="h-44 w-full object-cover"
              />

              {/* 🔹 Top Icons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleEdit(r)}
                  className="bg-white p-2 rounded-full shadow hover:bg-blue-100"
                  title="Edit"
                >
                  <Pencil size={16} className="text-blue-600" />
                </button>

                <button
                  onClick={() => handleDelete(r._id)}
                  className="bg-white p-2 rounded-full shadow hover:bg-red-100"
                  title="Delete"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>

              {/* 🔹 Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{r.name}</h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {r.description}
                </p>

                {/* View Button */}
                <button
                  onClick={() => router.push(`/recipes/${r._id}`)}
                  className="mt-4 flex items-center justify-center gap-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg"
                >
                  <Eye size={16} />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
