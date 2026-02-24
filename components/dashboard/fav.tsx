"use client";

import React, { useEffect, useState } from "react";
import { Heart, Clock, ArrowLeft } from "lucide-react";
import Sidebar from "./sidebar";

// Mock data
const MOCK_FAVORITES = [
  {
    docId: "fav_1",
    name: "Classic Margherita Pizza",
    description:
      "A simple yet delicious Italian classic with fresh basil and mozzarella.",
    duration: 30,
    ingredients:
      "Pizza dough\nTomato sauce\nFresh mozzarella\nBasil leaves\nOlive oil",
    steps:
      "1. Roll out dough.\n2. Add sauce and cheese.\n3. Bake at 450°F for 12 mins.\n4. Top with fresh basil.",
    imageUrl: null,
  },
  {
    docId: "fav_2",
    name: "Berry Smoothie Bowl",
    description: "A refreshing and healthy start to your morning.",
    duration: 10,
    ingredients: "Frozen berries\n1 Banana\nAlmond milk\nGranola topping",
    steps:
      "1. Blend fruit and milk.\n2. Pour into bowl.\n3. Add granola and fresh fruit on top.",
    imageUrl: null,
  },
];

interface Recipe {
  docId: string;
  name: string;
  description: string;
  duration: number;
  ingredients: string;
  steps: string;
  imageUrl: null;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [loadingFavs, setLoadingFavs] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoadingFavs(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      if (isMounted) {
        setFavorites(MOCK_FAVORITES);
        setLoadingFavs(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const removeFavorite = (docId: string) => {
    setFavorites((prev) => prev.filter((r) => r.docId !== docId));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            My Favorite Recipes
          </h1>

          {loadingFavs ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-48 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-dashed border-gray-300">
              <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-lg font-medium">
                You haven&apos;t liked any recipes yet.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Go to the Dashboard to add some!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((recipe) => (
                <FavoriteCard
                  key={recipe.docId}
                  recipe={recipe}
                  onRemove={() => removeFavorite(recipe.docId)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// FavoriteCard without destructured props
export function FavoriteCard(props: any) {
  const [showPopup, setShowPopup] = useState(false);

  const recipe = props.recipe;
  const onRemove = props.onRemove;

  return (
    <>
      <div
        className="group relative cursor-pointer bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
        onClick={() => setShowPopup(true)}
      >
        <div
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur shadow-sm hover:scale-110 transition-transform"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        >
          <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
        </div>

        <div className="h-40 overflow-hidden bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            No Image
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-gray-800 text-sm truncate">
            {recipe.name}
          </h3>
          <div className="mt-2 flex items-center gap-1.5 text-orange-600 font-bold">
            <Clock className="w-4 h-4" />
            <span className="text-xs uppercase">{recipe.duration} mins</span>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/60 z-100 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPopup(false)}
              className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-6 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> BACK
            </button>

            <h2 className="text-2xl font-black mb-3 text-gray-900">
              {recipe.name}
            </h2>
            <p className="text-gray-500 mb-6 italic text-sm">
              {recipe.description}
            </p>

            <div className="space-y-6">
              <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                <h3 className="font-bold text-orange-900 mb-3 uppercase text-[10px] tracking-widest border-b border-orange-200 pb-1">
                  Ingredients
                </h3>
                <p className="text-orange-800 whitespace-pre-line text-sm leading-relaxed">
                  {recipe.ingredients}
                </p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3 uppercase text-[10px] tracking-widest border-b border-gray-200 pb-1">
                  Steps
                </h3>
                <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                  {recipe.steps}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
