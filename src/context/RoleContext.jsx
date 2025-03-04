import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase"; // ✅ Fixed import
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userDocRef = doc(db, "user", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const assignedRole = userDocSnap.data().role;
          if (assignedRole) {
            setRole(assignedRole);
          } else {
            setRole("journalist"); // ✅ Default role fallback
          }
        } else {
          // ✅ Fix: If no role exists, assign it to Firestore
          await setDoc(userDocRef, { email: currentUser.email, role: "journalist" }, { merge: true });
          setRole("journalist"); // ✅ Default fallback
        }
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <RoleContext.Provider value={{ user, role, setRole, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom Hook for using RoleContext
export const useRole = () => useContext(RoleContext);
