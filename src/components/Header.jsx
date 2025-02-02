import image from '../assets/react.svg';

function Header() {
  return (
    <header className='app-header'>
      <img src={image} />
      <h1>The Color Crack</h1>
    </header>
  );
}

export default Header;