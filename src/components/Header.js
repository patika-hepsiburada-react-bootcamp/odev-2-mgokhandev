import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`App ${theme === "dark" ? "dark" : "light"}`}>
      <h1>Hangman</h1>
      <p>Adam Asmaca Oyununa Hoşgeldiniz!</p>
      <div>Aktif Tema: {theme}</div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Tema Değiştir
      </button>
    </div>
  );
};

export default Header;
