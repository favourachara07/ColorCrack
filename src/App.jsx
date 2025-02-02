
import { useReducer } from 'react';
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import StartScreen from './components/StartScreen';
import Guess from './components/Guess';

const initialState={
  currentColor: '',
  guess: '',
  score: 0,
  status: 'ready',
  highScore: 0
}

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      // current question
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        scores:
          action.payload === question.correctOption
            ? state.scores + question.points
            : state.scores,
      };
    }
    case "nextGuess":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}


function App() {
  const [{ currentColor, guess,score, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'ready' && <StartScreen dispatch={dispatch} />}
        {status ==='active' && <Guess dispatch={dispatch} />}
      </Main>
    </div>
  )
}

export default App
