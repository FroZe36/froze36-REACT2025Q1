import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import icons from './sprite.svg';

function dataURItoBlobUrl(dataURI: string) {
  const svg = decodeURI(dataURI).split(',')[1];
  const blob = new Blob([svg], { type: 'image/svg+xml' });

  return URL.createObjectURL(blob);
}

const blobUrl = dataURItoBlobUrl(icons);

const ThemedButton = () => {
  const { theme, toogleTheme } = useContext(ThemeContext);
  return (
    <button type="button" onClick={() => toogleTheme()} className="button_icon">
      {theme === 'light' ? (
        <svg className="icon">
          <use xlinkHref={`${blobUrl}#moon`}></use>
        </svg>
      ) : (
        <svg className="icon">
          <use xlinkHref={`${blobUrl}#sun`}></use>
        </svg>
      )}
    </button>
  );
};
export default ThemedButton;
