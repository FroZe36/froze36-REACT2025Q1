import { NavLink } from 'react-router';

const Header = () => {
  return (
    <header>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/uncontrolled">Uncontrolled</NavLink>
      <NavLink to="/controlled">Controlled</NavLink>
    </header>
  );
};
export default Header;
