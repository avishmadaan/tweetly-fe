import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm mt-10 py-8 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6">
        {/* Logo and Description */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Tweetly</h3>
          <p className="mt-1 text-xs max-w-xs">
            Your trusted platform for seamless social media interactions. Connect, engage, and grow with ease.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
          <Link href="/about" className="hover:underline">About Us</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
          <Link href="/legal" className="hover:underline">Terms of Service</Link>
          <Link href="/legal" className="hover:underline">Privacy Policy</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center md:justify-between items-center mt-6">
        <p className="text-xs">&copy; {new Date().getFullYear()} Tweetly. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link href="https://facebook.com" target="_blank" className="hover:underline">
            Facebook
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:underline">
            Twitter
          </Link>
          <Link href="https://instagram.com" target="_blank" className="hover:underline">
            Instagram
          </Link>
          <Link href="https://linkedin.com" target="_blank" className="hover:underline">
            LinkedIn
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
