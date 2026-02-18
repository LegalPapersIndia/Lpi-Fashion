import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import ProductItem from "../components/ProductItem";
import { Filter, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (val) =>
    setCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );

  const toggleSubCategory = (val) =>
    setSubCategory((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (showSearch && search) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      result = result.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      result = result.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sortType === "low-high") result.sort((a, b) => a.price - b.price);
    if (sortType === "high-low") result.sort((a, b) => b.price - a.price);

    return result;
  }, [products, search, showSearch, category, subCategory, sortType]);

  const activeFilters = category.length + subCategory.length;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Our Collection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover handcrafted luxury — where tradition meets modern elegance
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Top Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilter(true)}
                className="flex items-center gap-3 px-6 py-3.5 bg-white border border-gray-200 rounded-full font-medium hover:border-amber-500 hover:shadow-md transition-all lg:hidden"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFilters > 0 && (
                  <span className="ml-2 px-3 py-1 bg-amber-600 text-white text-xs rounded-full font-semibold">
                    {activeFilters}
                  </span>
                )}
              </button>

              <p className="text-gray-700 font-medium">
                Showing <span className="font-bold text-gray-900">{filteredProducts.length}</span>{" "}
                {filteredProducts.length === 1 ? "item" : "items"}
              </p>
            </div>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="px-6 py-3.5 bg-white border border-gray-200 rounded-full font-medium focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all cursor-pointer"
            >
              <option value="relevant">Sort by: Relevance</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block space-y-12 sticky top-24 h-fit">
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Category</h3>
                {["Men", "Women", "Kids"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 py-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={category.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-gray-700 group-hover:text-amber-700 transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Type</h3>
                {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                  <label key={type} className="flex items-center gap-3 py-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={subCategory.includes(type)}
                      onChange={() => toggleSubCategory(type)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-gray-700 group-hover:text-amber-700 transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>

              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-amber-700 font-medium hover:text-amber-800 transition flex items-center gap-2"
                >
                  <X size={18} /> Clear all filters
                </button>
              )}
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-32 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full mb-8 flex items-center justify-center">
                    <X className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    No matching items found
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Try adjusting your filters or search term
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {filteredProducts.map((item) => (
                    <ProductItem
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilter && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col lg:hidden"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="p-3 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-12">
              <div>
                <h3 className="text-xl font-semibold mb-6">Category</h3>
                {["Men", "Women", "Kids"].map((cat) => (
                  <label key={cat} className="flex items-center gap-4 py-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={category.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-6 h-6 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-lg text-gray-700 group-hover:text-amber-700 transition">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-6">Type</h3>
                {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                  <label key={type} className="flex items-center gap-4 py-4 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={subCategory.includes(type)}
                      onChange={() => toggleSubCategory(type)}
                      className="w-6 h-6 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-lg text-gray-700 group-hover:text-amber-700 transition">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 space-y-4">
              <button
                onClick={() => setShowFilter(false)}
                className="w-full py-5 bg-gray-900 text-white font-semibold text-lg rounded-full hover:bg-gray-800 transition shadow-md"
              >
                Show {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
              </button>

              {activeFilters > 0 && (
                <button
                  onClick={() => {
                    clearFilters();
                    setShowFilter(false);
                  }}
                  className="w-full text-center text-amber-700 font-medium hover:text-amber-800 transition"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Collection;