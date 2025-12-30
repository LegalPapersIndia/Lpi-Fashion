import React, { useContext, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import ProductItem from "./ProductItem";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);

  const latestProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products]
      .sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0))
      .slice(0, 12);
  }, [products]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Floating Background Orbs with Parallax Feel */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-amber-300/20 to-orange-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 -right-32 w-80 h-80 bg-gradient-to-bl from-emerald-300/20 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-t from-amber-100/30 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-150px" }}
          className="text-center mb-16 lg:mb-24"
        >
          <motion.div variants={titleVariants}>
            <p className="text-sm lg:text-base font-semibold uppercase tracking-[0.5em] text-amber-700 mb-6 opacity-90">
              Autumn Winter 2025 • New Arrivals
            </p>
          </motion.div>

          <motion.h2
            variants={titleVariants}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none mb-8"
          >
            <span className="block text-gray-900">Latest</span>
            <span className="block bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm">
              Collection
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light px-4"
          >
            Discover handcrafted luxury redefined. Each piece embodies timeless Indian artistry,
            premium sustainable fabrics, and contemporary silhouettes — exclusively for the modern connoisseur.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        {latestProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12"
          >
            {latestProducts.map((item) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -16, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group"
              >
                <div className="relative">
                  {/* Subtle glow on hover */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700 -z-10" />
                  
                  <ProductItem
                    id={item._id}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    subcategory={item.subCategory}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-40">
            <div className="space-y-4">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-200 to-emerald-200 rounded-full blur-2xl animate-pulse" />
              <p className="text-2xl text-gray-400 font-light animate-pulse">
                Curating exclusive pieces for you...
              </p>
            </div>
          </div>
        )}

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-center mt-32 lg:mt-40"
        >
          <Link
            to="/collection"
            className="group relative inline-flex items-center gap-6 px-14 py-7 rounded-full text-xl lg:text-2xl font-bold text-white overflow-hidden transform hover:scale-105 transition-all duration-700 shadow-2xl"
          >
            {/* Gradient Background with Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
            
            <span className="relative z-10 drop-shadow-md">
              Explore Full Collection
            </span>
            
            <ArrowRight className="w-8 h-8 relative z-10 group-hover:translate-x-6 transition-transform duration-700" />
          </Link>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-sm lg:text-base uppercase tracking-[0.4em] text-gray-500 font-medium"
          >
            Limited Edition • Free Worldwide Shipping • Complimentary Gift Packaging
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}