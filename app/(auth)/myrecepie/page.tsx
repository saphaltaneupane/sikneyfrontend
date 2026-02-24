import RecipeCard from "@/components/dashboard/myrecipe";
import React, { Suspense } from "react";

const MyRecipe = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <RecipeCard />
    </Suspense>
  );
};

export default MyRecipe;
