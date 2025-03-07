import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, googleLogin, login, signup, logout } from "../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "user", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          // Capture the signup date only when creating a new user
          const joinedDate = new Date().toISOString().split("T")[0]; // Store as YYYY-MM-DD

          await setDoc(userDocRef, {
            uid: currentUser.uid,
            name: currentUser.displayName || "New User",
            email: currentUser.email,
            role: "journalist", // Default role for new users
            memberSince: joinedDate, // Store the sign-up date
          });
        }

        // Fetch the user data, including "memberSince"
        const userData = (await getDoc(userDocRef)).data();
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
