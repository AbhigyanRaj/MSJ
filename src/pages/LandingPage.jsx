// Code by abhigyann:)
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import herosection from "../assets/herosection.png";
import Marquee from '../components/Marquee';


const LandingPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="w-full h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-32 py-16 flex-grow">
        
        {/* Left - Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img src={herosection} alt="Collaboration" className="w-auto max-w-lg h-72" />
        </div>

        {/* Right - Text Content */}
        <div className="w-full md:w-1/2 text-left mt-8 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Your <br /> Trusted Metaverse <br /> Partners
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
          Join Metaverse Street Journal to stay ahead in Web3, NFTs, Blockchain, and Crypto. Explore exclusive news, expert insights,
           and industry reports. Connect with top journalists, creators, and thought leaders, engage in discussions, and shape
            the future of the decentralized world—all in one place.
          </p>
          
          {/* Call to Action */}
          <div className="mt-6">
            <Link 
              to="/auth"
              className="px-6 py-3 bg-black text-white text-lg font-medium rounded-full hover:bg-gray-900"
            >
              Get Started
            </Link>
          </div>
        </div>

      </div>
      <Marquee />


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
