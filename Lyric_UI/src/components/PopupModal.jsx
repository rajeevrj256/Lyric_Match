import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#1e293b",
    color: "white",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center",
    width: "300px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

Modal.setAppElement("#root");

const PopupModal = ({ isOpen, onClose, message, isWin, correctSong }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className={`text-2xl font-bold ${isWin ? "text-green-400" : "text-red-400"}`}>
        {isWin ? "🎉 You Win! 🎉" : "❌ Game Over!"}
      </h2>
      {isWin  && (

        <p className="mt-3">{message}</p>
      )
      }
      {!isWin && correctSong && (
        <p className="mt-2 text-yellow-300">The correct song was: <strong>{correctSong}</strong></p>
      )}
      <button
        onClick={onClose}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
      >
        Close
      </button>
    </Modal>
  );
};

export default PopupModal;
