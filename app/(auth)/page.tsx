import { DashboardContent } from "@/components/dashboard/dashboard";
import React, { Suspense } from "react";

const dashboardpage = () => {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Loading Dashboard...</div>}
    >
      <DashboardContent />
    </Suspense>
  );
};

export default dashboardpage;
