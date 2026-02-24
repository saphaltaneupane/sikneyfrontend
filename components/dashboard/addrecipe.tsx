"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import axiosInstance from "@/lib/axiosinstance";

interface RecipeFormData {
  name: string;
  description: string;
  ingredients: string[];
  duration: string;
  instructions: string;
  image: string;
}

// Reusable text or textarea input
const TextInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  type = "text",
}: {
  label?: string;
  name: string;
  value: string;
  placeholder?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  type?: string;
}) => (
  <div className="flex flex-col">
    {label && <label className="mb-1 font-medium text-gray-700">{label}</label>}
    {type === "textarea" ? (
      <textarea
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

// Ingredient input field
const IngredientInput = ({
  value,
  index,
  onChange,
}: {
  value: string;
  index: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}) => (
  <input
    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
    name="ingredients"
    placeholder={`Ingredient ${index + 1}`}
    value={value}
    onChange={(e) => onChange(e, index)}
  />
);

const AddRecipeForm: React.FC = () => {
  const [formData, setFormData] = useState<RecipeFormData>({
    name: "",
    description: "",
    ingredients: [""],
    duration: "",
    instructions: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // Update form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number,
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

  // Add new ingredient input
  const addIngredientField = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ""] });
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      // If you want cookies instead, you could use:
      // import Cookies from 'js-cookie';
      // const token = Cookies.get('token');

      if (!token) {
        toast.error("You are not authorized. Please login first.");
        setLoading(false);
        return;
      }

      // Send request via axiosInstance with Authorization header
      const res = await axiosInstance.post("/add/recipe", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message || "Recipe added successfully");

      // Reset form
      setFormData({
        name: "",
        description: "",
        ingredients: [""],
        duration: "",
        instructions: "",
        image: "",
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to add recipe");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add a New Recipe
      </h2>

      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <TextInput
          name="name"
          value={formData.name}
          placeholder="Recipe Name"
          onChange={handleChange}
        />
        <TextInput
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          type="textarea"
        />

        {formData.ingredients.map((ing, idx) => (
          <IngredientInput
            key={idx}
            value={ing}
            index={idx}
            onChange={handleChange}
          />
        ))}

        <button
          type="button"
          onClick={addIngredientField}
          className="text-orange-500 hover:text-orange-600 font-medium text-left"
        >
          + Add another ingredient
        </button>

        <TextInput
          name="duration"
          value={formData.duration}
          placeholder="Duration (e.g., 30 mins)"
          onChange={handleChange}
        />
        <TextInput
          name="instructions"
          value={formData.instructions}
          placeholder="Instructions"
          onChange={handleChange}
          type="textarea"
        />
        <TextInput
          name="image"
          value={formData.image}
          placeholder="Image URL"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold ${
            loading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          } transition-colors`}
        >
          {loading ? "Adding..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
