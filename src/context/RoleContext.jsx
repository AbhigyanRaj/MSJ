import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [memberSince, setMemberSince] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "user", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setRole(userData.role || "journalist");
          setMemberSince(userData.memberSince || new Date().toISOString().split("T")[0]);
        } else {
          // Assign a default role and set memberSince for new users
          const joinedDate = new Date().toISOString().split("T")[0]; // Store in YYYY-MM-DD format
          const newUserData = {
            email: currentUser.email,
            role: "journalist",
            memberSince: joinedDate,
          };

          await setDoc(userDocRef, newUserData, { merge: true });

          setRole("journalist");
          setMemberSince(joinedDate);
        }
      } else {
        setUser(null);
        setRole(null);
        setMemberSince(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <RoleContext.Provider value={{ user, role, setRole, memberSince, loading }}>
      {children}
    </RoleContext.Provider>
  );
};

// Custom Hook for using RoleContext
export const useRole = () => useContext(RoleContext);
