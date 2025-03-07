import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, logout } from "../services/firebase";
import { useRole } from "../context/RoleContext"; // ✅ Import RoleContext
import {
  Menu, X, Search, LogIn, User, Home, Video, Bell, Settings, Star,
  BookOpen, Calendar, Globe, MessageSquare, Users, Bookmark, LayoutDashboard
} from "lucide-react"; // Icons

const Navbar = () => {
  const [user, setUser] = useState(null);
  const { role } = useRole(); // ✅ Fetch user role
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null); // Ref to track clicks outside

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Function to toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Function to toggle search bar
  const toggleSearch = () => {
    setSearchOpen(true);
    setSearchQuery("");
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Determine the correct dashboard route based on user role
  const getDashboardRoute = () => {
    switch (role) {
      case "super-admin": return "/dashboard/superadmin";
      case "admin": return "/dashboard/admin";
      case "editor": return "/dashboard/editor";
      case "journalist": return "/dashboard/journalist";
      case "advertiser": return "/dashboard/advertiser";
      case "partner": return "/dashboard/partner";
      default: return "/dashboard";
    }
  };

  return (
    <nav className="w-full px-4 md:px-6 py-4 flex justify-between items-center bg-white border-b border-gray-200 relative mt-10">
      
      {/* Left - Search */}
      <div className="relative" ref={searchRef}>
        {searchOpen ? (
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-48 md:w-64 transition"
          />
        ) : (
          <button onClick={toggleSearch} className="text-gray-700 hover:text-black transition">
            <Search size={20} />
          </button>
        )}
      </div>

      {/* Center - Logo (Fixed Position) */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link to="/" className="text-xl md:text-2xl font-serif font-bold tracking-wide text-black">
          THE METAVERSE STREET JOURNAL
        </Link>
      </div>

      {/* Right - Mobile Menu Button */}
      <button onClick={toggleMenu} className="text-gray-700 hover:text-black transition">
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation Bar */}
      <div className="absolute top-full left-0 w-full bg-gray-100 py-2 border-t border-gray-300 flex justify-center">
        <div className="flex space-x-4 md:space-x-6 text-xs md:text-sm font-medium text-gray-900 uppercase tracking-wide">
          {["Sandbox", "Upland", "Web3", "Metaverse", "Startup", "Staff"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="hover:text-black transition">
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-64 bg-gray-900 text-white shadow-lg rounded-lg py-4 px-6 z-50">
          <ul className="space-y-4 text-sm">
            {!user ? (
              <li>
                <Link to="/auth" className="flex items-center space-x-2 hover:text-gray-300 transition">
                  <LogIn size={18} />
                  <span>SignUp / Login</span>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/profile" className="flex items-center space-x-2 hover:text-gray-300 transition">
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/" className="flex items-center space-x-2 hover:text-gray-300 transition">
                    <Home size={18} />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to={getDashboardRoute()} className="flex items-center space-x-2 hover:text-gray-300 transition">
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/videos" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Video size={18} />
                <span>Videos</span>
              </Link>
            </li>
            <li>
              <button onClick={toggleSearch} className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Search size={18} />
                <span>Search</span>
              </button>
            </li>
            <li>
              <Link to="/notifications" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Bell size={18} />
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <Link to="/forum" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <MessageSquare size={18} />
                <span>Forum</span>
              </Link>
            </li>
            <li>
              <Link to="/events" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Calendar size={18} />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center space-x-2 hover:text-gray-300 transition">
                <Settings size={18} />
                <span>Settings</span>
              </Link>
            </li>
            {user && (
              <li>
                <button onClick={logout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition">
                  <LogIn size={18} />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
