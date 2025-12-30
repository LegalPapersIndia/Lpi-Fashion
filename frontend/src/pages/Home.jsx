import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <main className="overflow-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Latest Collection */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-b from-white via-amber-50/20 to-white">
        <LatestCollection />
      </section>

      {/* 3. Our Policy / Promise */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white">
        <OurPolicy />
      </section>

      {/* 4. Grand Closing Statement – Luxurious & Emotional */}
      <section className="relative py-28 lg:py-40 overflow-hidden bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30">
        {/* Ambient Background Layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-amber-200/50 to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
          {/* Elegant Animated Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent mb-16"
          />

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-tight tracking-tight"
          >
            Crafted with Soul.
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-md">
              Designed to Endure.
            </span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-10 text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-4"
          >
            Every stitch tells a story. We blend centuries-old Indian craftsmanship 
            with contemporary elegance to create heirloom-quality pieces that transcend trends — 
            sustainably made, ethically sourced, and built to be cherished for generations.
          </motion.p>

          {/* Premium CTA Button with Shimmer */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mt-16"
          >
            <Link
              to="/collection"
              className="group relative inline-flex items-center gap-6 px-16 py-8 rounded-full text-2xl font-bold text-white overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-700"
            >
              {/* Gradient Base */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600 rounded-full" />
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
              
              {/* Inner Glow */}
              <div className="absolute inset-0 rounded-full shadow-inner shadow-white/20" />

              <span className="relative z-10 drop-shadow-lg">
                Discover the Collection
              </span>
              
              <ArrowRight className="w-9 h-9 relative z-10 group-hover:translate-x-4 transition-transform duration-700" />
            </Link>
          </motion.div>

          {/* Trust & Prestige Indicators */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-16 text-sm lg:text-base uppercase tracking-[0.5em] text-gray-600 font-semibold"
          >
            Complimentary Worldwide Shipping • 30-Day Effortless Returns • Secure & Discreet Checkout
          </motion.p>

          {/* Subtle Signature */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-sm text-gray-500 italic font-light"
          >
            — Est. 2025 • Handcrafted in India with Love —
          </motion.p>
        </div>
      </section>
    </main>
  );
};

export default Home;