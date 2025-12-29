import React from "react";
import { Truck, RefreshCw, HeadphonesIcon, ShieldCheck } from "lucide-react";

const OurPolicy = () => {
  const policies = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      desc: "Fast and tracked delivery worldwide",
    },
    {
      icon: <RefreshCw className="w-8 h-8" />,
      title: "Easy Returns",
      desc: "30-day free returns and exchanges",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "100% Authentic",
      desc: "Guaranteed genuine products",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Customer Support",
      desc: "We're here to help, anytime",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Our Promise to You
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We stand behind every purchase with reliable service and quality you can trust
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {policies.map((policy, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-200"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-50 text-amber-700 mb-6">
                {policy.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {policy.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {policy.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;