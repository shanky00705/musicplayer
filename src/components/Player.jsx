import React, { useContext } from "react";
import { songsData } from "../songsData";
import { datacontext } from "../context/UserContext";
import { IoPlay } from "react-icons/io5";
import { MdOutlinePause } from "react-icons/md";
import { motion } from "framer-motion";

function Player() {
  const { playingSong, playSong, pauseSong, index } = useContext(datacontext);
  const currentSong = songsData[index];

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full md:w-[60%] fixed bottom-[55px] md:bottom-0 
        bg-white/10 backdrop-blur-lg border border-white/20 
        rounded-t-2xl shadow-lg flex items-center justify-between 
        px-4 md:px-6 py-3 md:py-4 z-40"
    >
      {/* Song Info */}
      <div
        className="flex items-center gap-4 w-[75%] cursor-pointer"
        onClick={() => (!playingSong ? playSong() : pauseSong())}
      >
        <motion.img
          src={currentSong.image}
          alt={currentSong.name}
          className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-xl shadow-lg"
          animate={playingSong ? { rotate: 360 } : { rotate: 0 }}
          transition={{
            repeat: playingSong ? Infinity : 0,
            duration: 15,
            ease: "linear",
          }}
        />
        <div className="flex flex-col justify-center">
          <h3 className="text-white font-semibold text-sm md:text-lg line-clamp-1">
            {currentSong.name}
          </h3>
          <p className="text-gray-300 text-xs md:text-sm line-clamp-1">
            {currentSong.singer}
          </p>
        </div>
      </div>

      {/* Play/Pause Button */}
      <div className="flex items-center justify-center w-[20%]">
        {!playingSong ? (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={playSong}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              text-white flex items-center justify-center shadow-md hover:opacity-90 transition"
            title="Play"
          >
            <IoPlay className="w-5 h-5" />
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={pauseSong}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              text-white flex items-center justify-center shadow-md hover:opacity-90 transition"
            title="Pause"
          >
            <MdOutlinePause className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default Player;
