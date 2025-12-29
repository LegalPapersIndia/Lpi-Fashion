import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Mail, Lock, User } from "lucide-react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Prevent rendering if already authenticated
  if (token) return null;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
      }

      if (response.data.success) {
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem("token", newToken);
        toast.success(
          currentState === "Login" ? "Welcome back!" : "Account created successfully!"
        );
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to connect. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            {currentState === "Login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            {currentState === "Login"
              ? "Sign in to access your account"
              : "Join us and start shopping"}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8">
          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Name - Only for Sign Up */}
            {currentState === "Sign Up" && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
                  placeholder="••••••••"
                  minLength="6"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gray-900 text-white font-semibold text-lg rounded-lg hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  {currentState === "Login" ? "Sign In" : "Create Account"}
                </>
              )}
            </button>
          </form>

          {/* Toggle Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {currentState === "Login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setCurrentState("Sign Up")}
                    className="text-amber-700 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setCurrentState("Login")}
                    className="text-amber-700 font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Benefits - Subtle */}
          {currentState === "Sign Up" && (
            <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
              <p>Enjoy free shipping, easy returns, and exclusive updates</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;