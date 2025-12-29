import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { useLocation } from "react-router-dom";
import { Search, X, Sparkles } from "lucide-react";

const SearchBar = () => {
  const { search, showSearch, setSearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(location.pathname.includes("collection"));
  }, [location]);

  if (!showSearch || !visible) return null;

  return (
    <>
      {/* Luxury Full-Screen Search Overlay */}
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-3xl transition-opacity duration-700">
        {/* Golden Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/30 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative h-full flex flex-col items-center justify-center px-6 lg:px-16">
          {/* Close Button - Top Right */}
          <button
            onClick={() => setShowSearch(false)}
            className="absolute top-10 right-10 p-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-500 group"
          >
            <X className="w-8 h-8 text-white group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300" />
          </button>

          {/* Main Search Interface */}
          <div className="w-full max-w-5xl">
            {/* Elegant Pre-title */}
            <div className="text-center mb-12">
              <p className="text-amber-400 font-bold uppercase tracking-widest text-lg flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 animate-pulse" />
                Search the Collection
                <Sparkles className="w-6 h-6 animate-pulse" />
              </p>
            </div>

            {/* Ultra-Premium Search Input */}
            <div className="relative group">
              <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-10 h-10 text-amber-500 transition-all duration-500 group-focus-within:scale-110" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Discover luxury pieces, designers, or rare finds..."
                className="w-full pl-28 pr-12 py-9 text-2xl lg:text-3xl font-light text-white bg-white/10 backdrop-blur-2xl border border-white/20 rounded-full outline-none placeholder-gray-400 focus:bg-white/20 focus:border-amber-500/50 transition-all duration-700 shadow-2xl"
                autoFocus
              />

              {/* Floating Golden Border */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent group-focus-within:border-amber-500/40 pointer-events-none transition-all duration-700 shadow-2xl shadow-amber-500/20"></div>

              {/* Pulse Ring Effect */}
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/30 scale-100 group-focus-within:scale-110 opacity-0 group-focus-within:opacity-100 transition-all duration-1000 animate-pulse"></div>
            </div>

            {/* Search Tips */}
            <div className="text-center mt-10">
              <p className="text-gray-300 text-lg font-light tracking-wide">
                Type your desire • Press <kbd className="px-3 py-1.5 mx-2 bg-white/10 rounded-lg text-amber-400 font-medium">Enter</kbd> to explore
              </p>
              <p className="text-gray-500 text-sm mt-4 uppercase tracking-widest">
                Over <span className="text-amber-400 font-bold text-xl">12,000+</span> hand-curated masterpieces
              </p>
            </div>
          </div>

          {/* Decorative Golden Line */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        </div>
      </div>

      {/* Push page content down */}
      <div className="h-screen" />
    </>
  );
};

export default SearchBar;