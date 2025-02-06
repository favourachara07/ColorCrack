import confetti from "canvas-confetti";
import React, { useState, useEffect } from "react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { lightenDarkenColor } from "../utils/lightenDarkenColor";
import { generateShades } from "../utils/generateShades";
import { shuffleArray } from "../utils/shuffleArray";

const Guess = ({ state, dispatch }) => {
  const [color, setColor] = useState(getRandomColor());
  const [shades, setShades] = useState(generateShades(color));

  useEffect(() => {
    const newShades = shuffleArray(generateShadesWithColor(color));
    setShades(newShades);
    console.log(`Correct answer: ${color}`);
  }, [color]);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function generateShadesWithColor(color) {
    const shades = generateShades(color);
    if (!shades.includes(color)) {
      shades[Math.floor(Math.random() * shades.length)] = color;
    }
    return shades;
  }

  function handleGuess(shade) {
    if (shade === color) {
      dispatch({
        type: "SET_MODAL_MESSAGE",
        payload: "Congratulations! You guessed the correct color.",
        correct: true,
      });
      dispatch({ type: "INCREMENT_SCORE" });
      confetti();
    } else {
      dispatch({
        type: "SET_MODAL_MESSAGE",
        payload: "Sorry, that is not the correct color.",
        correct: false,
      });
    }
    setTimeout(() => {
      dispatch({ type: "TOGGLE_MODAL" });
    }, 20);
  }

  function handleNextGuess() {
    const newColor = getRandomColor();
    setColor(newColor);
    setShades(generateShades(newColor));
    dispatch({ type: "TOGGLE_MODAL" });
    dispatch({ type: "GENERATE_NEW_COLOR" });
  }

  return (
    <div className="guess_container">
      <h2 className="guess_text" data-testid="gameInstructions">
        Challenge: Identify the right color!
      </h2>
      <div className="score_bar">
        <h3 data-testid="score">Score: {state.score}</h3>
      </div>
      <div
        className="color_box"
        data-testid="colorBox"
        style={{ backgroundColor: color, margin: "10px auto" }}
      ></div>
      <div className="color-options">
        {shades.map((shade, index) => (
          <div
            key={index}
            className="color_option"
            data-testid="colorOption"
            style={{
              backgroundColor: shade,
              width: "4rem",
              height: "4rem",
              margin: "5px",
              cursor: "pointer",
            }}
            onClick={() => handleGuess(shade)}
          ></div>
        ))}

      </div>
      <button
          className="btn new-btn"
          style={{ backgroundColor: color}}
          onClick={() => dispatch({ type: "RESET_GAME" })}
        >
          Start New Game
        </button>
      {state.isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="modal">
          <div data-testid="gameStatus" className="modal-container">
            {state.correctGuesses ? (
              <BsCheckCircle color="#4CAF50" size={60} />
            ) : (
              <BsXCircle color="#F44336" size={60} />
            )}
            <h3 className="">{state.modalMessage}</h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="next-btn"
              onClick={handleNextGuess}
            >
              Next guess
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guess;
