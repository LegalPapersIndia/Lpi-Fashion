import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      {/* Hero Section – Clean & Professional */}
      <section className="relative min-h-screen flex items-center justify-center bg-gray-50">
        <div className="absolute inset-0 bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2400&auto=format&fit=crop"
            alt="LPI Fashion"
            className="w-full h-full object-cover opacity-80"
            loading="eager"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-700 mb-6">
            Since 2025
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900">
            <span className="block">LPI</span>
            <span className="block text-amber-700 mt-2">Fashion</span>
          </h1>
          <p className="mt-8 text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Blending traditional Indian craftsmanship with modern design
          </p>
        </div>
      </section>

      {/* Our Story – Balanced & Approachable */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://media.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000014200413-Grey-DARKGREY-1000014200413_04-2100.jpg"
              alt="Artisan crafting garment"
              className="w-full rounded-xl shadow-lg object-cover"
              loading="lazy"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-amber-700 mb-4">
                Our Story
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Crafting Quality
                <br />
                <span className="text-amber-700">With Care</span>
              </h2>
            </div>

            <div className="space-y-5 text-lg text-gray-600 leading-relaxed">
              <p>
                LPI Fashion was born from a passion to celebrate Indian craftsmanship while creating clothing that fits seamlessly into modern life.
              </p>
              <p>
                We work closely with skilled artisans across India to bring traditional techniques into contemporary designs — ensuring every piece is comfortable, durable, and beautifully made.
              </p>
              <p>
                From fabric selection to final stitching, quality and attention to detail guide everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values – Simple Grid */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-700 mb-4">
            Our Values
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-16">
            Designed to Last
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Quality First",
                desc: "Premium materials and careful construction in every garment.",
              },
              {
                title: "Ethical Making",
                desc: "Fair partnerships with artisans and sustainable practices.",
              },
              {
                title: "Timeless Style",
                desc: "Clean, versatile designs that stay relevant season after season.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 lg:py-28 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-3xl lg:text-4xl font-medium text-gray-800 leading-relaxed max-w-3xl mx-auto">
            We make clothes that feel good to wear —
            <span className="text-amber-700 font-semibold"> and even better to own.</span>
          </p>

          <div className="mt-12">
            <Link
              to="/collection"
              className="inline-flex items-center gap-4 px-10 py-5 bg-gray-900 text-white font-medium text-lg rounded-full hover:bg-gray-800 transition shadow-md"
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