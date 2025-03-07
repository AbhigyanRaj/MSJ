// Code by Abhigyann :)
import { Link } from "react-router-dom";
import { FaYoutube, FaXTwitter, FaLinkedin, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 font-inter">
      <div className="container mx-auto px-6">
        
        {/* Newsletter Signup - Sleek UI */}
        <div className="text-center mb-10 mt-10">
          <h2 className="text-2xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
          <p className="text-gray-600 text-sm mb-4">Join thousands of readers & stay ahead in the Web3 world.</p>
          <div className="flex justify-center">
            <div className="flex w-full max-w-md bg-white shadow-md rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 w-full rounded-l-full text-gray-700 outline-none border-none"
              />
              <button className="bg-black text-white px-6 py-3 rounded-r-full font-medium hover:bg-gray-900 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
          
          <div>
            <h3 className="text-gray-800 font-medium mb-2">MSJ Membership</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-black">The Journal Collection</Link></li>
              <li><Link to="/" className="hover:text-black">Subscription Options</Link></li>
              <li><Link to="/" className="hover:text-black">Corporate Subscription</Link></li>
              <li><Link to="/" className="hover:text-black">MSJ Live</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-2">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-black">Customer Center</Link></li>
              <li><Link to="/" className="hover:text-black">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-black">Cancel Subscription</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-2">Tools & Features</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-black">Newsletters & Alerts</Link></li>
              <li><Link to="/" className="hover:text-black">Guides</Link></li>
              <li><Link to="/" className="hover:text-black">RSS Feeds</Link></li>
              <li><Link to="/" className="hover:text-black">Video Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-2">Ads</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-black">Advertise</Link></li>
              <li><Link to="/" className="hover:text-black">Metaverse Land Ads</Link></li>
              <li><Link to="/" className="hover:text-black">Blockchain Ads</Link></li>
            </ul>
          </div>

        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-10">
          <a href="https://www.youtube.com/@TheMetaverseStreetJournal" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-2xl text-gray-600 hover:text-red-500 transition" />
          </a>
          <a href="https://x.com/Metaverseditor" target="_blank" rel="noopener noreferrer">
            <FaXTwitter className="text-2xl text-gray-600 hover:text-black transition" />
          </a>
          <a href="https://www.linkedin.com/company/metaversenews" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-2xl text-gray-600 hover:text-blue-700 transition" />
          </a>
          <a href="https://www.t.me/@TheMetaverseStreetJournal" target="_blank" rel="noopener noreferrer">
            <FaTelegram className="text-2xl text-gray-600 hover:text-blue-500 transition" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 mt-8">
          © 2025 Metaverse Street Journal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
