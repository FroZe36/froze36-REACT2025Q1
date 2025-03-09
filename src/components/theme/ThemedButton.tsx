import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemedButton = () => {
  const { theme, toogleTheme } = useContext(ThemeContext);
  return (
    <button type="button" onClick={() => toogleTheme()} className="button_icon">
      {theme === 'light' ? (
        <svg className="icon">
          <use xlinkHref={`/sprite.svg#moon`}></use>
        </svg>
      ) : (
        <svg className="icon">
          <use xlinkHref={`/sprite.svg#sun`}></use>
        </svg>
      )}
    </button>
  );
};
export default ThemedButton;
