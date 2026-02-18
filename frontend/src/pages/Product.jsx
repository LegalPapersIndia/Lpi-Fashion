import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { ArrowRight, Package, RefreshCw, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setSelectedImage(product.image[0]);
      if (product.sizes?.length > 0) setSelectedSize(product.sizes[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-6" />
          <p className="text-xl text-gray-600">Loading your exclusive piece...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Product */}
      <section className="py-12 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Images – Gallery style */}
            <div className="space-y-6 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50 shadow-xl border border-gray-100"
              >
                <img
                  src={selectedImage}
                  alt={productData.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>

              {productData.image.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productData.image.map((img, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImage === img
                          ? "border-amber-600 shadow-md"
                          : "border-gray-200 hover:border-amber-400"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Info – Premium layout */}
            <div className="flex flex-col space-y-10 lg:space-y-12">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {productData.name}
                </h1>

                <div className="mt-6 flex flex-wrap gap-6 text-gray-600">
                  <span className="flex items-center gap-2 text-sm lg:text-base">
                    <Package size={20} className="text-amber-600" />
                    Handcrafted in India
                  </span>
                  <span className="flex items-center gap-2 text-sm lg:text-base">
                    <ShieldCheck size={20} className="text-amber-600" />
                    100% Authentic
                  </span>
                </div>
              </div>

              <div className="text-4xl lg:text-5xl font-bold text-gray-900">
                {currency}{productData.price.toLocaleString()}
              </div>

              {/* Size Selector */}
              {productData.sizes?.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-5">Select Size</h3>
                  <div className="flex flex-wrap gap-4">
                    {productData.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.08 }}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[60px] h-14 rounded-xl border-2 font-medium text-lg transition-all duration-300 ${
                          selectedSize === size
                            ? "border-amber-600 bg-amber-50 text-amber-700 shadow-sm"
                            : "border-gray-300 hover:border-amber-400 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart + Wishlist */}
              <div className="flex flex-col sm:flex-row gap-6">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (productData.sizes?.length > 0 && !selectedSize) {
                      alert("Please select a size first");
                      return;
                    }
                    addToCart(productData._id, selectedSize || "one-size");
                  }}
                  className="flex-1 py-5 bg-gradient-to-r from-gray-900 to-black text-white font-semibold text-lg rounded-xl hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-3"
                >
                  Add to Cart
                  <ArrowRight className="w-6 h-6" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-5 border-2 border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all flex items-center justify-center"
                >
                  <Heart size={24} className="text-gray-600 hover:text-red-500" />
                </motion.button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 text-sm text-gray-600">
                <div className="text-center">
                  <RefreshCw className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p>30-day Returns</p>
                </div>
                <div className="text-center">
                  <Package className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p>Fast Delivery</p>
                </div>
                <div className="text-center">
                  <ShieldCheck className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <p>Secure Checkout</p>
                </div>
              </div>

              {/* Description */}
              {productData.description && (
                <div className="pt-10 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-5">Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {productData.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </>
  );
};

export default Product;