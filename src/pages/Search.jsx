import React, { useEffect, useState } from "react";
import Player from "../components/Player";
import { IoSearch } from "react-icons/io5";
import { songsData } from "../songsData";
import Card from "../components/Card";
import { motion, AnimatePresence } from "framer-motion";

function Search() {
  let [input, setInput] = useState("");
  let [newList, setNewList] = useState([]);

  useEffect(() => {
    let a = songsData.filter(
      (song) =>
        song.name.toLowerCase().includes(input.toLowerCase()) ||
        song.singer.toLowerCase().includes(input.toLowerCase())
    );
    setNewList(a);
  }, [input]);

  return (
    <div className="w-full h-[100vh] bg-gradient-to-b from-black via-gray-900 to-black flex justify-start items-center flex-col pt-[20px] md:pt-[100px] gap-[30px] relative overflow-hidden">
      <Player />

      {/* Search Bar */}
      <motion.form
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onSubmit={(e) => e.preventDefault()}
        className="w-[90%] md:w-[60%] h-[55px] bg-white/10 backdrop-blur-lg border border-white/20 
          flex items-center gap-4 rounded-full px-5 shadow-lg"
      >
        <IoSearch className="text-gray-300 text-[20px]" />
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none border-0 text-white text-[16px] placeholder-gray-400"
          placeholder="Search songs..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
      </motion.form>

      {/* Results */}
      {input ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-[65%] md:h-[100%] flex flex-col justify-start items-center gap-5 px-3 overflow-auto pb-24"
        >
          <AnimatePresence>
            {newList.length > 0 ? (
              newList.map((song) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex justify-center"
                >
                  <Card
                    name={song.name}
                    image={song.image}
                    singer={song.singer}
                    songIndex={song.id - 1}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-500 text-lg mt-10 flex flex-col items-center gap-3"
              >
                <IoSearch className="text-4xl opacity-70" />
                <p>No results found</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-[24px] font-semibold mt-10 flex flex-col items-center gap-3"
        >
          <IoSearch className="text-5xl opacity-60" />
          <p>Start typing to search 🎶</p>
        </motion.div>
      )}
    </div>
  );
}

export default Search;
