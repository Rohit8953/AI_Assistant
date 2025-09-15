import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import flexAi from '../../assets/flexAi.png'
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
  <div className="fixed top-4 inset-x-0 z-50 w-full 
  backdrop-blur-2xl flex justify-between items-center 
  py-3 px-4 sm:px-10 xl:px-20 overflow-x-hidden">
   <img  className="w-32 sm:w-44 cursor-pointer" src={flexAi} onClick={() => navigate("/")} alt="dummyLogoColored" />
  {user ? (
    <UserButton />
  ) : (
    <button
      className="flex items-center gap-2 rounded-full text-sm
       cursor-pointer bg-primary text-white px-6 sm:px-8 py-2.5"
      onClick={openSignIn}
    >
      Get started
      <ArrowRight className="w-4 h-4" />
    </button>
  )}
</div>
  );
};

export default Navbar;
