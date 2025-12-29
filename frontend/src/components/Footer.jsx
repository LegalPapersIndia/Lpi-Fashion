import React from "react";
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">

        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">

          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">
                <span className="text-white">LPI</span>
                <span className="text-amber-600"> Fashion</span>
              </h2>
            </Link>

            <p className="text-gray-400 leading-relaxed max-w-md">
              Premium fashion blending traditional Indian craftsmanship with modern design. 
              Timeless pieces crafted for quality, comfort, and everyday elegance.
            </p>

            {/* Newsletter */}
            <div className="max-w-md">
              <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-3">
                Stay Updated
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-5 py-3 bg-gray-800 border border-gray-700 rounded-full placeholder-gray-500 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/30 transition"
                  required
                />
                <button
                  type="submit"
                  className="px-7 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 active:scale-95 transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3">
                New arrivals, exclusive offers, and early access to sales.
              </p>
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-5">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/collection?sort=latest" className="text-gray-400 hover:text-amber-500 transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/collection?sort=bestseller" className="text-gray-400 hover:text-amber-500 transition">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/collection?category=Women" className="text-gray-400 hover:text-amber-500 transition">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/collection?category=Men" className="text-gray-400 hover:text-amber-500 transition">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/collection?category=Kids" className="text-gray-400 hover:text-amber-500 transition">
                  Kids
                </Link>
              </li>
              <li>
                <Link to="/collection?category=Accessories" className="text-gray-400 hover:text-amber-500 transition">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/collection?discount=true" className="text-gray-400 hover:text-amber-500 transition">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-white mb-5">Customer Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/orders" className="text-gray-400 hover:text-amber-500 transition">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-amber-500 transition">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-amber-500 transition">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-amber-500 transition">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-amber-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-amber-500 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-5">Contact</h3>
              <div className="space-y-4 text-gray-400">
                <a href="tel:+919876543210" className="flex items-center gap-3 hover:text-amber-500 transition">
                  <Phone className="w-5 h-5 text-amber-600" />
                  <span>+91 98765 43210</span>
                </a>
                <a href="mailto:hello@lpifashion.com" className="flex items-center gap-3 hover:text-amber-500 transition">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <span>hello@lpifashion.com</span>
                </a>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  <span>Mumbai, India</span>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div>
              <p className="text-sm font-medium text-amber-600 uppercase tracking-wider mb-4">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/lpifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                </a>
                <a
                  href="https://facebook.com/lpifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-all duration-300 group"
                >
                  <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                </a>
                <a
                  href="https://youtube.com/lpifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-all duration-300 group"
                >
                  <Youtube className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                </a>
                <a
                  href="https://twitter.com/lpifashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-all duration-300 group"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} <span className="text-amber-600 font-medium">LPI Fashion</span>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/our-policy" className="hover:text-amber-500 transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-amber-500 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;