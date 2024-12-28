import React from 'react';

const Legal = () => {
  return (
    <div className="p-10 space-y-12">
      {/* Privacy Policy */}
      <section>
        <h1 className="text-4xl font-bold mb-6 underline">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Last updated: December 17, 2024</p>

        <p className="mb-6">
          This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our services. By accessing our services, you consent to the practices described in this policy.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Usage data (e.g., IP address, browser details)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Data</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide and maintain the service</li>
          <li>To manage your account</li>
          <li>To enhance user experience</li>
          <li>To contact you regarding updates or promotions</li>
          <li>For legal compliance and security</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Tracking</h2>
        <p>
          We use cookies to analyze traffic, improve performance, and personalize content. You can manage your cookie preferences through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal data. To exercise these rights, contact us at the email provided below.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>Email: <a href="mailto:avi@tweetly.co" className="text-blue-600 underline">avi@tweetly.co</a></p>
      </section>

      {/* Terms and Conditions */}
      <section>
        <h1 className="text-4xl font-bold mb-6 underline">Terms and Conditions</h1>
        <p className="text-gray-600 mb-4">Last updated: December 17, 2024</p>

        <p className="mb-6">
          By accessing or using our services, you agree to comply with these Terms and Conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be 18 years or older to use our services.</li>
          <li>Comply with all applicable laws and regulations.</li>
          <li>Refrain from misusing or disrupting the service.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
        <p>
          We are not liable for indirect, incidental, or consequential damages resulting from your use of our services.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Termination</h2>
        <p>
          We reserve the right to terminate your access to the service if you violate these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
        <p>
          These terms are governed by the laws of Rajasthan, India. Any disputes should first be resolved through informal communication.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p>Email: <a href="mailto:avi@tweetly.co" className="text-blue-600 underline">avi@tweetly.co</a></p>
      </section>
    </div>
  );
};

export default Legal;
