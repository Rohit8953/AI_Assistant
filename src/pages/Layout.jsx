import { SignIn, useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import { Menu, X, Sparkles, User, Settings, LogOut } from 'lucide-react';
import flexAi from '../assets/flexAi.png'

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  // const users = await clerk.users.getUserList();
  console.log(user); 
  const handleSignOut = () => {
    // Add your sign out logic here
    console.log('Sign out clicked');
  };

  return user ? (
    <div className='flex flex-col h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50/30 overflow-hidden'>
      {/* Navigation Header */}
      <nav className='w-full px-6 sm:px-8 py-4 flex items-center justify-between
        bg-white/80 backdrop-blur-sm border-b border-gray-100/50 shadow-sm'>
        
        {/* Left Section - Logo and Menu */}
        <div className='flex items-center gap-4'>
          <img 
            className="w-32 sm:w-36 cursor-pointer transform hover:scale-105 transition-transform duration-200" 
            src={flexAi} 
            onClick={() => navigate("/")} 
            alt="FlexAI Logo" 
          />
          
          {/* Desktop Navigation */}
          {/* <div className='hidden md:flex items-center gap-1 ml-6'>
            <button 
              onClick={() => navigate("/dashboard")}
              className='px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200'
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate("/ai-tools")}
              className='px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200'
            >
              AI Tools
            </button>
            <button 
              onClick={() => navigate("/projects")}
              className='px-4 py-2 text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-200'
            >
              Projects
            </button>
          </div> */}
        </div>

        {/* Right Section - User Info and Actions */}
        <div className='flex items-center gap-4'>
          {/* Premium Badge */}
          <div className='hidden sm:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1.5 rounded-full text-sm font-medium'>
            <Sparkles className='w-4 h-4' />
            <span>Premium</span>
          </div>

          {/* User Profile */}
          <div className='flex items-start gap-3'>
            <div className='hidden sm:flex flex-col justify-center items-start'>
              <span className='text-sm text-start font-semibold text-gray-900'>{user.fullName || 'User'}</span>
              <span className='text-xs text-gray-500'>{user.primaryEmailAddress?.emailAddress}</span>
            </div>
            
            {/* User Avatar Dropdown */}
            <div className='relative group'>
              <div className='flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 cursor-pointer hover:border-blue-300 transition-all duration-200'>
                <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
                  <User className='w-4 h-4 text-white' />
                </div>
                <span className='hidden lg:block text-sm font-medium text-gray-700'>Profile</span>
              </div>
              
              {/* Dropdown Menu */}
              <div className='absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50'>
                <div className='p-2'>
                  <button className='w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
                    <User className='w-4 h-4' />
                    <span>My Profile</span>
                  </button>
                  <button className='w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200'>
                    <Settings className='w-4 h-4' />
                    <span>Settings</span>
                  </button>
                  <div className='border-t border-gray-100 my-1'></div>
                  <button 
                    onClick={handleSignOut}
                    className='w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200'
                  >
                    <LogOut className='w-4 h-4' />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setSidebar(!sidebar)}
            className='md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
          >
            {sidebar ? (
              <X className='w-5 h-5 text-gray-600' />
            ) : (
              <Menu className='w-5 h-5 text-gray-600' />
            )}
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className='flex-1 flex w-full h-[calc(100vh-80px)]'>
        {/* Sidebar */}
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        
        {/* Overlay for mobile sidebar */}
        {sidebar && (
          <div 
            className='fixed inset-0 bg-black/20 z-40 md:hidden'
            onClick={() => setSidebar(false)}
          />
        )}

        {/* Main Content */}
        <main className='flex-1 bg-gradient-to-br from-white to-blue-50/20 overflow-auto'>
          <div className='p-6 sm:p-8'>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Floating Action Button for Mobile */}
      <button className='fixed bottom-6 right-6 md:hidden w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-30'>
        <Sparkles className='w-6 h-6' />
      </button>
    </div>
  ) : (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Brand Header */}
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-4'>
            <img 
              src={flexAi} 
              alt="FlexAI" 
              className='w-40 h-auto'
            />
          </div>
          <h1 className='text-2xl font-bold text-gray-900'>Welcome Back</h1>
          <p className='text-gray-600 mt-2'>Sign in to access your AI tools</p>
        </div>
        
        {/* SignIn Component with Styling */}
        <div className='bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100/50 p-6'>
          <SignIn 
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none bg-transparent",
                headerTitle: "text-lg font-semibold text-gray-900",
                headerSubtitle: "text-gray-600",
                socialButtonsBlock: "space-y-3",
                socialButton: "border-gray-200 hover:border-blue-300 transition-colors",
                formButtonPrimary: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all",
                footerActionLink: "text-blue-600 hover:text-blue-700 font-medium"
              }
            }}
          />
        </div>
        
        {/* Additional Info */}
        <div className='text-center mt-6'>
          <p className='text-sm text-gray-500'>
            New to FlexAI?{' '}
            <a href="#" className='text-blue-600 hover:text-blue-700 font-medium'>
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Layout;