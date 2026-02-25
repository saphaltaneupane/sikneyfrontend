"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axiosinstance";

interface RecipeFormData {
  name: string;
  description: string;
  ingredients: string[];
  duration: string;
  instructions: string;
  images: File[];
}

const AddRecipeForm: React.FC = () => {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
    ingredients: [""],
    duration: "",
    instructions: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  // Handle normal input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "ingredients" && index !== undefined) {
      const updatedIngredients = [...formData.ingredients];
      updatedIngredients[index] = value;
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Add ingredient field
  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    });
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const filesArray = Array.from(e.target.files);
    setFormData({ ...formData, images: filesArray });
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first.");
        setLoading(false);
        return;
      }

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("duration", formData.duration);
      data.append("instructions", formData.instructions);

      formData.ingredients.forEach((ing) =>
        data.append("ingredients", ing)
      );

      // IMPORTANT: Must match backend field name "image"
      formData.images.forEach((file) => {
        data.append("image", file);
      });

      const res = await axiosInstance.post(
        "/add/recipe",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Recipe added successfully");

      // Reset form
      setFormData({
        name: "",
        description: "",
        ingredients: [""],
        duration: "",
        instructions: "",
        images: [],
      });

    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to add recipe"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add New Recipe
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          name="name"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        {formData.ingredients.map((ing, idx) => (
          <input
            key={idx}
            name="ingredients"
            placeholder={`Ingredient ${idx + 1}`}
            value={ing}
            onChange={(e) => handleChange(e, idx)}
            className="w-full p-3 border rounded-xl"
          />
        ))}

        <button
          type="button"
          onClick={addIngredientField}
          className="text-orange-500"
        >
          + Add Ingredient
        </button>

        <input
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        {/* Multiple Image Upload */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full p-3 border rounded-xl"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white ${
            loading
              ? "bg-orange-300"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Uploading..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;