import { useReducer } from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Guess from "./components/Guess";

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1', '#33FFF3'];

const initialState = {
  targetColor: '',
  isRevealed: false,
  isModalOpen: false,
  modalMessage: '',
  correctGuesses: false,
  score: 0,
  status: 'ready'
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "active" };
    case "GENERATE_NEW_COLOR":
      return {
        ...state,
        targetColor: colors[Math.floor(Math.random() * colors.length)],
        isRevealed: false,
      };
    case "REVEAL_COLOR":
      return {
        ...state,
        isRevealed: true,
      };
    case "SET_MODAL_MESSAGE":
      return {
        ...state,
        modalMessage: action.payload,
        correctGuesses: action.correct,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "INCREMENT_SCORE":
      return {
        ...state,
        score: state.score + 10,
      };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="app">
      <Header />
      <Main>
        {state.status === "ready" && <StartScreen dispatch={dispatch} />}
        {state.status === "active" && <Guess dispatch={dispatch} state={state} />}
      </Main>
    </div>
  );
}

export default App;
