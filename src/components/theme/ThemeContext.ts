import { createContext } from 'react';

interface ThemeContextProps {
  theme: string;
  toogleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextProps>({
  theme: '',
  toogleTheme: () => {},
});
