export default function StartScreen({dispatch}) {
  return (
    <div className="start">
      <h2 className="welcome">Welcome to Color Crack</h2>
      <button className="btn" onClick={()=>dispatch({type: 'start'})}>Start Game</button>
    </div>
  );
}