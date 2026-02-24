import Hero from "@/components/dashboard/hero";
import RouteLogin from "@/components/form/routelogin.";
import CreateAccount from "@/components/form/routeregister";
import Footer from "@/components/nav/footer";
import Nav from "@/components/nav/header..";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Hero />
        <RouteLogin />
        <CreateAccount />
      </main>

      <Footer />
    </div>
  );
};

export default page;
