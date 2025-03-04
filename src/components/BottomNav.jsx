// Code by abhigyann:)
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../services/firebase";
import { Home, Video, Search, Bell, User } from "lucide-react"; // Importing icons

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Hide bottom navigation on the auth page
  if (location.pathname === "/auth") return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200 md:hidden flex justify-around py-3">
      <button onClick={() => navigate("/")} className="flex flex-col items-center text-gray-700">
        <Home size={24} />
      </button>
      <button onClick={() => navigate("/videos")} className="flex flex-col items-center text-gray-700">
        <Video size={24} />
      </button>
      <button onClick={() => navigate("/search")} className="flex flex-col items-center text-gray-700">
        <Search size={24} />
      </button>
      <button onClick={() => navigate("/notifications")} className="flex flex-col items-center text-gray-700">
        <Bell size={24} />
      </button>
      
      {/* Show profile icon only when user is logged in */}
      {user ? (
        <button onClick={() => navigate("/profile")} className="flex flex-col items-center text-gray-700">
          <User size={24} />
        </button>
      ) : (
        <button onClick={() => navigate("/auth")} className="flex flex-col items-center text-gray-700">
          <User size={24} className="text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default BottomNav;
