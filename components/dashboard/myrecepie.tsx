"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "sonner";

export default function MyRecipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await axiosInstance.get("/recipes/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRecipes(res.data.recipes);
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to fetch recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRecipes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Recipes</h1>

      {loading ? (
        <p>Loading...</p>
      ) : recipes.length === 0 ? (
        <p className="text-gray-500">You haven't added any recipes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((r) => (
            <div
              key={r._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={r.image}
                alt={r.name}
                className="h-40 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x400?text=Recipe";
                }}
              />
              <div className="p-4">
                <h3 className="font-bold text-lg">{r.name}</h3>
                <p className="text-gray-500 text-sm mt-2 line-clamp-3">
                  {r.description}
                </p>
                <button
                  className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg w-full"
                  onClick={() => router.push(`/recipes/${r._id}`)}
                >
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
