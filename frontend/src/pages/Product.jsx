import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contexts/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import { ArrowRight, Package, RefreshCw, ShieldCheck } from "lucide-react";

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
      if (product.sizes?.length > 0) {
        setSelectedSize(product.sizes[0]); // Pre-select first size
      }
    }
  }, [productId, products]);

  // Loading State
  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Product Section */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-50 shadow-md">
                <img
                  src={selectedImage}
                  alt={productData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {productData.image.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {productData.image.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === img
                          ? "border-amber-600 shadow-sm"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {productData.name}
                </h1>

                <div className="mt-4 flex flex-wrap gap-6 text-gray-600 text-sm">
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Handcrafted in India
                  </span>
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5" />
                    100% Authentic
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-3xl lg:text-4xl font-bold text-gray-900">
                {currency}{productData.price.toLocaleString()}
              </div>

              {/* Size Selector */}
              {productData.sizes?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select Size
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {productData.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-14 h-14 rounded-lg border-2 font-medium transition-all ${
                          selectedSize === size
                            ? "border-amber-600 bg-amber-50 text-amber-700"
                            : "border-gray-300 hover:border-gray-500"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  if (productData.sizes?.length > 0 && !selectedSize) {
                    alert("Please select a size");
                    return;
                  }
                  addToCart(productData._id, selectedSize || "one-size");
                }}
                className="w-full max-w-md py-4 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 transition shadow-md flex items-center justify-center gap-3"
              >
                Add to Cart
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* Trust Badges */}
              <div className="space-y-3 pt-6 border-t border-gray-200 text-gray-600">
                <p className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-amber-600" />
                  30-day free returns
                </p>
                <p className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-amber-600" />
                  Fast & tracked delivery
                </p>
                <p className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  Secure checkout
                </p>
              </div>

              {/* Description */}
              {productData.description && (
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {productData.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </>
  );
};

export default Product;