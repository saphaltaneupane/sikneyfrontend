import Hero from "@/components/dashboard/hero";
import RouteLogin from "@/components/form/routelogin.";
import CreateAccount from "@/components/form/routeregister";
import Footer from "@/components/nav/footer";
import Nav from "@/components/nav/header..";
import React from "react";

const page = () => {
  return (
    <>
      <Nav />
      <Hero />
      <RouteLogin />
      <CreateAccount />
      <Footer />
    </>
  );
};

export default page;
