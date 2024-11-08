import Header from './Header';

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src='/public/images/logo-dark.png' alt='' />
      <span>
        <h3>My Todo ⬠ </h3>
      </span>
      <Header />
    </div>
  );
};

export default Navbar;
