import RecipeCard from "@/components/dashboard/allrecipe";
import React, { Suspense } from "react";

const MyRecipe = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <RecipeCard />
    </Suspense>
  );
};

export default MyRecipe;
