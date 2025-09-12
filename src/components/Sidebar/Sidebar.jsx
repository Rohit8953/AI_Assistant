import { Protect, SignedOut, useUser } from "@clerk/clerk-react";
import { Eraser, FileText, Hash, Home, Image, LogOut, Scissors, SquarePen, Users } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", Icon: Home },
  { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
  { to: "/ai/community", label: "Community", Icon: Users },
];

const Sidebar = ({sidebar, setSidebar}) => {
    const {user, openUserProfile} = useUser();
  return (
    <div>
      <div
        className={` bg-white border-r border-gray-200 flex flex-col
justify-between items-center max-sm:absolute top-14 bottom-2 ${
          sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="my-7 w-full">
          <img
            src={user.imageUrl}
            alt="User avatar"
            className="w-6 sm:w-6 rounded-full mx-auto"
          />
          <h1 className="mt-1 text-center">{user.fullName}</h1>
          <div className="px-6 mt-10 text-sm text-gray-600 font-medium">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-md transition-colors duration-200 ${
                    isActive ? "bg-gray-200 text-gray-900" : "text-gray-600 w-full"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="text-nowrap">{label}</span>
              </NavLink>
            ))}
          </div>
        </div>{" "}
      </div>

      <div className="w-full border-t border-gray-200 p-4 text-xs text-gray-500 flex justify-between items-center">
         <div onClick={openUserProfile} className="text-start flex items-start  gap-2 cursor-pointer ">
            <img src={user.imageUrl} alt="User avatar" className="w-5 h-5 rounded-full" />
            <p className="text-xs flex flex-col text-gray-500">
              <span className="font-medium text-xl">{user.fullName}</span>
              <Protect plan={'premium'} fallback="free"> Premium Plan</Protect>
            </p>
         </div>
         <LogOut onClick={SignedOut} className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer " />
      </div>
    </div>
  );
};

export default Sidebar;

