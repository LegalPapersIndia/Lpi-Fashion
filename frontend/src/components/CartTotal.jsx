import React from "react";
import { Truck, ShieldCheck, RefreshCw, Package, Lock, Info } from "lucide-react";

const CartTotal = ({ deliveryFee = 0, currency = "₹", getCartAmount, isCartPage = false }) => {
  const subtotal = getCartAmount ? getCartAmount() : 0;
  const shipping = deliveryFee;
  const total = subtotal + shipping;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <h3 className="text-xl font-semibold flex items-center gap-2.5 text-gray-900">
          <Lock size={20} className="text-amber-600" />
          Order Summary
        </h3>
      </div>

      <div className="p-6 lg:p-8 space-y-6">
        <div className="space-y-4 text-base">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>{currency}{subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-gray-700">
            <span>Shipping</span>
            {isCartPage ? (
              <span className="text-sm text-amber-700 flex items-center gap-1.5">
                <Info size={14} />
                Calculated at checkout
              </span>
            ) : (
              <span className={shipping === 50 ? "text-green-600 font-medium" : ""}>
                {shipping === 0 ? "Free" : `${currency}${shipping}`}
              </span>
            )}
          </div>

          <hr className="border-gray-200 my-4" />

          <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
            <span>Total</span>
            <span>{currency}{total.toLocaleString()}</span>
          </div>
        </div>

        <div className="pt-6 space-y-3.5 text-sm text-gray-600">
          <TrustItem icon={<ShieldCheck size={18} />} text="100% Secure Payment" />
          <TrustItem icon={<RefreshCw size={18} />} text="Easy 7-day Returns" />
          <TrustItem icon={<Truck size={18} />} text="Fast & Tracked Delivery" />
          <TrustItem icon={<Package size={18} />} text="Carefully Packaged" />
        </div>
      </div>
    </div>
  );
};

const TrustItem = ({ icon, text }) => (
  <div className="flex items-center gap-3">
    <div className="text-amber-600">{icon}</div>
    <span>{text}</span>
  </div>
);

export default CartTotal;