import React from "react";

const TermsOfService = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Terms of Service
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: December 29, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using LPI Fashion ("we", "us", or "our"), you agree to be bound by these Terms of Service. 
              If you do not agree with any part of these terms, you must not use our website or services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Use of the Website
            </h2>
            <p>
              You may use our website for lawful purposes only. You agree not to use the site:
            </p>
            <ul className="list-disc pl-8 mt-4 space-y-2">
              <li>To violate any local, state, national, or international law</li>
              <li>To interfere with or disrupt the website or servers</li>
              <li>To impersonate any person or entity</li>
              <li>To transmit any harmful code or malware</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Account Responsibilities
            </h2>
            <p>
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for maintaining the confidentiality of your account and password, 
              and for all activities that occur under your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Orders and Payment
            </h2>
            <p>
              All orders are subject to acceptance and availability. Prices are subject to change without notice. 
              We reserve the right to refuse or cancel any order at any time for any reason.
            </p>
            <p className="mt-4">
              Payment must be received in full before dispatch. We accept various payment methods as displayed at checkout.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Shipping and Delivery
            </h2>
            <p>
              We offer free worldwide shipping on all orders. Delivery times are estimates and not guaranteed. 
              Risk of loss and title for items purchased pass to you upon delivery to the carrier.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Returns and Refunds
            </h2>
            <p>
              We offer a 30-day return policy for unused items in original condition with tags attached. 
              Return shipping is free. Refunds will be processed to the original payment method within 7–10 business days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Intellectual Property
            </h2>
            <p>
              All content on this website, including images, text, logos, and designs, is the property of LPI Fashion 
              or its licensors and is protected by copyright and trademark laws.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, LPI Fashion shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages resulting from your use of the website or products.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Changes to Terms
            </h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Continued use of the website 
              after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-4">
              Email: <a href="mailto:hello@lpifashion.com" className="text-amber-700 hover:underline">hello@lpifashion.com</a><br />
              Phone: <a href="tel:+919876543210" className="text-amber-700 hover:underline">+91 98765 43210</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;