import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const SLIDE_INTERVAL = 8000; // Slightly slower for luxury feel

const heroSlides = [
  {
    image:
      "https://img.freepik.com/free-photo/studio-close-up-portrait-young-fresh-blonde-woman-brown-straw-poncho-wool-black-trendy-hat-round-glasses-looking-camera-green-leather-had-bag_273443-1121.jpg?semt=ais_hybrid&w=1600&q=80",
    headline: "Timeless Heritage",
    subheadline: "Redefined for the Modern Soul",
    tagline: "Autumn Winter 2025 Exclusive Collection",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=80&w=1600",
    headline: "Fusion Elegance",
    subheadline: "Where Tradition Meets Contemporary Luxury",
    tagline: "Handcrafted Mastery • Global Appeal",
  },
  {
    image:
      "https://img.freepik.com/free-photo/portrait-handsome-confident-stylish-hipster-lambersexual-modelman-dressed-black-jacket-jeans-fashion-male-posing-studio-near-grey-wall_158538-24002.jpg?semt=ais_hybrid&w=1600&q=80",
    headline: "Royal Craftsmanship",
    subheadline: "Every Thread Tells a Story",
    tagline: "Artisanal Excellence from India",
  },
  {
    image:
      "https://media.istockphoto.com/id/2182695319/photo/cute-baby-girl-wearing-autumn-clothes.jpg?s=612x612&w=0&k=20&c=gHqAY12xAVQE-JASvzExntcWRLhui0j9eIvRHhSenWg=",
    headline: "Autumn Winter 2025",
    subheadline: "New Season. New Stories.",
    tagline: "Fresh Arrivals • Limited Edition",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [paused, next]);

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Slides with Parallax Zoom Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1.15 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroSlides[current].image}
            alt={heroSlides[current].headline}
            className="h-full w-full object-cover"
            loading="eager"
          />

          {/* Premium Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-3xl">
            {/* Animated Tagline */}
            <motion.p
              key={`tag-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-amber-400 text-sm tracking-widest uppercase font-medium mb-6"
            >
              {heroSlides[current].tagline}
            </motion.p>

            {/* Headline Animation */}
            <motion.h1
              key={`headline-${current}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-6xl sm:text-7xl lg:text-8xl font-extrabold leading-tight text-white"
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl mb-2 opacity-90">
                LPI
              </span>
              <span className="block text-amber-500 drop-shadow-lg">
                {heroSlides[current].headline}
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              key={`sub-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.9 }}
              className="mt-8 text-xl lg:text-2xl text-gray-200 max-w-2xl leading-relaxed"
            >
              {heroSlides[current].subheadline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              <Link
                to="/collection"
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-full bg-amber-600 text-white text-lg font-semibold shadow-2xl hover:bg-amber-500 hover:shadow-amber-500/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                Shop the Collection
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>

              <Link
                to="/collection"
                className="px-10 py-5 rounded-full border-2 border-white/60 text-white text-lg font-medium backdrop-blur-sm hover:bg-white/10 hover:border-white transition-all duration-300"
              >
                Explore All Styles
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="mt-16 flex flex-wrap gap-8 text-sm text-gray-300 tracking-wide"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                Free Worldwide Shipping
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                30-Day Easy Returns
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
                Handcrafted in India
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Elegant Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-0.5 rounded-full transition-all duration-500 ${
                index === current
                  ? "w-16 bg-amber-500"
                  : "w-10 bg-white/40 group-hover:bg-white/70"
              }`}
            />
            {index === current && (
              <motion.span
                layoutId="activeIndicator"
                className="absolute inset-0 h-0.5 bg-amber-400 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation Arrows - Minimal & Elegant */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Progress Bar (Subtle) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
          className="h-full bg-amber-500"
        />
      </div>
    </section>
  );
}