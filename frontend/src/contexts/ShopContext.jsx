import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "₹";
  const deliveryFee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null); // ← NEW: Store user data (name, etc.)

  const navigate = useNavigate();

  // Load token from localStorage on app start
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Redirect from /login to home if already logged in
  useEffect(() => {
    if (token && window.location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  // Sync token with localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Fetch user profile when token is available
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });

        if (response.data.success) {
          setUser(response.data.user); // { name, email, ... }
        } else {
          // Invalid token → logout
          setToken("");
          setUser(null);
          toast.error("Session expired. Please login again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Optional: handle token expiry
      }
    };

    fetchUserProfile();
  }, [token, backendUrl, navigate]);

  // Fetch products
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Product fetch error:", error);
      toast.error("Failed to load products");
    }
  };

  // Fetch cart
  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  // Add to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        toast.error("Failed to sync cart");
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity <= 0) {
      delete cartData[itemId]?.[size];
      if (cartData[itemId] && Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        toast.error("Failed to update cart");
      }
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        count += cartItems[items][size];
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const items in cartItems) {
      const product = products.find((p) => p._id === items);
      if (product) {
        for (const size in cartItems[items]) {
          total += product.price * cartItems[items][size];
        }
      }
    }
    return total;
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    } else {
      setCartItems({});
    }
  }, [token]);

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    user,           // ← NEW
    setUser,        // ← NEW (if needed elsewhere)
    navigate,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;