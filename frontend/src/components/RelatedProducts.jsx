import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0 && category) {
      let filtered = products.filter((item) => item.category === category);

      if (subCategory) {
        filtered = filtered.filter((item) => item.subCategory === subCategory);
      }

      // Show up to 5 related products (excluding current if possible)
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (related.length === 0) return null;

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Related Products
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Explore more from {subCategory || category}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
          {related.map((item) => (
            <ProductItem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-gray-700 font-medium hover:text-amber-700 transition"
          >
            View All →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;