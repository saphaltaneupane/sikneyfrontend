"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Clock, Menu } from "lucide-react";
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
  favorite?: boolean;
}

const inspirationalQuotes = [
  "Cooking is love made visible.",
  "Good food is the foundation of genuine happiness.",
  "The secret ingredient is always love.",
];

export function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(inspirationalQuotes[0]);
  const [menuOpen, setMenuOpen] = useState(false);

  /* PAGINATION */
  const [page, setPage] = useState(1);
  const perPage = 6;

  /* SLIDER */
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  /* FETCH */
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosInstance.get("/recipes");
        setRecipes(
          res.data.recipes.map((r: Recipe) => ({
            ...r,
            favorite: r.favorite ?? false,
          })),
        );
      } catch {
        toast.error("Failed to load recipes");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  /* QUOTE ROTATION */
  useEffect(() => {
    const i = setInterval(() => {
      setCurrentQuote((p) => {
        const idx = inspirationalQuotes.indexOf(p);
        return inspirationalQuotes[(idx + 1) % inspirationalQuotes.length];
      });
    }, 8000);
    return () => clearInterval(i);
  }, []);

  /* AUTO SLIDER */
  useEffect(() => {
    if (!recipes.length) return;
    const interval = setInterval(() => {
      setSlideIndex((p) => (p + 1) % recipes.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [recipes.length]);

  /* FILTER + PAGINATION */
  const filtered = recipes.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()),
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const shown = filtered.slice((page - 1) * perPage, page * perPage);

  const toggleFav = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => (r._id === id ? { ...r, favorite: !r.favorite } : r)),
    );
  };

  /* CARD */
  const RecipeCard = ({ r }: { r: Recipe }) => (
    <div className="group bg-white/80 backdrop-blur rounded-2xl border shadow-xl hover:shadow-yellow-200/60 transition-all duration-300 hover:-translate-y-2">
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={r.image}
          alt={r.name}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) =>
            ((e.target as HTMLImageElement).src =
              "https://placehold.co/600x400?text=Recipe")
          }
        />
        <button
          onClick={() => toggleFav(r._id)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
        >
          <Heart
            className={`w-5 h-5 ${
              r.favorite ? "text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-5 h-[220px] flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg">{r.name}</h3>
          <p className="text-sm text-yellow-600 flex items-center gap-1 mt-1">
            <Clock className="w-4 h-4" /> {r.duration}
          </p>
          <p className="text-sm text-gray-500 mt-3 line-clamp-3">
            {r.description || r.instructions}
          </p>
        </div>

        <button
          onClick={() => router.push(`/recipes/${r._id}`)}
          className="mt-4 bg-yellow-200 hover:bg-yellow-300 text-yellow-900 py-2 rounded-xl font-semibold transition"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bgimage.jpg')" }}
    >
      <div className="min-h-screen bg-white/70 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-4xl font-extrabold">Chef Dashboard</h1>
              <p className="text-gray-500">Create • Explore • Inspire</p>
            </div>

            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white border px-4 py-2 rounded-xl shadow flex items-center gap-2"
              >
                <Menu className="w-4 h-4" /> Menu
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-xl shadow border w-44 z-20">
                  {["add", "recipe", "edit", "signout"].map((a) => (
                    <button
                      key={a}
                      onClick={() =>
                        a === "signout"
                          ? (localStorage.clear(), router.push("/"))
                          : router.push(
                              a === "add"
                                ? "/addrecipe"
                                : a === "recipe"
                                  ? "/my-recipes"
                                  : "/edit-profile",
                            )
                      }
                      className={`block w-full px-4 py-2 text-left hover:bg-gray-100 ${
                        a === "signout" && "text-red-600"
                      }`}
                    >
                      {a.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* DAILY INSPIRATION */}
          <div className="mb-14 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-3xl p-6 sm:p-10 shadow-xl text-center">
            <p className="text-xs uppercase tracking-widest">
              Daily Inspiration
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
              “{currentQuote}”
            </h2>
          </div>

          {/* AUTO SLIDER */}
          <div className="overflow-hidden mb-20">
            <div
              ref={sliderRef}
              style={{ transform: `translateX(-${slideIndex * 320}px)` }}
              className="flex gap-6 transition-transform duration-700 ease-in-out"
            >
              {recipes.map((r) => (
                <div key={r._id} className="min-w-[300px]">
                  <RecipeCard r={r} />
                </div>
              ))}
            </div>
          </div>

          {/* EXPLORE */}
          <h2 className="text-3xl font-bold mb-8 text-center">
            Explore Recipes
          </h2>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 bg-gray-200 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {shown.map((r) => (
                  <RecipeCard key={r._id} r={r} />
                ))}
              </div>

              {/* PAGINATION */}
              <div className="flex justify-center gap-3 mt-12">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 rounded-full border font-semibold ${
                      page === i + 1
                        ? "bg-yellow-400 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
