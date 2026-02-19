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
  const [user, setUser] = useState(null);
  const [appliedPromo, setAppliedPromo] = useState(null); // ← promo state yahan

  const navigate = useNavigate();

  // Promo functions
  const applyPromo = (promoObj) => {
    setAppliedPromo(promoObj);
  };

  const clearPromo = () => {
    setAppliedPromo(null);
  };

  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;

  // Token load from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  // Redirect if logged in on login page
  useEffect(() => {
    if (token && window.location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  // Sync token to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        setUser(null);
        return;
      }
      try {
        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { token },
        });
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setToken("");
          setUser(null);
          toast.error("Session expired. Please login again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };
    fetchUserProfile();
  }, [token, backendUrl, navigate]);

  // Fetch products
  const getProductsData = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/product/list`);
      if (res.data.success) setProducts(res.data.products);
    } catch (error) {
      console.error("Product fetch error:", error);
      toast.error("Failed to load products");
    }
  };

  // Fetch user cart
  const getUserCart = async (userToken) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token: userToken } }
      );
      if (res.data.success) setCartItems(res.data.cartData || {});
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  const addToCart = async (itemId, size) => {
    if (!size) return toast.error("Please select a size");

    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
      } catch (err) {
        toast.error("Failed to add to cart");
      }
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity <= 0) {
      if (cartData[itemId]) delete cartData[itemId][size];
      if (cartData[itemId] && Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
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
      } catch (err) {
        toast.error("Failed to update cart");
      }
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) count += cartItems[items][size];
    }
    return count;
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (product) {
        for (const size in cartItems[id]) {
          total += product.price * cartItems[id][size];
        }
      }
    }
    return total;
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (token) getUserCart(token);
    else setCartItems({});
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
    updateQuantity,
    getCartCount,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    user,
    setUser,
    navigate,

    // Promo exports
    appliedPromo,
    discountAmount,
    applyPromo,
    clearPromo,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;