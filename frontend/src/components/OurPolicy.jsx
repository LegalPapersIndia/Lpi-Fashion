import React from "react";
import { Truck, RefreshCw, HeadphonesIcon, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const OurPolicy = () => {
  const policies = [
    {
      icon: <Truck className="w-9 h-9" />,
      title: "Free Worldwide Shipping",
      desc: "Complimentary express delivery on all orders, fully tracked",
    },
    {
      icon: <RefreshCw className="w-9 h-9" />,
      title: "Effortless Returns",
      desc: "30-day free returns & exchanges with prepaid labels",
    },
    {
      icon: <ShieldCheck className="w-9 h-9" />,
      title: "Authenticity Guaranteed",
      desc: "100% genuine pieces, directly from our artisans",
    },
    {
      icon: <HeadphonesIcon className="w-9 h-9" />,
      title: "Dedicated Concierge",
      desc: "Personal styling support, 7 days a week",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="relative py-12 lg:py-20 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden">
      {/* Minimal Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-0 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-10 right-0 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 lg:mb-14"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-amber-700 font-semibold uppercase tracking-[0.3em] text-xs sm:text-sm mb-3"
          >
            Our Commitment
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
          >
            Crafted With Care,
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
              Delivered With Trust
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-light"
          >
            Every detail matters — from ethical sourcing to seamless service.
          </motion.p>
        </motion.div>

        {/* Tighter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {policies.map((policy, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center shadow-md border border-gray-100/50 transition-all duration-400 group-hover:shadow-xl group-hover:border-amber-200/40">
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-emerald-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute -inset-3 bg-gradient-to-br from-amber-400/10 to-emerald-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -z-10" />

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-amber-50 to-emerald-50 text-amber-700 mb-5 shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {policy.icon}
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                  {policy.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  {policy.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;