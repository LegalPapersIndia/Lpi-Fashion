import React, { useContext, useEffect, useState } from "react";
import {
  NavLink,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Package,
  LogOut,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {

    getCartCount,
    token,
    setToken,
    setCartItems,
    user,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  const navItems = ["Home", "Collection", "About", "Contact"];
  const userFirstName = user?.name ? user.name.trim().split(" ")[0] : null;

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2.5 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-sm">
            {/* Left Side - Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <a
                href="mailto:support@lpifashion.com"
                className="flex items-center gap-2 hover:text-amber-400 transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>support@lpifashion.com</span>
              </a>
              <a
                href="tel:+917505266931"
                className="flex items-center gap-2 hover:text-amber-400 transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>+91 75052 66931</span>
              </a>
              <div className="hidden md:flex items-center gap-2 opacity-90">
                <MapPin className="w-4 h-4" />
                <span>Noida , Uttar Pradesh , India</span>
              </div>
            </div>

            {/* Optional Right Side (e.g., free shipping message) */}
            <div className="text-center text-amber-300 font-medium">
              Free Shipping on Orders Above ₹1999
            </div>
          </div>
        </div>
      </div>

      {/* Solid White Navbar */}
      <header
        className={`fixed inset-x-0 top-10 z-50 bg-white transition-shadow duration-500 ${
          scrolled
            ? "shadow-lg border-b border-gray-100"
            : "shadow-md border-b border-gray-50"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                <span className="text-gray-900">LPI</span>
                <span className="text-amber-600 group-hover:text-amber-700 transition-colors">
                  Fashion
                </span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <li key={item}>
                  <NavLink
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `relative text-base font-medium transition-all duration-300 pb-1 ${
                        isActive
                          ? "text-amber-600"
                          : "text-gray-700 hover:text-amber-600"
                      } ${isActive ? "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-amber-600" : ""}`
                    }
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 p-2.5 rounded-full hover:bg-amber-50 transition-all duration-200 group focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  aria-label="Account menu"
                >
                  <User className="w-5 h-5 text-gray-700 group-hover:text-amber-600 transition-colors" />
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                      profileOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-3 w-80 origin-top-right animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
                        <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 text-white">
                          <p className="text-xl font-bold">
                            Hello, {token ? (userFirstName || "User") : "Guest"}!
                          </p>
                          <p className="text-sm opacity-90 mt-1">
                            {token ? "Welcome back to your account" : "Join us for exclusive perks"}
                          </p>
                        </div>

                        <div className="p-4 space-y-2">
                          {token ? (
                            <>
                              <button
                                onClick={() => {
                                  navigate("/orders");
                                  setProfileOpen(false);
                                }}
                                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                              >
                                <Package className="w-5 h-5 text-gray-600 group-hover:text-amber-600" />
                                <span className="font-medium text-gray-800">My Orders</span>
                              </button>

                              <button
                                onClick={logout}
                                className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-red-50 transition-all duration-200 text-red-600 group"
                              >
                                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-semibold">Logout</span>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => {
                                navigate("/login");
                                setProfileOpen(false);
                              }}
                              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                            >
                              Login / Sign Up
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-full hover:bg-amber-50 transition-all duration-200 group"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white shadow-md animate-pulse">
                    {getCartCount() > 99 ? "99+" : getCartCount()}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-full hover:bg-amber-50 transition-all duration-200"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-gray-800" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-extrabold tracking-tight">
                <span className="text-gray-900">LPI</span>
                <span className="text-amber-600">Fashion</span>
              </h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full hover:bg-gray-100 transition"
              >
                <X className="w-7 h-7 text-gray-700" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-8 py-5 text-xl font-medium transition-all duration-300 ${
                      isActive
                        ? "text-amber-600 bg-amber-50 border-r-4 border-amber-600"
                        : "text-gray-800 hover:text-amber-600 hover:bg-amber-50"
                    }`
                  }
                >
                  {item}
                </NavLink>
              ))}
            </nav>

            {/* Bottom Section - Auth */}
            <div className="border-t border-gray-100 p-6 space-y-5 bg-gradient-to-b from-gray-50 to-white">
              {token ? (
                <>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">
                      Hello, {userFirstName || "User"}!
                    </p>
                    <p className="text-sm text-gray-600 mt-1">Welcome back</p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/orders");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-white hover:bg-amber-50 font-medium shadow transition-all duration-300"
                  >
                    <Package className="w-5 h-5 text-amber-600" />
                    My Orders
                  </button>

                  <button
                    onClick={logout}
                    className="w-full py-4 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                >
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;