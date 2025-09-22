import { SignIn, useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import { assets } from '../assets/assets';
import { Menu } from 'lucide-react';
import flexAi from '../assets/flexAi.png'

const Layout = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const {user} = useUser();
  
  return user ? (
    <div className='flex flex-col items-start justify-start h-screen w-full overflow-hidden'>
        <nav className='w-full px-8 min-h-14 flex items-center justify-between
        border-b border-gray-200'>
          <img  className="w-32 sm:w-44 cursor-pointer" src={flexAi} onClick={() => navigate("/")} alt="dummyLogoColored" />
          {
           sidebar ? (<X onClick={()=> setSidebar(false)} className='w-6 h-6
            text-gray-600 sm:hidden'/>) 
             : <Menu onClick={()=> setSidebar(true)} className="w-6 h-6 text-gray-600 sm:hidden"/>
          }
        </nav>

        <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
          <div className='flex-1 bg-[#FAF7FB]'>
            <Outlet />
          </div>
        </div>
        </div>
  ) : (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout