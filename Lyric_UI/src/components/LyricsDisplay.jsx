import React from "react";

const LyricsDisplay = ({ lyrics }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold text-center ">  🎵 🎵 Guess the Song! 🎶🎶</h2>
      {lyrics ? (
        <p className="italic mt-2 whitespace-pre-line">"{lyrics}"</p>
      ) : (
        <p className="italic mt-2">Click the button to generate a lyric!</p>
      )}
    </div>
  );
};

export default LyricsDisplay;
