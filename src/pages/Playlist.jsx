import React from "react";
import Player from "../components/Player";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import { motion, AnimatePresence } from "framer-motion";
import { RiPlayListLine } from "react-icons/ri";

function Playlist() {
  let songs = useSelector((state) => state.playlist);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-black via-gray-900 to-black flex justify-start items-center flex-col pt-[20px] md:pt-[100px] gap-[30px] relative overflow-hidden">
      <Player />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center mt-5"
      >
        <h1 className="text-white font-bold text-2xl md:text-3xl flex items-center justify-center gap-2">
          <RiPlayListLine className="text-pink-500" />
          My Playlist
        </h1>
        <p className="text-gray-400 text-sm md:text-base mt-1">
          {songs.length} {songs.length === 1 ? "song" : "songs"} added
        </p>
      </motion.div>

      {/* Playlist Songs */}
      <AnimatePresence>
        {songs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-[65%] md:h-[100%] flex flex-col justify-start items-center gap-5 px-3 overflow-auto pb-24"
          >
            {songs.map((song) => (
              <motion.div
                key={song.songIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <Card
                  name={song.name}
                  image={song.image}
                  singer={song.singer}
                  songIndex={song.songIndex}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Empty State
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center text-gray-600 mt-20 gap-3"
          >
            <RiPlayListLine className="text-6xl opacity-60" />
            <h2 className="text-lg md:text-xl font-semibold">
              No Songs in Playlist
            </h2>
            <p className="text-sm text-gray-400">
              Add songs from Home or Search to see them here 🎶
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Playlist;
