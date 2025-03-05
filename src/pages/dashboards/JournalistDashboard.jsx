import { useState, useEffect } from "react";
import { db, auth } from "../../services/firebase";
import { collection, addDoc, query, where, getDocs, onSnapshot } from "firebase/firestore";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BottomNav from "../../components/BottomNav"; // For mobile navigation

const JournalistDashboard = () => {
  const [article, setArticle] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const user = auth.currentUser;

  // Fetch and Listen for Submitted Articles in Real-Time
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "articles"), where("authorId", "==", user.uid));

    // Real-time listener to update articles immediately
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const articlesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setArticles(articlesData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user]);

  // Handle Article Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);

    try {
      await addDoc(collection(db, "articles"), {
        ...article,
        authorId: user.uid,
        status: "Pending Review", // Default status
        timestamp: new Date(),
      });

      // Reset the form after submission
      setArticle({ title: "", content: "", category: "" });
    } catch (error) {
      console.error("Error submitting article:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="w-full max-w-3xl text-center">
          <h1 className="text-4xl font-bold text-gray-800">Journalist Dashboard</h1>
          <p className="text-gray-600 mt-2">Submit and track your articles effortlessly.</p>
        </div>

        {/* Article Submission Section */}
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-lg mt-8 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Submit an Article</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Article Title"
              value={article.title}
              onChange={(e) => setArticle({ ...article, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              placeholder="Write your article content..."
              value={article.content}
              onChange={(e) => setArticle({ ...article, content: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              required
            ></textarea>
            <input
              type="text"
              placeholder="Category (e.g., Crypto, NFT, Web3)"
              value={article.category}
              onChange={(e) => setArticle({ ...article, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-gray-800 text-white font-medium py-3 rounded-3xl hover:bg-gray-900 transition"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Article"}
            </button>
          </form>
        </div>

        {/* Submitted Articles List */}
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-lg mt-8 p-6">
          <h2 className="text-xl font-semibold text-gray-800">Your Submitted Articles</h2>
          {loading ? (
            <p className="text-gray-500 mt-4">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-gray-500 mt-4">You haven’t submitted any articles yet.</p>
          ) : (
            <ul className="divide-y divide-gray-300 mt-4">
              {articles.map((art) => (
                <li key={art.id} className="py-3">
                  <h3 className="font-semibold text-lg text-gray-800">{art.title}</h3>
                  <p className="text-gray-600 text-sm">{art.category}</p>
                  <span
                    className={`text-sm font-medium ${
                      art.status === "Pending Review" ? "text-yellow-500" : "text-green-500"
                    }`}
                  >
                    Status: {art.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
      <BottomNav /> {/* Bottom navigation for mobile */}
    </div>
  );
};

export default JournalistDashboard;
