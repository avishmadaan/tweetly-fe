import React from 'react';

const Legal = () => {
  return (
    <div className="p-10 space-y-8">
      {/* Privacy Policy */}
      <section>
        <h1 className="text-3xl font-bold mb-4 underline">Privacy Policy</h1>
        <p>Last updated: December 17, 2024</p>
        <p>
          This Privacy Policy explains how we collect, use, and protect your
          personal information when you use our service. By using our service,
          you agree to the collection and use of your data as described.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
        <ul className="list-disc pl-5">
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Usage data (e.g., IP address, browser details)</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">How We Use Your Data</h2>
        <ul className="list-disc pl-5">
          <li>To provide and maintain the service</li>
          <li>To manage your account</li>
          <li>To improve the user experience</li>
          <li>To contact you for updates or promotions</li>
          <li>For security and legal obligations</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Cookies and Tracking</h2>
        <p>
          We use cookies to track website usage, improve performance, and
          personalize content. You can manage cookie preferences in your browser
          settings.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Your Rights</h2>
        <p>
          You can access, update, or delete your personal data by contacting us
          or managing settings in your account.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
        <p>Email: avi@tweetly.co</p>
      </section>

      {/* Terms and Conditions */}
      <section>
        <h1 className="text-3xl font-bold mb-4 underline">Terms and Conditions</h1>
        <p>Last updated: December 17, 2024</p>
        <p>
          By accessing or using our service, you agree to be bound by these
          Terms and Conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Your Responsibilities</h2>
        <ul className="list-disc pl-5">
          <li>You must be over 18 years of age to use the service.</li>
          <li>Follow applicable laws when using our service.</li>
          <li>Do not misuse or disrupt the service.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6">Limitation of Liability</h2>
        <p>
          The company is not liable for indirect, incidental, or consequential
          damages arising from your use of the service.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Termination</h2>
        <p>
          We reserve the right to terminate access to the service if you violate
          these terms.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Governing Law</h2>
        <p>
          These terms are governed by the laws of Rajasthan, India. Any disputes
          must be resolved through informal communication first.
        </p>

        <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
        <p>Email: avi@tweetly.co</p>
      </section>
    </div>
  );
};

export default Legal;
