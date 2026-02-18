import React from "react";
import { Truck, ShieldCheck, RefreshCw, Package, Lock, Info, Calendar } from "lucide-react";

const CartTotal = ({ 
  deliveryFee = 0, 
  currency = "₹", 
  getCartAmount, 
  discount = 0,      // new prop
  isCartPage = false 
}) => {
  const subtotal = getCartAmount ? getCartAmount() : 0;
  const shipping = deliveryFee;
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-7 py-6 bg-gray-50/70 border-b border-gray-100">
        <h3 className="text-2xl font-medium flex items-center gap-3 text-gray-900">
          <Lock size={22} className="text-amber-700" strokeWidth={2.2} />
          Order Summary
        </h3>
      </div>

      {/* Breakdown */}
      <div className="p-7 lg:p-9 space-y-7 text-base">
        <div className="space-y-5">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span className="font-medium">{currency}{subtotal.toLocaleString()}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-700">
              <span>Discount / Offer</span>
              <span>-{currency}{discount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between items-center text-gray-700">
            <span className="flex items-center gap-2">
              Shipping
              <Info size={14} className="text-gray-400" />
            </span>

            {isCartPage ? (
              <span className="text-sm text-amber-800 font-medium">
                Calculated at next step
              </span>
            ) : shipping === 0 ? (
              <span className="text-green-600 font-semibold flex items-center gap-1.5">
                <Truck size={16} /> Free
              </span>
            ) : (
              <span className="font-medium">{currency}{shipping.toLocaleString()}</span>
            )}
          </div>

          {/* Estimated Delivery */}
          <div className="flex justify-between text-sm text-gray-600 pt-2 border-t border-gray-100">
            <span className="flex items-center gap-2">
              <Calendar size={15} className="text-amber-700" />
              Estimated Delivery
            </span>
            <span>3–5 business days (Tracked)</span>
          </div>

          <hr className="border-gray-200 my-5" />

          <div className="flex justify-between items-center text-2xl font-semibold text-gray-900">
            <span>Total</span>
            <span>{currency}{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Trust & Reassurance */}
        <div className="pt-5 grid grid-cols-2 gap-5 text-sm text-gray-600">
          <TrustItem icon={<ShieldCheck size={18} />} text="Secure Checkout" />
          <TrustItem icon={<RefreshCw size={18} />} text="7-Day Returns" />
          <TrustItem icon={<Truck size={18} />} text="Tracked Delivery" />
          <TrustItem icon={<Package size={18} />} text="Premium Packaging" />
        </div>

        <p className="text-xs text-gray-500 text-center pt-4 border-t border-gray-100">
          All prices include applicable taxes. International orders may be subject to customs duties.
        </p>
      </div>
    </div>
  );
};

const TrustItem = ({ icon, text }) => (
  <div className="flex items-start gap-3">
    <div className="text-amber-700 mt-0.5">{icon}</div>
    <span className="leading-tight">{text}</span>
  </div>
);

export default CartTotal;