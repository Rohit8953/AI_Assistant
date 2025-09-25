import React from "react";
import { AiToolsData } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="relative py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      
      <div className="px-4 sm:px-20 xl:px-32 mb-16 relative z-10">
        <div className="text-center">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full px-6 py-2 mb-6">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              {AiToolsData.length}+ AI Tools Available
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-6">
            Powerful AI Tools
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to create, enhance, and optimize your content with 
            <span className="font-semibold text-gray-800"> cutting-edge AI technology</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 sm:px-20 xl:px-32 max-w-7xl mx-auto">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
              border border-gray-100 hover:border-transparent transition-all duration-500 
              cursor-pointer transform hover:-translate-y-2 backdrop-blur-sm
              overflow-hidden"
            onClick={() => user && navigate(tool.path)}
          >
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10 p-8">
              {/* Icon Container */}
              <div className="relative mb-6">
                <div 
                  className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center 
                    shadow-lg group-hover:shadow-xl transition-all duration-300 
                    group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${tool.bg.from}, ${tool.bg.to})`,
                  }}
                >
                  <tool.Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Floating Particles */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 text-center mb-4 group-hover:text-gray-900 transition-colors duration-300">
                {tool.title}
              </h3>
              
              <p className="text-gray-600 text-sm text-center leading-relaxed mb-6 line-clamp-3">
                {tool.description}
              </p>

              {/* CTA Button */}
              <div className="flex justify-center">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium 
                  group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 
                  group-hover:text-white transition-all duration-300 transform group-hover:scale-105">
                  Try Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent 
              -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;