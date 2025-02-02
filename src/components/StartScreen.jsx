export default function StartScreen({dispatch}) {
  return (
    <div>
      <h2>Welcome to Color Crack</h2>
      <button onClick={()=>dispatch({type: 'start'})}>Start Game</button>
    </div>
  );
}