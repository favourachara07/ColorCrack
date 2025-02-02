import React, { useState, useEffect } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1', '#33FFF3'];

export default function Guess({ dispatch }) {
  const [targetColor, setTargetColor] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [correctGuesses, setCorrectGuesses] = useState(false);

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setTargetColor(randomColor);
  }, []);

  const handleGuess = (color) => {
    setIsRevealed(true);
    if (color === targetColor) {
      setModalMessage('Congratulations! You guessed the correct color.');
    } else {
      setModalMessage('Sorry, that is not the correct color.');
    }
    setTimeout(() => {
      toggleModal();
    }, 900); // Delay of 5 seconds
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="guess_container">
      <h2>Try and Guess the right color</h2>
      {isRevealed && (
        <div className="color_box" data-testid="colorBox" style={{ backgroundColor: targetColor, width: '100px', height: '100px', margin: '10px auto' }}>
        </div>
      )}

      <div className="color_options">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color_option"
            data-testid="colorOption"
            style={{ backgroundColor: color, width: '50px', height: '50px', margin: '5px', cursor: 'pointer' }}
            onClick={() => handleGuess(color)}
          ></div>
        ))}
      </div>

      <button onClick={() => dispatch({ type: "restart" })}>
        Start New Game
      </button>

      {/* modal */}
      {isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="modal">
          <div className="modal-container">
            <button
              type="button"
              className="modal-close"
              data-modal-hide="popup-modal"
              onClick={toggleModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
            <BsCheckCircle size={60} />
            <BsXCircle />
              {/* <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg> */}
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {modalMessage}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={toggleModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}