import React, { useState } from "react";

const GuessForm = ({ onSubmit, attemptsLeft }) => {
  const [guess, setGuess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.trim() !== "") {
      onSubmit(guess);
      setGuess("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-center">
      <input
        type="text"
        placeholder="Enter your guess..."
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        className="border border-gray-400 p-2 rounded-lg w-64 text-white"
      />
      <button
        type="submit"
        disabled={attemptsLeft === 0}
        className={`mt-3 px-4 py-2 text-white rounded-lg ${
          attemptsLeft === 0 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        Check Answer
      </button>
    </form>
  );
};

export default GuessForm;
