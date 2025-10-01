import React from "react";
import { TiHome } from "react-icons/ti";
import { IoSearch } from "react-icons/io5";
import { RiPlayListLine } from "react-icons/ri";
import { IoMdHeart } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Nav() {
  const navItems = [
    { to: "/", icon: <TiHome />, label: "Home" },
    { to: "/search", icon: <IoSearch />, label: "Search" },
    { to: "/playlist", icon: <RiPlayListLine />, label: "Playlist" },
    { to: "/liked", icon: <IoMdHeart />, label: "Liked" },
  ];

  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full bottom-0 md:top-0 md:bottom-auto z-50
        bg-black backdrop-blur-md
        flex justify-center items-center
        px-8 md:px-0 py-3 md:py-4 border-t md:border-b border-white/5 shadow-lg"
    >
      <div className="flex justify-around w-full md:w-auto gap-14 md:gap-10 relative">
        {navItems.map(({ to, icon, label }) => {
          const isActive = location.pathname === to;

          return (
            <NavLink
              to={to}
              key={label}
              className={`flex flex-col items-center relative cursor-pointer transition
                ${
                  isActive
                    ? "text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                    : "text-gray-400 hover:text-white"
                }`}
              title={label}
              end
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.4, filter: "drop-shadow(0 0 6px #a78bfa)" }}
                whileTap={{ scale: 0.95 }}
                className="text-4xl md:text-3xl" 
              >
                {icon}
              </motion.div>

              {/* Label (Desktop Only) */}
              <span className="hidden md:block text-xs mt-1 select-none">{label}</span>

              {/* Animated gradient underline */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="underline"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -bottom-1 h-[3px] rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg"
                  />
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default Nav;
