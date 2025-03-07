// Code by abhigyann :)
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// ✅ Use the actual Firebase configuration keys
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// 🔹 Function to format the date as "13 March 2025"
const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

// 🔹 Function to Assign Role and MemberSince if Missing
const assignUserFieldsIfMissing = async (user) => {
  if (!user) return;

  const userDocRef = doc(db, "user", user.uid);
  const docSnap = await getDoc(userDocRef);
  
  if (!docSnap.exists()) {
    // ✅ Assign Default Role and MemberSince for New Users
    const newUser = {
      uid: user.uid,
      name: user.displayName || `User${Math.floor(Math.random() * 1000)}`,
      email: user.email,
      bio: " ",
      role: "journalist", // Default role
      memberSince: formatDate(new Date()), // Store formatted date
      socialLinks: { twitter: "", linkedin: "", github: "" },
    };
    await setDoc(userDocRef, newUser);
    return newUser;
  } else {
    const userData = docSnap.data();

    // ✅ Add missing fields if they don't exist
    const updates = {};
    if (!userData.role) updates.role = "journalist";
    if (!userData.memberSince) updates.memberSince = formatDate(new Date());

    if (Object.keys(updates).length > 0) {
      await updateDoc(userDocRef, updates);
    }

    return { ...userData, ...updates };
  }
};

// 🔹 Monitor Authentication Changes
const onAuthChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await assignUserFieldsIfMissing(user);
      callback(userData);
    } else {
      callback(null);
    }
  });
};

// 🔹 Signup with Email and Password
const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await assignUserFieldsIfMissing(user);
    return { success: true, user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 🔹 Login with Email and Password
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    await assignUserFieldsIfMissing(userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 🔹 Google Sign-In
const googleLogin = async () => {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    await assignUserFieldsIfMissing(userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 🔹 Logout
const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// 🔹 Export Functions
export { auth, db, signup, login, googleLogin, logout, onAuthChange };
