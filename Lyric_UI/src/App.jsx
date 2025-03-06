import React, { useState } from "react";
import LyricsDisplay from "./components/LyricsDisplay";
import GuessForm from "./components/GuessForm";
import ResponseMessage from "./components/ResponseMessage";
import PopupModal from "./components/PopupModal";
import axios from "axios";

const API_BASE_URL = "https://lyric-match-backend.onrender.com"; 

const App = () => {
  const [lyrics, setLyrics] = useState("");
  const [message, setMessage] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [actualSongTitle, setActualSongTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isWin, setIsWin] = useState(false);

  // Fetch a new lyric
  const fetchLyrics = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/generate-lyric`);
      setLyrics(response.data.lyrics);
      setMessage("");
      setIsCorrect(null);
      setAttemptsLeft(3);
      setActualSongTitle("");
      setShowModal(false);
    } catch (error) {
      console.error("Error fetching lyrics:", error);
    }
  };

  // Handle guess checking
  const handleGuess = async (guess) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/check-guess`, {
        user_guess: guess,
      });
  
      setMessage(response.data.message);
      setIsCorrect(response.data.correct);
      setAttemptsLeft(response.data.attempts_remaining || 0);
  
      // Handle WIN 
      if (response.data.correct) {
        setModalMessage("🎉 Congratulations! You guessed the song correctly!");
        setIsWin(true);
        setShowModal(true);
        return; 
      }
  
      // Handle LOSE
      if (!response.data.correct && response.data.attempts_left===0) {
        setActualSongTitle(response.data.correct_song_title);
        setModalMessage(`😞 You lost! The correct song was: ${response.data.correct_song_title}`);
        setIsWin(false);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error checking guess:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold">🎶 Song Guessing Game 🎶</h1>
      <button
        onClick={fetchLyrics}
        className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-lg"
      >
        Generate Lyric Snippet
      </button>
      <LyricsDisplay lyrics={lyrics} />
      {lyrics && <GuessForm onSubmit={handleGuess} attemptsLeft={attemptsLeft} />}
      {message && <ResponseMessage message={message} isCorrect={isCorrect} />}
      <p className="mt-2 text-yellow-400">Attempts Left: {attemptsLeft}</p>

      {/* Popup Modal */}
      <PopupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
        isWin={isWin}
        correctSong={actualSongTitle}
      />
    </div>
  );
};

export default App;
