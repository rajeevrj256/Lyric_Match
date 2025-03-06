import React from "react";

const ResponseMessage = ({ message, isCorrect }) => {
  return (
    <div
      className={`mt-4 px-4 py-2 rounded-lg ${
        isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {message}
    </div>
  );
};

export default ResponseMessage;
