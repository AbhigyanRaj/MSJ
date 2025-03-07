// Code by Abhigyann :)
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="w-full px-4 md:px-16 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Left - Main News */}
        <div className="w-full md:w-2/3 rounded-3xl overflow-hidden shadow-lg">
          <img src="/hero-main.png" alt="Main News" className="w-full h-auto object-cover" />
          <div className="p-6 bg-white">
            <p className="text-sm text-gray-500 uppercase font-semibold">Swimming · 10 minutes ago</p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
              Record-Breaking, Stunning Performance Leads The Swimmer To A Victory, Securing Their Place In History.
            </h1>
            <p className="mt-3 text-gray-600">
              Major advancements in sports analytics and training are reshaping the way athletes prepare for their events.
            </p>
            <Link to="/" className="text-red-600 font-medium mt-4 inline-block">
              Read More →
            </Link>
          </div>
        </div>

        {/* Right - Trending News (Using openai.png & blackrock.png) */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center gap-4 p-4 bg-white rounded-3xl shadow-lg">
              <img src={item % 2 === 0 ? "/blackrock.png" : "/openai.png"} 
                   alt="Trending News" 
                   className="w-24 h-24 object-cover rounded-lg" />
              <div>
                <h3 className="text-sm font-bold text-gray-900">
                  {item === 1 ? "OpenAI's Breakthrough in AI: What's Next?" : 
                   item === 2 ? "BlackRock Unveils New Investment Strategy in Crypto" :
                   "Emerging Startups Showcase Innovations at Local Tech"}
                </h3>
                <p className="text-xs text-gray-500 mt-1">6 Minutes Ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Latest News Section */}
      <div className="w-full px-4 md:px-16 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Trending News</h2>
          <Link to="/news" className="text-red-600 font-medium text-sm md:text-base">
            See More →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-3xl shadow-lg">
              <img src={item % 2 === 0 ? "/blackrock.png" : "/openai.png"} 
                   alt="News Thumbnail" 
                   className="w-full h-48 object-cover rounded-lg" />
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {item === 1 ? "OpenAI Announces Revolutionary AI Model for Businesses" : 
                 item === 2 ? "BlackRock Expands Crypto Investment Portfolio" :
                 "Regional Sports League Welcomes New Teams and Opportunities"}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {item === 1 ? "OpenAI unveils a powerful new AI model that will transform the way businesses automate workflows and customer interactions." : 
                 item === 2 ? "BlackRock's latest move signals increasing institutional interest in the cryptocurrency space, diversifying its investment portfolio..." :
                 "This initiative aims to promote sports participation and community engagement, providing a platform for athletes to showcase..."}
              </p>
              <p className="text-xs text-gray-500 mt-3">24 Minutes Ago</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
