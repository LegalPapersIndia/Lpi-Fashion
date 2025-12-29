import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Verify from "./pages/Verify";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OurPolicy from "./components/OurPolicy";
import TermsOfService from "./components/TandC";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
        toastClassName="font-medium"
      />

      {/* Fixed Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <Navbar />
      </header>

      {/* Scroll to Top Component */}
      <ScrollToTop />

      {/* Main Content - Proper padding to avoid overlap with fixed navbar */}
      <main className="flex-1 pt-20 lg:pt-24">
        {/* pt-20 ≈ 80px (mobile), pt-24 ≈ 96px (desktop) */}
        {/* Aapke Navbar ki height ~72-80px hai, isliye safe spacing */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/our-policy" element={<OurPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />

          {/* 404 Not Found */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
                <div className="text-center">
                  <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-2xl text-gray-600 mb-8">Page not found</p>
                  <Link
                    to="/"
                    className="text-amber-700 font-semibold text-lg hover:underline"
                  >
                    ← Return to Home
                  </Link>
                </div>
              </div>
            }
          />
        </Routes>
      </main>


      <Footer />
    </div>
  );
};

export default App;