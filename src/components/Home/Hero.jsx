import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      
      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-green-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 px-4 sm:px-20 xl:px-32 w-full max-w-7xl mx-auto">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">
              Trusted by 10,000+ creators worldwide
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold leading-tight">
            Create amazing content{" "}
            <span className="relative inline-block">
              with
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-purple-400 opacity-30 rounded-full"></span>
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI tools
            </span>
          </h1>

          <p className="mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 leading-relaxed">
            Transform your content creation with our suite of premium AI tools. 
            Write articles, generate images, and enhance your workflow with cutting-edge technology.
          </p>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">50+</div>
              <div className="text-sm text-gray-600">AI Tools</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
        <button
          onClick={() => navigate("/ai/dashboard")}
          className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-semibold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start creating now
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button className="group bg-white/80 backdrop-blur-sm border border-gray-200 px-12 py-4 rounded-2xl font-semibold text-lg text-gray-700 hover:bg-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Watch demo
        </button>
      </div>

      {/* Floating AI Icons */}
      <div className="absolute bottom-10 left-10 opacity-20 animate-float">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl rotate-12"></div>
      </div>
      <div className="absolute top-10 right-10 opacity-20 animate-float animation-delay-2000">
        <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Hero;