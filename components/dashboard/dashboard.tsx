"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Clock, Menu as MenuIcon } from "lucide-react";

// Mock Data
const inspirationalQuotes = [
  "Cooking is love made visible.",
  "Good food is the foundation of genuine happiness.",
  "The secret ingredient is always love.",
];

const MOCK_RECIPES = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    duration: 25,
    ingredients: "200g spaghetti\n100g pancetta",
    steps: "Cook pasta, fry pancetta, mix with eggs and cheese.",
    description: "Classic Italian pasta with creamy sauce.",
    image: "/images/spaghetti.jpg",
    favorite: true,
  },
  {
    id: "2",
    name: "Avocado Toast",
    duration: 10,
    ingredients: "Bread, Avocado",
    steps: "Toast bread, smash avocado, add toppings.",
    description: "Healthy breakfast or snack.",
    image: "/images/avocado-toast.jpg",
    favorite: true,
  },
  {
    id: "3",
    name: "Chicken Curry",
    duration: 40,
    ingredients: "Chicken, spices, onions, tomatoes",
    steps: "Cook chicken, add spices, simmer with sauce.",
    description: "Spicy and flavorful curry.",
    image: "/images/chicken-curry.jpg",
    favorite: true,
  },
  {
    id: "4",
    name: "Pancakes",
    duration: 20,
    ingredients: "Flour, eggs, milk, sugar",
    steps: "Mix ingredients, cook on skillet.",
    description: "Fluffy breakfast pancakes.",
    image: "/images/pancakes.jpg",
    favorite: false,
  },
  {
    id: "5",
    name: "Caesar Salad",
    duration: 15,
    ingredients: "Lettuce, croutons, dressing",
    steps: "Toss ingredients together.",
    description: "Crisp and refreshing salad.",
    image: "/images/caesar-salad.jpg",
    favorite: false,
  },
];

export function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const [recipes, setRecipes] = useState<typeof MOCK_RECIPES>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(inspirationalQuotes[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      setLoadingRecipes(true);
      await new Promise((r) => setTimeout(r, 800));
      if (isMounted) {
        setRecipes(MOCK_RECIPES);
        setLoadingRecipes(false);
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => {
        const idx = inspirationalQuotes.indexOf(prev);
        return inspirationalQuotes[(idx + 1) % inspirationalQuotes.length];
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query.toLowerCase()),
  );

  const favoriteRecipes = filteredRecipes.filter((r) => r.favorite);
  const myRecipes = filteredRecipes.filter((r) => !r.favorite);

  const handleMenuAction = (action: string) => {
    setMenuOpen(false);
    if (action === "signout")
      router.push("/"); // replace with actual signout logic
    else if (action === "edit") router.push("/edit-profile");
    else if (action === "recipe") router.push("/myrecepie");
    else if (action === "add") router.push("/addrecipe");
  };

  const RecipeCard = ({ recipe }: { recipe: (typeof MOCK_RECIPES)[0] }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg">{recipe.name}</h3>
          <p className="text-xs text-orange-600 font-semibold mt-1 uppercase flex items-center gap-1">
            <Clock className="w-3 h-3" /> {recipe.duration} MINS
          </p>
          <p className="text-gray-500 text-sm mt-2 line-clamp-3">
            {recipe.description || recipe.steps}
          </p>
        </div>
        <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition">
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center relative">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Chef!</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all"
          >
            <MenuIcon className="w-4 h-4" /> Menu
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-10">
              <button
                onClick={() => handleMenuAction("add")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Add Recipe
              </button>
              <button
                onClick={() => handleMenuAction("recipe")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                My Recipes
              </button>
              <button
                onClick={() => handleMenuAction("edit")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => handleMenuAction("signout")}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-600"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quote Card */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl shadow-lg text-white mb-10">
        <h3 className="text-orange-100 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <Heart className="w-4 h-4" /> Inspiration
        </h3>
        <p className="text-2xl font-semibold mt-3 leading-relaxed">
          &quot;{currentQuote}&quot;
        </p>
      </div>

      {/* Favorite Recipes */}
      {favoriteRecipes.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Your Favorite Recipes
          </h2>
          {loadingRecipes ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-200 animate-pulse rounded-xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              {favoriteRecipes.slice(0, 3).map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          )}
        </>
      )}

      {/* My Recipes */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {query ? `Results for "${query}"` : "Explore Recipes"}
      </h2>
      {loadingRecipes ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-56 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
