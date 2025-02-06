import React, { useState, useEffect } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

const Guess = ({ state, dispatch }) => {

  const [color, setColor] = useState(getRandomColor());
  const [shades, setShades] = useState(generateShades(color));

  useEffect(() => {
    const newShades = shuffleArray(generateShadesWithColor(color));
    setShades(newShades);
    console.log(`Correct answer: ${color}`);
  }, [color]);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
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

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function generateShades(color) {
    let shades = [];
    for (let i = 0; i < 6; i++) {
      let shade = lightenDarkenColor(color, i * 20 - 50);
      shades.push(shade);
    }
    return shades;
  }

  function lightenDarkenColor(col, amt) {
    let usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let g = ((num >> 8) & 0x00FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    let b = (num & 0x0000FF) + amt;
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    return (usePound ? "#" : "") + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
  }

  function handleGuess(shade) {
    if (shade === color) {
      dispatch({ type: 'SET_MODAL_MESSAGE', payload: 'Congratulations! You guessed the correct color.', correct: true });
      dispatch({ type: 'INCREMENT_SCORE' });
    } else {
      dispatch({ type: 'SET_MODAL_MESSAGE', payload: 'Sorry, that is not the correct color.', correct: false });
    }
    setTimeout(() => {
      dispatch({ type: 'TOGGLE_MODAL' });
    }, 20); 
  }

  function handleNextGuess() {
    const newColor = getRandomColor();
    setColor(newColor);
    setShades(generateShades(newColor));
    dispatch({ type: 'TOGGLE_MODAL' });
    dispatch({ type: 'GENERATE_NEW_COLOR' });
  }

  return (
    <div className="guess_container">
      <h2>Try and Guess the right color</h2>
      <div className="score_bar">
        <h3 data-testid="score"
        >Score: {state.score}</h3>
      </div>
      <div className="color_box" data-testid="colorBox" style={{ backgroundColor: color, width: '16rem', height: '9rem', margin: '10px auto' }}>
      </div>
      <div className="color-options">
        {shades.map((shade, index) => (
          <div
            key={index}
            className="color_option"
            data-testid="colorOption"
            style={{ backgroundColor: shade,  width: '4rem', height: '4rem', margin: '5px', cursor: 'pointer' }}
            onClick={() => handleGuess(shade)}
          ></div>
        ))}
      </div>
      {state.isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="modal">
          <div data-testid="gameStatus" className="modal-container">
            {state.correctGuesses ? <BsCheckCircle color='#4CAF50' size={60} /> : <BsXCircle color='#F44336' size={60} />}
            <h3 className="">
              {state.modalMessage}
            </h3>
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