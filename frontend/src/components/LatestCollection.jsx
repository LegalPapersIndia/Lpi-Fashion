import React, { useContext, useEffect, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import ProductItem from "./ProductItem";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function LatestCollection() {
  const { products } = useContext(ShopContext);

  // Memoized: Get 12 latest products for better grid balance
  const latestProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 12);
  }, [products]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-white">
      {/* Subtle Ambient Background Layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-amber-50/20 via-transparent to-emerald-50/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20 lg:mb-32"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-amber-600 text-sm font-bold uppercase tracking-[0.4em] mb-6"
          >
            Autumn Winter 2025 • New Arrivals
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-none"
          >
            <span className="block text-gray-900">Latest</span>
            <span className="block bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
              Collection
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Discover handcrafted luxury redefined. Each piece embodies timeless Indian artistry,
            premium sustainable fabrics, and contemporary silhouettes — exclusively for the modern connoisseur.
          </motion.p>

          {/* Elegant Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-16 flex items-center justify-center gap-12 origin-center"
          >
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <span className="text-3xl text-amber-500">✦</span>
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </motion.div>
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
            {latestProducts.map((item, index) => (
              <motion.div
                key={item._id}
                variants={itemVariants}
                whileHover={{ y: -12 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  category={item.category}
                  subcategory={item.subCategory}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-32">
            <p className="text-gray-400 text-xl font-light animate-pulse">
              Curating exclusive pieces for you...
            </p>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center mt-28 lg:mt-36"
        >
          <Link
            to="/collection"
            className="group inline-flex items-center gap-5 px-12 py-6 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white text-xl font-semibold shadow-2xl hover:shadow-amber-600/30 hover:from-amber-700 hover:to-amber-800 transition-all duration-500 transform hover:scale-105"
          >
            Explore Full Collection
            <ArrowRight className="w-7 h-7 group-hover:translate-x-4 transition-transform duration-500" />
          </Link>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-sm uppercase tracking-[0.3em] text-gray-500 font-medium"
          >
            Limited Edition • Free Worldwide Shipping • Complimentary Gift Packaging
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}