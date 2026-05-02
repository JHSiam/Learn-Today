import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-60 backdrop-blur-md text-white py-10 px-6 mt-12">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold mb-5 text-purple-400">About Us</h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              We provide premium online education and resources for students worldwide.
              Join us to unlock your true potential and achieve your goals.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-2xl font-bold mb-5 text-purple-400">Quick Links</h2>
            <ul className="space-y-3 text-gray-300">
              {["Home", "All Classes", "About Us", "Contact Us"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-purple-400 transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold mb-5 text-purple-400">Contact Us</h2>
            <p className="text-gray-300 mb-2 text-sm">
              Email:{" "}
              <a
                href="mailto:support@example.com"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                support@example.com
              </a>
            </p>
            <p className="text-gray-300 mb-4 text-sm">
              Phone:{" "}
              <a
                href="tel:+1234567890"
                className="hover:text-purple-400 transition-colors duration-300"
              >
                +1 234 567 890
              </a>
            </p>
            <div className="flex space-x-6 text-purple-400 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-600 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-purple-700 pt-6 text-center text-gray-400 text-sm select-none">
          &copy; {new Date().getFullYear()} LearnOnline. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
