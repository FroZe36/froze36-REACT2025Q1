import { NavLink } from 'react-router';
import styles from '../lib/styles/header.module.css';
const { header } = styles;
const Header = () => {
  return (
    <header className={header}>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/uncontrolled">Uncontrolled</NavLink>
      <NavLink to="/controlled">Controlled</NavLink>
    </header>
  );
};
export default Header;
