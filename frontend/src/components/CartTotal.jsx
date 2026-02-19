import React from "react";
import { 
  Truck, 
  ShieldCheck, 
  RefreshCw, 
  Package, 
  Lock, 
  Info, 
  Calendar, 
  IndianRupee 
} from "lucide-react";

const CartTotal = ({ 
  deliveryFee = 0, 
  currency = "₹", 
  getCartAmount, 
  discount = 0,
  isCartPage = false 
}) => {
  const subtotal = getCartAmount ? getCartAmount() : 0;
  const shipping = deliveryFee;
  const discountAmount = discount; // already passed as amount
  const finalTotal = subtotal + shipping - discountAmount;

  const hasDiscount = discountAmount > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100/80 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 md:px-7 md:py-6 bg-gray-50 border-b border-gray-100">
        <h3 className="text-xl md:text-2xl font-semibold flex items-center gap-3 text-gray-900">
          <Lock size={22} className="text-amber-700" strokeWidth={2.5} />
          Order Summary
        </h3>
      </div>

      {/* Breakdown */}
      <div className="p-6 md:p-8 lg:p-9 space-y-6 md:space-y-7 text-base">
        <div className="space-y-4 md:space-y-5">
          {/* Subtotal */}
          <div className="flex justify-between items-baseline text-gray-700">
            <span>Subtotal</span>
            <div className="text-right">
              {hasDiscount ? (
                <div className="flex flex-col items-end">
                  <span className="text-gray-500 line-through text-sm">
                    {currency}{subtotal.toLocaleString()}
                  </span>
                  <span className="font-medium text-gray-900">
                    {currency}{(subtotal - discountAmount).toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="font-medium">{currency}{subtotal.toLocaleString()}</span>
              )}
            </div>
          </div>

          {/* Discount */}
          {hasDiscount && (
            <div className="flex justify-between items-center text-green-700 font-medium">
              <span className="flex items-center gap-1.5">
                <IndianRupee size={16} /> Discount Applied
              </span>
              <div className="text-right">
                <span>-{currency}{discountAmount.toLocaleString()}</span>
                <span className="text-xs text-green-600 block">
                  You save {currency}{discountAmount.toLocaleString()}
                </span>
              </div>
            </div>
          )}

          {/* Shipping */}
          <div className="flex justify-between items-center text-gray-700">
            <span className="flex items-center gap-2">
              Shipping
              <Info size={14} className="text-gray-400 cursor-help" />
            </span>

            {isCartPage ? (
              <span className="text-sm text-amber-800 font-medium">
                Calculated at checkout
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
          {!isCartPage && (
            <div className="flex justify-between text-sm text-gray-600 pt-1 border-t border-gray-100/70">
              <span className="flex items-center gap-2">
                <Calendar size={15} className="text-amber-700" />
                Estimated Delivery
              </span>
              <span className="font-medium">3–5 business days (Tracked)</span>
            </div>
          )}

          <hr className="border-gray-200 my-5 md:my-6" />

          {/* Final Total */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              Total
            </span>
            <span className="text-2xl md:text-3xl font-bold text-gray-950">
              {currency}{finalTotal.toLocaleString()}
            </span>
          </div>

          {hasDiscount && (
            <p className="text-sm text-green-700 text-right font-medium">
              (You saved {currency}{discountAmount.toLocaleString()} overall)
            </p>
          )}
        </div>

        {/* Trust Signals */}
        <div className="pt-4 md:pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-sm text-gray-700">
          <TrustItem icon={<ShieldCheck size={18} />} text="Secure Payment" />
          <TrustItem icon={<RefreshCw size={18} />} text="7-Day Returns" />
          <TrustItem icon={<Truck size={18} />} text="Tracked Shipping" />
          <TrustItem icon={<Package size={18} />} text="Premium Packaging" />
        </div>

        <p className="text-xs text-gray-500 text-center pt-5 border-t border-gray-100">
          All prices include GST and applicable taxes. 
          International orders may attract customs duties.
        </p>
      </div>
    </div>
  );
};

const TrustItem = ({ icon, text }) => (
  <div className="flex flex-col items-center text-center gap-1.5 md:flex-row md:items-start md:text-left md:gap-3">
    <div className="text-amber-700 flex-shrink-0">{icon}</div>
    <span className="leading-tight text-gray-600">{text}</span>
  </div>
);

export default CartTotal;