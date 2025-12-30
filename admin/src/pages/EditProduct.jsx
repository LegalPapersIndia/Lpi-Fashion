import React, { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets"; 
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const EditProduct = ({ token }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get productId from navigation state or URL if needed
  const productId = location.state?.productId;

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product when component mounts
  useEffect(() => {
    if (!productId) {
      toast.error("No product selected for editing");
      navigate("/list");
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await axios.post(
          backendUrl + "/api/product/single",
          { productId },
          { headers: { token } }
        );

        if (response.data.success) {
          const p = response.data.product;
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price);
          setCategory(p.category);
          setSubCategory(p.subCategory);
          setBestseller(p.bestseller || false);
          setSizes(p.sizes || []);
          setExistingImages(p.image || []);
        } else {
          toast.error(response.data.message);
          navigate("/list");
        }
      } catch (error) {
        toast.error("Failed to load product");
        console.log(error);
        navigate("/list");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("id", productId);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/update",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Update failed");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading product...</div>;
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 pb-10">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {/* Current Images */}
      {existingImages.length > 0 && (
        <div className="w-full">
          <p className="mb-3 font-medium">Current Images (will be replaced if you upload new ones):</p>
          <div className="flex gap-4 flex-wrap">
            {existingImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index + 1}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>
      )}

      {/* New Image Uploads */}
      <div className="w-full">
        <p className="mb-3 font-medium">Upload New Images (Optional)</p>
        <div className="flex gap-4">
          <label className="cursor-pointer">
            <img
              className="w-24 h-24 border rounded object-cover"
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
            />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" hidden />
          </label>
          <label className="cursor-pointer">
            <img
              className="w-24 h-24 border rounded object-cover"
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
            />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" hidden />
          </label>
          <label className="cursor-pointer">
            <img
              className="w-24 h-24 border rounded object-cover"
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
            />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" hidden />
          </label>
          <label className="cursor-pointer">
            <img
              className="w-24 h-24 border rounded object-cover"
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
            />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" hidden />
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div>
          <p className="mb-2">Product Name</p>
          <input
            className="w-full px-4 py-2 border rounded"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="mb-2">Price</p>
          <input
            className="w-full px-4 py-2 border rounded"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <p className="mb-2">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Sub Category</p>
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          className="w-full px-4 py-3 border rounded"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-3">Sizes</p>
        <div className="flex gap-4">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((s) => s !== size)
                    : [...prev, size]
                )
              }
              className="cursor-pointer"
            >
              <p
                className={`px-6 py-3 border rounded ${
                  sizes.includes(size) ? "bg-pink-200 border-pink-600" : "bg-gray-100"
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          className="px-8 py-3 bg-black text-white rounded hover:bg-gray-800"
        >
          UPDATE PRODUCT
        </button>
        <button
          type="button"
          onClick={() => navigate("/list")}
          className="px-8 py-3 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
};

export default EditProduct;