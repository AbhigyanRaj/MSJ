// Code by abhigyann:)
import { useEffect, useState } from "react";
import { auth, db, logout } from "../services/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaHome, FaSignOutAlt, FaEdit, FaSave } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    bio: "",
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

  const emojiList = ["😃", "🤩", "🐼", "🦁", "🐵", "🐹", "💡"];
  const bgColorList = ["bg-white"];

  const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];
  const randomBg = bgColorList[Math.floor(Math.random() * bgColorList.length)];


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-8 ">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-6 border ">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">Profile</h2>

        {user && (
          <div className="flex flex-col items-center">
            {/* Profile Avatar */}
            <div className={`w-28 h-28 ${randomBg} rounded-full flex items-center justify-center text-gray-700 text-5xl font-semibold border`}>
            {randomEmoji}
            </div>

            {/* User Details */}
            <div className="w-full mt-4 space-y-3">
              <div>
                <label className="text-gray-600 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 mt-1 rounded-md border focus:outline-none focus:ring focus:border-blue-400"
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

              <div>
                <label className="text-gray-600 font-medium">Bio</label>
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 mt-1 rounded-md border focus:outline-none focus:ring focus:border-blue-400"
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
                    className="w-full px-4 py-2 mt-1 rounded-md border"
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
                    className="w-full px-4 py-2 mt-1 rounded-md border"
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
                    className="w-full px-4 py-2 mt-1 rounded-md border"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between w-full mt-6">
              {/* Home Button */}
              <button
                className="px-4 py-2 flex items-center bg-gray-800 text-white text-sm font-medium rounded-3xl hover:bg-gray-900 transition"
                onClick={() => navigate("/")}
              >
               Home
              </button>

              {/* Edit / Save Profile */}
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 flex items-center bg-green-600 text-white text-sm font-medium rounded-3xl hover:bg-green-700 transition"
                >
                   Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 flex items-center bg-blue-600 text-white text-sm font-medium rounded-3xl hover:bg-blue-700 transition"
                >
                   Edit
                </button>
              )}

              {/* Logout Button */}
              <button
                onClick={() => {
                  logout();
                  navigate("/auth");
                }}
                className="px-4 py-2 flex items-center bg-red-600 text-white text-sm font-medium rounded-3xl hover:bg-red-700 transition"
              >
                 Logout
              </button>
            </div>
          </div>
        )}

        {/* If no user */}
        {!user && <p className="text-center text-gray-500 mt-4">No user logged in.</p>}
      </div>
    </div>
  );
};

export default Profile;
