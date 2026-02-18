import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, HeartHandshake, Clock } from "lucide-react";

const About = () => {
  return (
    <>
      {/* Hero – Elevated & cinematic */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/247204/pexels-photo-247204.jpeg"
            alt="LPI Fashion background"
            className="w-full h-full object-cover brightness-[0.45] scale-105 transition-transform duration-[20s]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <p className="text-base md:text-lg font-medium uppercase tracking-widest text-amber-400/90 mb-6 animate-fade-in-up">
            Established 2025
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none animate-fade-in-up animation-delay-200">
            <span className="block">LPI</span>
            <span className="block mt-2 md:mt-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Fashion
            </span>
          </h1>

          <p className="mt-8 md:mt-10 text-xl md:text-2xl lg:text-3xl text-gray-200 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Where timeless Indian craftsmanship meets modern elegance
          </p>

          <div className="mt-10 md:mt-12">
            <Link
              to="/collection"
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-md text-white font-medium text-lg rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-[1.03] shadow-lg"
            >
              Discover the Collection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story – Warm & human */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 animate-fade-in-left">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://media.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000014200413-Grey-DARKGREY-1000014200413_04-2100.jpg"
                alt="Artisan handcrafting garment"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-8 animate-fade-in-right">
            <div>
              <p className="text-sm md:text-base font-medium uppercase tracking-wider text-amber-700 mb-4">
                Our Story
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Crafted with
                <br />
                <span className="text-amber-700">heart & heritage</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
              <p>
                LPI Fashion was founded with a simple belief: clothing should tell a story — one of tradition, skill, and soul.
              </p>
              <p>
                We partner with master artisans across India, preserving centuries-old techniques while designing pieces that feel relevant today.
              </p>
              <p>
                Every stitch, every fabric choice, every detail is intentional — because we believe you deserve garments that last, both in style and in quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values – Icon-driven & elegant */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm md:text-base font-medium uppercase tracking-wider text-amber-700 mb-6">
            Our Core Values
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-16 md:mb-20">
            Built to Last
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Sparkles size={36} />,
                title: "Uncompromising Quality",
                desc: "Only the finest fabrics and meticulous craftsmanship go into every piece.",
              },
              {
                icon: <HeartHandshake size={36} />,
                title: "Ethical & Fair",
                desc: "Honest partnerships with artisans and a commitment to sustainable practices.",
              },
              {
                icon: <Clock size={36} />,
                title: "Timeless Design",
                desc: "Versatile silhouettes that transcend trends and become wardrobe essentials.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="text-amber-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA – Warm & confident */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight max-w-4xl mx-auto">
            Clothing that doesn’t just look good —{" "}
            <span className="text-amber-700 font-semibold">it feels like home.</span>
          </p>

          <div className="mt-12 md:mt-16">
            <Link
              to="/collection"
              className="inline-flex items-center gap-4 px-10 md:px-12 py-5 md:py-6 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold text-lg md:text-xl rounded-full hover:from-amber-700 hover:to-amber-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.03]"
            >
              Explore the Collection
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;