"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Bikrant Dangol",
      role: "Founder & Chef",
      image: "/avatar.png",
      bio: "Bikrant combines traditional recipes with modern techniques to bring authentic flavors to your table.",
    },
    {
      name: "Sita Rimal",
      role: "Content Creator",
      image: "/avatar.png",
      bio: "Sita crafts engaging content and shares cooking tips, making the art of cooking accessible to all.",
    },
    {
      name: "Ram Sharma",
      role: "Recipe Developer",
      image: "/avatar.png",
      bio: "Ram experiments with flavors and ingredients to create innovative recipes for every palate.",
    },
    {
      name: "Laxmi Gurung",
      role: "Photographer",
      image: "/avatar.png",
      bio: "Laxmi captures the essence of every dish, turning recipes into visual stories that inspire.",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/cooking-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black bg-opacity-50 p-10 rounded-xl text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            About Our Cookbook
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Discover the stories, passion, and flavors behind every recipe we
            share.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              Founded in 2025, our cookbook journey began with a simple idea: to
              bring home-cooked meals, authentic flavors, and heartfelt stories
              together in one place.
            </p>
            <p className="text-lg mb-4">
              From our humble kitchen experiments to professional food
              photography, every recipe is carefully tested and crafted to
              inspire you in the kitchen.
            </p>
            <p className="text-lg mb-4">
              Over the years, we've grown into a community of passionate cooks,
              sharing knowledge, experiences, and culinary creativity with food
              lovers around the world.
            </p>
            <p className="text-lg">
              Whether you’re a beginner or a seasoned chef, we want to help you
              make every meal a special occasion.
            </p>
          </div>
          <div className="lg:w-1/2 relative h-96 w-full">
            <Image
              src="/ourstory.jpg"
              alt="Our Story"
              fill
              className="object-contain rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2 relative h-96 w-full order-2 lg:order-1">
            <Image
              src="/mission.jpg"
              alt="Our Mission"
              fill
              className="object-contain rounded-xl shadow-lg"
            />
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg mb-4">
              Our mission is simple: to inspire people to cook with joy,
              creativity, and confidence. We aim to provide authentic,
              easy-to-follow recipes, rich food photography, and tips that help
              every cook feel proud of what they create.
            </p>
            <p className="text-lg mb-4">
              Beyond recipes, we share stories of chefs, families, and food
              lovers who make cooking a part of their life. Our goal is to
              foster a community where flavor meets passion.
            </p>
            <p className="text-lg">
              We want to empower you to bring the joy of cooking into your home
              every day.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Passion for Cooking</h3>
            <p>
              We believe cooking should be joyful and expressive. Every recipe
              reflects the love and dedication we put into creating it.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Authenticity</h3>
            <p>
              From traditional family recipes to modern twists, we ensure that
              every dish is authentic and true to its roots.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Community</h3>
            <p>
              Our cookbook is more than recipes—it’s about connecting people
              through food and creating a community of passionate cooks.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-10">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
              >
                <div className="relative h-48 w-48 mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-semibold">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-800 py-20 text-center text-white">
        <h2 className="text-4xl font-bold mb-6">Join Our Culinary Journey</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Explore new recipes, share your creations, and become a part of our
          growing community of food lovers.
        </p>
        <Link
          href="/recipes"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-4 rounded-lg transition"
        >
          Explore Recipes
        </Link>
      </section>
    </div>
  );
}
