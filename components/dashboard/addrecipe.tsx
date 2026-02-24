"use client";

import React, { useState } from "react";
import { Image as ImageIcon, X, Save, Loader2, Clock } from "lucide-react";
import Image from "next/image";

export function AddRecipeModal() {
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    duration: "",
    ingredients: "",
    steps: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Saved Recipe:", recipe);

    setSubmitting(false);
    alert("Recipe saved!"); // simple success feedback
    setShowModal(false); // hide modal after saving
  };

  if (!showModal) return null; // hide modal if closed

  return (
    <div className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-green-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-green-200 flex justify-between items-center bg-green-50/50">
          <h2 className="text-xl font-bold text-gray-900">Add New Recipe</h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-red-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <form
            id="recipe-form"
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Left */}
            <div className="space-y-6">
              <input
                required
                placeholder="Recipe Title"
                className="w-full border p-3 rounded-xl"
                value={recipe.name}
                onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              />

              <textarea
                placeholder="Short description..."
                className="w-full border p-3 rounded-xl"
                value={recipe.description}
                onChange={(e) =>
                  setRecipe({ ...recipe, description: e.target.value })
                }
              />

              <div className="relative">
                <Clock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  placeholder="Cooking time (mins)"
                  className="w-full border p-3 pl-10 rounded-xl"
                  value={recipe.duration}
                  onChange={(e) =>
                    setRecipe({ ...recipe, duration: e.target.value })
                  }
                />
              </div>

              <div className="border-2 border-dashed rounded-xl p-4 text-center">
                {imagePreview ? (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="h-48 w-full object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <ImageIcon className="mx-auto mb-2" />
                    <p className="text-sm text-gray-500 font-medium">
                      Click to upload image
                    </p>
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Right */}
            <div className="space-y-6">
              <textarea
                placeholder="Ingredients..."
                className="w-full border p-4 rounded-xl h-40"
                value={recipe.ingredients}
                onChange={(e) =>
                  setRecipe({ ...recipe, ingredients: e.target.value })
                }
              />

              <textarea
                placeholder="Instructions..."
                className="w-full border p-4 rounded-xl h-40"
                value={recipe.steps}
                onChange={(e) =>
                  setRecipe({ ...recipe, steps: e.target.value })
                }
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex justify-end gap-3 border-t">
          <button onClick={() => setShowModal(false)} className="px-6 py-2">
            Cancel
          </button>
          <button
            type="submit"
            form="recipe-form"
            disabled={submitting}
            className="px-8 py-2 bg-orange-500 text-white rounded-xl"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin inline" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 inline" /> Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
