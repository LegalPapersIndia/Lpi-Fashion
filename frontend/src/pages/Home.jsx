import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Latest Collection */}
      <section className="py-16 lg:py-24 bg-white">
        <LatestCollection />
      </section>

      {/* 3. Our Promise / Policies */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <OurPolicy />
      </section>

      {/* 4. Closing Statement – Clean & Professional */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

          {/* Simple Divider */}
          <div className="max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-12" />

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Crafted with Care.
            <br />
            <span className="text-amber-700">Designed to Last.</span>
          </h2>

          {/* Supporting Text */}
          <p className="mt-8 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We combine traditional craftsmanship with modern design to create timeless pieces that are comfortable, durable, and responsibly made.
          </p>

          {/* CTA Button */}
          <div className="mt-12">
            <Link
              to="/collection"
              className="inline-flex items-center gap-4 px-10 py-5 bg-gray-900 text-white text-lg font-medium rounded-full hover:bg-gray-800 transition shadow-md"
            >
              Shop the Collection
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>

          {/* Trust Indicators */}
          <p className="mt-10 text-sm text-gray-500 uppercase tracking-wider font-medium">
            Free Shipping Worldwide • 30-Day Returns • Secure Checkout
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;