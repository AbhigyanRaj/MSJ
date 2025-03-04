// Code by Abhigyann :)
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup, login, googleLogin } from "../services/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useRole } from "../context/RoleContext";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("journalist"); // Default role
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setRole: setUserRole } = useRole(); // Access role state

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    let response;
    if (isLogin) {
      response = await login(email, password);
    } else {
      response = await signup(email, password);
      if (response.success && response.user) {
        const userRef = doc(db, "user", response.user.uid);
        await setDoc(userRef, { email, role }, { merge: true });
        setUserRole(role); // Update role in context
      }
    }

    if (response.success) {
      navigateToDashboard(role);
    } else {
      setError(response.message);
    }
  };

  const handleGoogleLogin = async () => {
    const response = await googleLogin();
    if (response.success && response.user) {
      const userRef = doc(db, "user", response.user.uid);
      const docSnap = await getDoc(userRef);
      let userRole = "journalist"; // Default role for Google users

      if (docSnap.exists()) {
        userRole = docSnap.data().role || "journalist";
      } else {
        await setDoc(userRef, { email: response.user.email, role: userRole }, { merge: true });
      }

      setUserRole(userRole); // Update role in context
      navigateToDashboard(userRole);
    } else {
      setError(response.message);
    }
  };

  const navigateToDashboard = (userRole) => {
    const rolePathMap = {
      superadmin: "/dashboard/superadmin",
      admin: "/dashboard/admin",
      editor: "/dashboard/editor",
      journalist: "/dashboard/journalist",
      advertiser: "/dashboard/advertiser",
      partner: "/dashboard/partner",
    };
    navigate(rolePathMap[userRole] || "/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </h2>
        <p className="text-gray-500 mt-2">
          {isLogin ? "Sign in to continue" : "Join us and stay updated"}
        </p>

        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

        <form onSubmit={handleAuth} className="mt-6 space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
          />

          {!isLogin && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:border-blue-500"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="journalist">Journalist</option>
              <option value="advertiser">Advertiser</option>
              <option value="partner">Partner</option>
              <option value="superadmin">Super Admin</option>
            </select>
          )}

          <button className="w-full px-6 py-3 bg-black text-white rounded-3xl hover:bg-gray-900 transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full px-6 py-3 mt-3 bg-red-500 text-white rounded-3xl hover:bg-red-600 transition"
        >
          Continue with Google
        </button>

        <p className="mt-5 text-gray-600 text-sm">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 font-medium hover:underline transition"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>

        <div className="mt-6">
          <Link to="/" className="text-gray-500 text-sm hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
