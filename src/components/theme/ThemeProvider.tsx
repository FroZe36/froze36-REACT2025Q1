import { FC, ReactNode, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toogleTheme: toggleTheme }}>
      <div className={`theme theme-${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
