import { RecipeCard } from "@/components/dashboard/myrecipe";
import React, { Suspense } from "react";

const myrecipe = () => {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <RecipeCard />
    </Suspense>
  );
};

export default myrecipe;
