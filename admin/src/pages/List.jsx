import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList(); // Refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to remove product");
    }
  };

  const handleEdit = (productId) => {
    navigate("/edit", { state: { productId } });
  };

  useEffect(() => {
    if (token) fetchList();
  }, [token]);

  return (
    <>
      <p className="mb-6 text-2xl font-semibold">All Products List</p>

      <div className="flex flex-col gap-3">
        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 py-3 px-4 bg-gray-100 border-b text-sm font-medium">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Actions</b>
        </div>

        {/* Product Rows */}
        {list.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No products found.</p>
        ) : (
          list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-2 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] gap-4 items-center py-4 px-4 border rounded-lg shadow-sm hover:shadow transition"
            >
              <img
                className="w-16 h-16 object-cover rounded-md"
                src={item.image[0]}
                alt={item.name}
              />

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500 md:hidden">{item.category}</p>
              </div>

              <p className="hidden md:block">{item.category}</p>

              <p className="font-semibold">
                {currency}
                {item.price}
              </p>

              <div className="flex justify-center gap-6 text-lg">
                <button
                  onClick={() => handleEdit(item._id)}
                  className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeProduct(item._id)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default List;