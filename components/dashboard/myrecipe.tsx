"use client";

import React, { useState } from "react";
import { Heart, Clock, ArrowLeft, Edit2, Save, X, Trash2 } from "lucide-react";

// Example internal recipe data
const DEFAULT_RECIPE = {
  id: "my_1",
  name: "Grandma's Secret Lasagna",
  duration: 90,
  description: "The ultimate comfort food passed down through generations.",
  ingredients:
    "Lasagna sheets\nRicotta cheese\nGround beef\nMarinara sauce\nMozzarella",
  steps:
    "1. Cook the meat.\n2. Layer the pasta and cheese.\n3. Bake for 45 minutes.",
  imageUrl: null,
};

export function RecipeCard() {
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [recipe, setRecipe] = useState<typeof DEFAULT_RECIPE | null>(
    DEFAULT_RECIPE,
  );

  const [editData, setEditData] = useState<typeof DEFAULT_RECIPE>(
    recipe || DEFAULT_RECIPE,
  );

  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRecipe(editData); // Save changes internally
    setIsEditing(false);
  };

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (window.confirm("Delete this recipe?")) {
      setRecipe(null); // Just remove it locally
    }
  };

  if (!recipe) return null; // Don't render if deleted

  return (
    <>
      <div
        className="group cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all relative"
        onClick={() => setShowPopup(true)}
      >
        <div className="absolute top-3 right-3 z-10 flex gap-2">
          <button
            onClick={handleDeleteClick}
            className="p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-red-500 hover:text-white transition-colors text-gray-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-orange-500 hover:text-white transition-colors text-gray-600"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className="p-2 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${liked ? "text-red-500 fill-current" : "text-gray-400"}`}
            />
          </button>
        </div>

        <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-bold">
          RECIPE IMAGE
        </div>

        <div className="p-4">
          <h3 className="font-bold text-gray-900 truncate">{recipe.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-orange-600 font-bold text-xs">
            <Clock className="w-4 h-4" /> {recipe.duration} MINS
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && !isEditing && (
        <div className="fixed inset-0 bg-black/70 z-100 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPopup(false)}
              className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-6 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> BACK
            </button>
            <h2 className="text-3xl font-black text-gray-900 mb-2">
              {recipe.name}
            </h2>
            <div className="space-y-6 mt-6">
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h3 className="font-bold text-orange-900 mb-2 text-xs uppercase tracking-widest">
                  Ingredients
                </h3>
                <p className="text-orange-800 whitespace-pre-line text-sm">
                  {recipe.ingredients}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2 text-xs uppercase tracking-widest">
                  Instructions
                </h3>
                <p className="text-gray-700 whitespace-pre-line text-sm">
                  {recipe.steps}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 z-110 flex items-center justify-center p-4 backdrop-blur-sm">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white max-w-2xl w-full p-8 rounded-2xl shadow-2xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Edit Recipe</h2>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-orange-500 outline-none"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Name"
              />
              <input
                type="number"
                className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-orange-500 outline-none"
                value={editData.duration}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    duration: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="Duration"
              />
              <textarea
                className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-orange-500 outline-none h-32"
                value={editData.ingredients}
                onChange={(e) =>
                  setEditData({ ...editData, ingredients: e.target.value })
                }
                placeholder="Ingredients"
              />
              <textarea
                className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-orange-500 outline-none h-32"
                value={editData.steps}
                onChange={(e) =>
                  setEditData({ ...editData, steps: e.target.value })
                }
                placeholder="Instructions"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-orange-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" /> SAVE CHANGES
            </button>
          </form>
        </div>
      )}
    </>
  );
}
