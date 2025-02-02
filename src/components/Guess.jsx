import React, { useEffect } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1', '#33FFF3'];

export default function Guess({ state, dispatch }) {
  useEffect(() => {
    dispatch({ type: 'GENERATE_NEW_COLOR' });
  }, [dispatch]);

  const handleGuess = (color) => {
    dispatch({ type: 'REVEAL_COLOR' });
    if (color === state.targetColor) {
      dispatch({ type: 'SET_MODAL_MESSAGE', payload: 'Congratulations! You guessed the correct color.', correct: true });
      dispatch({ type: 'INCREMENT_SCORE' });
    } else {
      dispatch({ type: 'SET_MODAL_MESSAGE', payload: 'Sorry, that is not the correct color.', correct: false });
    }
    setTimeout(() => {
      dispatch({ type: 'TOGGLE_MODAL' });
    }, 900); // Delay of 5 seconds
  };

  const handleNextGuess = () => {
    dispatch({ type: 'TOGGLE_MODAL' });
    dispatch({ type: 'GENERATE_NEW_COLOR' });
  };

  return (
    <div className="guess_container">
      <h2>Try and Guess the right color</h2>
      <div className="score_bar">
        <h3>Score: {state.score}</h3>
      </div>
      {state.isRevealed && (
        <div className="color_box" data-testid="colorBox" style={{ backgroundColor: state.targetColor, width: '100px', height: '100px', margin: '10px auto' }}>
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

      <button onClick={() => dispatch({ type: "RESET_GAME" })}>
        Start New Game
      </button>

      {/* modal */}
      {state.isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="modal">
          <div className="modal-container">
            <button
              type="button"
              className="modal-close"
              data-modal-hide="popup-modal"
              onClick={() => dispatch({ type: 'TOGGLE_MODAL' })}
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
                {state.correctGuesses ? <BsCheckCircle size={60} /> : <BsXCircle size={60} />}
              
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {state.modalMessage}
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={handleNextGuess}
              >
                Next guess
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}