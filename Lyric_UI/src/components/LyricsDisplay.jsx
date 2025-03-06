import React from "react";

const LyricsDisplay = ({ lyrics }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold">🎵 Guess the Song! 🎶</h2>
      <p className="italic mt-2">{lyrics ? `"${lyrics}"` : "Click the button to generate a lyric!"}</p>
    </div>
  );
};

export default LyricsDisplay;
