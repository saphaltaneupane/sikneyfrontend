"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosinstance";
import { toast } from "sonner";

interface RecipeFormData {
  name: string;
  description: string;
  ingredients: string[];
  duration: string;
  instructions: string;
  images: File[];
}

export default function EditRecipePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
    ingredients: [""],
    duration: "",
    instructions: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axiosInstance.get(`/recipe/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const r = res.data.data;

        setFormData({
          name: r.name,
          description: r.description,
          ingredients: r.ingredients.length ? r.ingredients : [""],
          duration: r.duration,
          instructions: r.instructions,
          images: [],
        });
      } catch {
        toast.error("Failed to load recipe");
      } finally {
        setFetching(false);
      }
    };

    fetchRecipe();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
  ) => {
    const { name, value } = e.target;

    if (name === "ingredients" && index !== undefined) {
      const updated = [...formData.ingredients];
      updated[index] = value;
      setFormData({ ...formData, ingredients: updated });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("duration", formData.duration);
      data.append("instructions", formData.instructions);

      formData.ingredients.forEach((i) => data.append("ingredients", i));

      formData.images.forEach((f) => data.append("image", f));

      await axiosInstance.put(`/edit/recipe/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Recipe updated");
      router.push("/my-recipes");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center mt-10">Loading...</p>;

  /* ================= UI ================= */
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Name"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />

        {formData.ingredients.map((ing, i) => (
          <input
            key={i}
            name="ingredients"
            value={ing}
            onChange={(e) => handleChange(e, i)}
            className="w-full p-2 border rounded"
            placeholder={`Ingredient ${i + 1}`}
          />
        ))}

        <button
          type="button"
          onClick={addIngredient}
          className="text-orange-500"
        >
          + Add Ingredient
        </button>

        <input
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Duration"
        />

        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Instructions"
        />

        <input type="file" multiple onChange={handleImageChange} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded"
        >
          {loading ? "Updating..." : "Update Recipe"}
        </button>
      </form>
    </div>
  );
}
