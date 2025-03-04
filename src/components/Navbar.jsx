// Code by abhigyann:)
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, logout } from "../services/firebase";
import { Menu, X } from "lucide-react"; // For mobile menu toggle icons

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Function to toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-white border-b border-gray-200">
      {/* Left - Logo */}
      <Link to="/" className="text-xl font-semibold text-gray-900">
        Metaverse Street Journal
      </Link>

      {/* Center - Desktop Navigation */}
      <div className="hidden md:flex space-x-8 text-gray-800 text-sm font-medium">
        {["Metaverse", "Web3", "NFT", "Crypto", "Events", "Startup", "Staff"].map((item) => (
          <Link key={item} to={`/${item.toLowerCase()}`} className="hover:text-black transition">
            {item}
          </Link>
        ))}
      </div>

      {/* Right - Auth Section */}
      <div className="hidden md:flex space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <Link 
              to="/profile"
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition"
            >
              Profile
            </Link>
            <button 
              onClick={logout} 
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-50 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link 
              to="/auth" 
              className="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition"
            >
              Login
            </Link>
            <Link 
              to="/auth" 
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition"
            >
              Signup
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button onClick={toggleMenu} className="md:hidden">
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Dropdown Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-white shadow-md md:hidden flex flex-col text-center py-4 space-y-4 border-t border-gray-200 transition-transform ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-96 opacity-0"
        } duration-300`}
      >
        {["Metaverse", "Web3", "NFT", "Crypto", "Events", "Startup", "Staff"].map((item) => (
          <Link 
            key={item} 
            to={`/${item.toLowerCase()}`} 
            className="hover:text-black transition"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </Link>
        ))}

        {/* Mobile Auth Section */}
        {user ? (
          <>
            <Link to="/profile" className="hover:text-black transition" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
            <button onClick={logout} className="hover:text-black transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/auth" 
              className="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-300 rounded-full hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/auth" 
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition"
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
