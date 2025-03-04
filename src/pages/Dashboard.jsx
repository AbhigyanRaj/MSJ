// Code by abhigyann:)
import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const role = docSnap.data().role;
          setUserRole(role);

          // Redirect to respective dashboard based on role
          switch (role) {
            case "super-admin":
              navigate("/dashboard/super-admin");
              break;
            case "admin":
              navigate("/dashboard/admin");
              break;
            case "editor":
              navigate("/dashboard/editor");
              break;
            case "journalist":
              navigate("/dashboard/journalist");
              break;
            case "advertiser":
              navigate("/dashboard/advertiser");
              break;
            case "partner":
              navigate("/dashboard/partner");
              break;
            default:
              navigate("/"); // Redirect to homepage if no valid role
          }
        }
      }
    };

    fetchUserRole();
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-600">Redirecting to your dashboard...</p>
    </div>
  );
};

export default Dashboard;
