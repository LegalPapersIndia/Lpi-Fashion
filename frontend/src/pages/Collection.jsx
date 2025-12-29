import React, { useContext, useEffect, useState, useMemo } from "react";
import { ShopContext } from "../contexts/ShopContext";
import ProductItem from "../components/ProductItem";
import { Filter, X } from "lucide-react";

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
      {/* Simplified Hero */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
            Our Collection
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium pieces blending traditional craftsmanship with modern style
          </p>
        </div>
      </section>

      {/* Main Collection Area */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Top Bar: Filter Button + Results + Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilter(true)}
                className="flex items-center gap-2 px-5 py-3 bg-white border border-gray-300 rounded-full font-medium hover:border-gray-500 transition lg:hidden"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFilters > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                    {activeFilters}
                  </span>
                )}
              </button>

              <p className="text-gray-700">
                Showing <span className="font-semibold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "item" : "items"}
              </p>
            </div>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="px-5 py-3 bg-white border border-gray-300 rounded-full font-medium focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="relevant">Sort by: Relevance</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {/* Applied Filters Chips (if any) */}
          {activeFilters > 0 && (
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {[...category, ...subCategory].map((filter) => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm"
                >
                  {filter}
                  <button
                    onClick={() => {
                      if (category.includes(filter)) toggleCategory(filter);
                      if (subCategory.includes(filter)) toggleSubCategory(filter);
                    }}
                    className="hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
              <button onClick={clearFilters} className="text-sm text-amber-700 hover:underline ml-4">
                Clear all
              </button>
            </div>
          )}

          {/* Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block space-y-10">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Category</h3>
                {["Men", "Women", "Kids"].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={category.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                    />
                    <span className="text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Type</h3>
                {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                  <label key={type} className="flex items-center gap-3 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subCategory.includes(type)}
                      onChange={() => toggleSubCategory(type)}
                      className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>

              {activeFilters > 0 && (
                <button onClick={clearFilters} className="text-amber-700 font-medium hover:underline">
                  Clear all filters
                </button>
              )}
            </aside>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-8" />
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    No items match your filters
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your selections
                  </p>
                  <button onClick={clearFilters} className="text-amber-700 font-medium hover:underline">
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
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

      {/* Mobile Filter Bottom Sheet */}
      {showFilter && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col lg:hidden">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Filters</h2>
            <button
              onClick={() => setShowFilter(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-10">
            <div>
              <h3 className="text-lg font-semibold mb-4">Category</h3>
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 py-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <span className="text-gray-700">{cat}</span>
                </label>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Type</h3>
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex items-center gap-3 py-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subCategory.includes(type)}
                    onChange={() => toggleSubCategory(type)}
                    className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 space-y-3">
            <button
              onClick={() => setShowFilter(false)}
              className="w-full py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition"
            >
              Show {filteredProducts.length} {filteredProducts.length === 1 ? "item" : "items"}
            </button>
            {activeFilters > 0 && (
              <button onClick={clearFilters} className="w-full text-center text-amber-700 font-medium">
                Clear all filters
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Collection;