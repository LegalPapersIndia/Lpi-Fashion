import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, ArrowRight, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // "sending", "success", "error"
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/xvzovylg", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-amber-700 mb-4">
            Get in Touch
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
            We’re Here to Help
          </h1>
          <p className="mt-6 text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question? Need sizing advice? We’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-md p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-600/20 transition resize-none"
                    placeholder="How can we assist you today?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed transition flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p className="text-green-600 text-center font-medium">
                    Thank you! We'll get back to you soon.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-600 text-center font-medium">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>

            {/* Map + Store Info */}
            <div className="space-y-12">
              {/* Map */}
              <div className="h-96 rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  title="LPI Fashion Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.1449493679006!2d77.31967657533406!3d28.595428075685028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2290a24adc2aa39f%3A0x6393f050e681d51e!2sLegal%20Papers%20India!5e0!3m2!1sen!2sin!4v1765176284710!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Store Details */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Us</h3>
                <div className="space-y-6 text-gray-700">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium">LPI Fashion</p>
                      <p className="text-gray-600">
                        F-2, Sector - 8<br />
                        Noida, Uttar Pradesh<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-amber-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Opening Hours</p>
                      <p className="text-gray-600">
                        Mon – Sat: 11:00 AM – 8:00 PM<br />
                        Sunday: 12:00 PM – 7:00 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-amber-600" />
                    <a href="tel:+917505266931" className="hover:text-amber-600 transition">
                      +91 75052 66931
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-amber-600" />
                    <a href="mailto:info@lpifashion.com" className="hover:text-amber-600 transition">
                      info@lpifashion.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 bg-white text-center">
        <p className="text-2xl lg:text-3xl font-medium text-gray-800 max-w-3xl mx-auto">
          We typically respond within 24 hours.
        </p>
        <p className="mt-4 text-amber-700 font-medium">
          Looking forward to hearing from you.
        </p>
      </section>
    </>
  );
};

export default Contact;