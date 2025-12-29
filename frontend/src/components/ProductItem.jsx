import React, { useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Safely handle image (string or array)
  const productImage = Array.isArray(image) ? image[0] : image;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <Link to={`/product/${id}`} className="block aspect-[3/4] overflow-hidden bg-gray-50">
        <img
          src={productImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <Link to={`/product/${id}`} className="block">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-2 hover:text-amber-700 transition-colors">
            {name}
          </h3>
        </Link>

        <p className="mt-3 text-xl font-semibold text-gray-900">
          {currency}{price.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;