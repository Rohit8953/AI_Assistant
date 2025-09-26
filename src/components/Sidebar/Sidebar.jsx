import { Protect, SignedOut, useUser } from "@clerk/clerk-react";
import { Eraser, FileText, Hash, Home, Image, LogOut, Scissors, SquarePen, Users, Sparkles, ChevronRight, Settings } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai/dashboard", label: "Dashboard", Icon: Home, type: 'dashboard' },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen, type: 'article' },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash, type: 'blog-title' },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image, type: 'image' },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText, type: 'resume-review' },
  // { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  // { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/community", label: "Community", Icon: Users }
];


const Sidebar = ({ sidebar, setSidebar, signOut }) => {
  const { user, openUserProfile } = useUser();
  
  // Get gradient colors based on type
  const getTypeGradient = (type) => {
    switch (type) {
      case 'article': return 'from-blue-500 to-cyan-500';
      case 'blog-title': return 'from-pink-400 to-pink-500';
      case 'image': return 'from-green-500 to-emerald-500';
      case 'resume-review': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebar && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        bg-white/95 backdrop-blur-lg border-r border-gray-100/50
        flex flex-col justify-between
        w-64 transform transition-all duration-300 ease-in-out
        ${sidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        shadow-xl lg:shadow-none
      `}>
        
        {/* Header */}
        <div className="p-2 border-b border-gray-100/50">
          <div 
            onClick={openUserProfile}
            className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-gray-50/50 transition-all duration-200"
          >
            <div className="relative">
              <img
                src={user?.imageUrl}
                alt="User avatar"
                className="w-12 h-12 rounded-2xl border-2 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="">
              <h3 className="font-semibold text-start text-gray-900 truncate group-hover:text-gray-700 transition-colors">
                {user?.fullName}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Protect
                  plan="premium"
                  fallback={
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Free Plan
                    </span>
                  }
                >
                  <span className="text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Premium
                  </span>
                </Protect>
              </div>

            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {navItems?.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => window?.innerWidth < 1024 && setSidebar(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden
                  ${isActive 
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 border-r-2 border-blue-500 shadow-sm" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"></div>
                    )}
                    
                    <div className={`
                      p-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                        : "bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
                      }`
                    }>
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <span className="flex-1 text-start">{label}</span>
                    
                    {/* Hover arrow */}
                    <ChevronRight className={`
                      w-4 h-4 transition-all duration-200
                      ${isActive ? "text-blue-500" : "text-transparent group-hover:text-gray-400"}
                      group-hover:translate-x-0.5
                    `} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Quick Stats Section */}
          <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl border border-gray-100/50">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Usage</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">AI Generations</span>
                <span className="font-semibold text-gray-900">12/50</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{ width: '24%' }}></div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Images Created</span>
                <span className="font-semibold text-gray-900">8/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100/50">
          {/* Settings Button */}
          <button 
            onClick={() => {/* Add settings navigation */}}
            className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50/50 transition-all duration-200 group"
          >
            <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700 transition-all">
              <Settings className="w-4 h-4" />
            </div>
            <span className="flex-1 text-left">Settings</span>
          </button>

          {/* Sign Out Button */}
          <button 
            onClick={signOut}
            className="flex items-center cursor-pointer gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50/50 transition-all duration-200 group mt-1"
          >
            <div className="p-2 rounded-lg bg-red-100 text-red-600 group-hover:bg-red-200 group-hover:text-red-700 transition-all">
              <LogOut className="w-4 h-4" />
            </div>
            <span  className="flex-1 text-left">Sign Out</span>
          </button>

          {/* Version Info */}
          <div className="mt-4 pt-4 border-t border-gray-100/50">
            <p className="text-xs text-gray-400 text-center">
              FlexAI v2.1.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;