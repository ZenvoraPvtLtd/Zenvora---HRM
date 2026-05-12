import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: true, toggle: () => {} });

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark((prev) => !prev);
  return <ThemeContext.Provider value={{ isDark, toggle }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
