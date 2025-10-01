import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPlaylistAdd, MdOutlinePlaylistRemove } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { datacontext } from "../context/UserContext";
import { AddSong, RemoveSong } from "../redux/PlaylistSlice";
import { AddLiked, RemoveLiked } from "../redux/LikedSlice";
import { motion } from "framer-motion";

function Card({ name, image, singer, songIndex }) {
  const { playSong, index, setIndex, playingSong } = useContext(datacontext);
  const dispatch = useDispatch();

  const playlist = useSelector((state) => state.playlist);
  const liked = useSelector((state) => state.liked);

  const isInPlaylist = playlist.some((song) => song.songIndex === songIndex);
  const isLiked = liked.some((song) => song.songIndex === songIndex);
  const isActiveSong = index === songIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`w-[90%] md:w-[85%] mx-auto h-[90px] md:h-[110px] 
        rounded-2xl pt-3 flex justify-between items-center
        shadow-md border backdrop-blur-lg cursor-pointer
        ${
          isActiveSong
            ? "bg-gradient-to-r from-pink-500/30 via-purple-500/20 to-indigo-500/30 border-white/40 shadow-lg scale-[1.02]"
            : "bg-white/10 border-white/10 hover:bg-white/20"
        }`}
      onClick={() => {
        setIndex(songIndex);
        playSong();
      }}
    >
      {/* Song Info */}
      <div className="flex items-center gap-4 w-[70%] h-full">
        <motion.img
          src={image}
          alt={name}
          className="w-[65px] h-[65px] md:w-[80px] md:h-[80px] object-cover rounded-xl shadow-lg"
          whileHover={{ scale: 1.05 }}
        />
        <div>
          <div className="text-white font-semibold text-sm md:text-lg truncate max-w-[180px]">
            {name}
          </div>
          <div className="text-gray-300 text-xs md:text-sm truncate max-w-[180px]">
            {singer}
          </div>

          {/* Active song animation */}
          {isActiveSong && playingSong && (
            <div className="flex gap-[3px] mt-[6px]">
              <motion.div
                className="w-[3px] h-[10px] bg-green-400 rounded"
                animate={{ height: [5, 15, 7, 12, 8] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
              <motion.div
                className="w-[3px] h-[14px] bg-green-400 rounded"
                animate={{ height: [12, 6, 14, 8, 10] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
              <motion.div
                className="w-[3px] h-[8px] bg-green-400 rounded"
                animate={{ height: [7, 12, 5, 14, 6] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4 md:gap-6 text-white text-xl md:text-2xl z-10">
        {isInPlaylist ? (
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(RemoveSong(songIndex));
            }}
            className="hover:text-red-400 transition cursor-pointer"
            title="Remove from Playlist"
          >
            <MdOutlinePlaylistRemove />
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(AddSong({ name, image, singer, songIndex }));
            }}
            className="hover:text-green-400 transition cursor-pointer"
            title="Add to Playlist"
          >
            <MdPlaylistAdd />
          </motion.div>
        )}

        {isLiked ? (
          <motion.div
            whileTap={{ scale: 1.3 }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(RemoveLiked(songIndex));
            }}
            className="hover:text-pink-400 transition cursor-pointer"
            title="Remove from Liked"
          >
            <GoHeartFill />
          </motion.div>
        ) : (
          <motion.div
            whileTap={{ scale: 1.3 }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(AddLiked({ name, image, singer, songIndex }));
            }}
            className="hover:text-pink-400 transition cursor-pointer"
            title="Like Song"
          >
            <GoHeart />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Card;
