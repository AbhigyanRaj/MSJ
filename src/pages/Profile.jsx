// Code by Abhigyann :)
import { useEffect, useState } from "react";
import { auth, db, logout } from "../services/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaHome, FaSignOutAlt, FaEdit, FaSave } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
    role: "",
    memberSince: "",
    socialLinks: { twitter: "", linkedin: "", github: "" },
  });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "user", currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setProfileData(docSnap.data());
        } else {
          const newUser = {
            uid: currentUser.uid,
            name: currentUser.displayName || `User${Math.floor(Math.random() * 1000)}`,
            email: currentUser.email,
            bio: "This is your bio. Update it.",
            role: "journalist",
            memberSince: new Date().toISOString().split("T")[0], // Store as YYYY-MM-DD
            socialLinks: { twitter: "", linkedin: "", github: "" },
          };
          await setDoc(userDocRef, newUser);
          setProfileData(newUser);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["twitter", "linkedin", "github"].includes(name)) {
      setProfileData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value },
      }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (user) {
      const userDocRef = doc(db, "user", user.uid);
      await updateDoc(userDocRef, profileData);
      setIsEditing(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-8">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">User Profile</h2>

          {user && (
            <div className="flex flex-col items-center">
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-4xl font-semibold border">
                {profileData.name.charAt(0).toUpperCase()}
              </div>

              {/* User Details */}
              <div className="w-full mt-6 space-y-4">
                <div>
                  <label className="text-gray-600 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 mt-1 rounded-md border focus:outline-none focus:ring focus:border-blue-400 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-gray-600 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-4 py-2 mt-1 rounded-md border bg-gray-100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 font-medium">Role</label>
                    <input
                      type="text"
                      name="role"
                      value={profileData.role}
                      disabled
                      className="w-full px-4 py-2 mt-1 rounded-md border bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="text-gray-600 font-medium">Member Since</label>
                    <input
                      type="text"
                      name="memberSince"
                      value={profileData.memberSince}
                      disabled
                      className="w-full px-4 py-2 mt-1 rounded-md border bg-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-600 font-medium">Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2 mt-1 rounded-md border focus:outline-none focus:ring focus:border-blue-400 bg-gray-50"
                  />
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-gray-600 font-medium">Twitter</label>
                    <input
                      type="text"
                      name="twitter"
                      value={profileData.socialLinks.twitter}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 mt-1 rounded-md border bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium">LinkedIn</label>
                    <input
                      type="text"
                      name="linkedin"
                      value={profileData.socialLinks.linkedin}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 mt-1 rounded-md border bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="text-gray-600 font-medium">GitHub</label>
                    <input
                      type="text"
                      name="github"
                      value={profileData.socialLinks.github}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 mt-1 rounded-md border bg-gray-50"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between w-full mt-6">
                <button
                  className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-3xl hover:bg-gray-900 transition"
                  onClick={() => navigate("/")}
                >
                  Home
                </button>

                {isEditing ? (
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-3xl hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-3xl hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    navigate("/auth");
                  }}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-3xl hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {!user && <p className="text-center text-gray-500 mt-4">No user logged in.</p>}
        </div>
      </div>
    </>
  );
};

export default Profile;
