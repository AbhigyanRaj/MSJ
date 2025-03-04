import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, googleLogin, login, signup, logout } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "user", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // New user - Assign a default role
          await setDoc(userDocRef, {
            uid: currentUser.uid,
            name: currentUser.displayName || "New User",
            email: currentUser.email,
            role: "journalist", // Default role for new users
          });
        }

        const userData = (await getDoc(userDocRef)).data();
        setUser(userData);

        // ✅ Redirect based on role
        switch (userData.role) {
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
            navigate("/dashboard");
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
