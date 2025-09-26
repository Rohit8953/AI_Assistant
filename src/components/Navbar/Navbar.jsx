import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, User, Menu } from "lucide-react";
import flexAi from '../../assets/flexAi.png'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();


  return (
    <nav className="fixed top-0 inset-x-0 z-50 w-full bg-white/90 backdrop-blur-3xl border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-2 sm:px-4 lg:px-6">
        
        {/* Logo with Enhanced Styling */}
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img 
              className="relative w-32 sm:w-36 transition-all duration-300 group-hover:scale-105" 
              src={flexAi} 
              alt="FlexAI Logo" 
            />
          </div>
          <div className="hidden lg:block h-6 w-px bg-gray-300"></div>
          <span className="hidden lg:block text-sm text-gray-600 font-medium">
            Intelligent AI Assistant and Content Generator
          </span>
        </div>

        {/* User Section */}
        {user ? (
          <div className="flex items-center space-x-4">
            {/* Quick Stats */}
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Pro Plan</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              {/* <div className="text-gray-600">
                <span className="font-semibold text-blue-600">500</span> credits
              </div> */}
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-3 bg-gray-50 rounded-full pl-1 pr-3 py-1 border border-gray-200">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 border-2 border-white shadow-sm",
                    userButtonTrigger: "focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full"
                  }
                }}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 leading-none">
                  {user.firstName || user.username}
                </span>
                <span className="text-xs text-gray-500">Online</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            {/* Navigation Links for non-auth users */}
            {/* <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
              <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            </div> */}
            
            <button
              className="group relative flex items-center gap-2 rounded-full text-sm font-semibold
               cursor-pointer bg-gradient-to-r from-blue-600 to-purple-700 text-white 
               px-6 py-2.5 shadow-lg hover:shadow-xl 
               transform hover:scale-105 transition-all duration-300
               hover:from-blue-700 hover:to-purple-800
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               overflow-hidden"
              onClick={openSignIn}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              <Sparkles className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Get Started Free</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;