"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Clock } from "lucide-react";
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
  createdBy: {
    name: string;
    email: string;
  };
}

export default function RecipeDetailPage() {
  const { id } = useParams(); // get recipe _id from URL
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const res = await axiosInstance.get(`/${id}`);
        // Backend returns recipe directly, not under "recipe"
        if (res.data) {
          setRecipe(res.data); // <-- use res.data directly
        } else {
          setRecipe(null);
        }
      } catch (error: unknown) {
        toast.error("Failed to fetch recipe details");
        setRecipe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!recipe)
    return <p className="text-center mt-10 text-gray-500">Recipe not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>

      <div className="h-64 w-full overflow-hidden bg-gray-200 rounded-lg mb-4">
        <img
          src={recipe.image || "https://placehold.co/600x400?text=Recipe"}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center gap-2 text-orange-600 text-sm mb-4">
        <Clock className="w-4 h-4" />
        {recipe.duration}
      </div>

      <p className="text-gray-700 mb-4">{recipe.description}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-700 whitespace-pre-line">{recipe.instructions}</p>

      <p className="mt-6 text-sm text-gray-500">
        Created by: {recipe.createdBy?.name} ({recipe.createdBy?.email})
      </p>
    </div>
  );
}
