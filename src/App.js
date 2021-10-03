import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetter from "./components/WrongLetter";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./components/helpers";
import { ThemeProvider } from "./contexts/ThemeContext";

const words = [
  "python",
  "kotlin",
  "java",
  "javaScript",
  "go",
  "swift",
  "pascal",
  "delphi",
  "fortran",
  "matlab",
];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetter, setCorrectLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      // 65 == a 90 == z 222 == i
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetter.includes(letter)) {
            setCorrectLetter((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetter.includes(letter)) {
            setWrongLetter((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetter, wrongLetter, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetter([]);
    setWrongLetter([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }
  return (
    <ThemeProvider>
      <>
        <Header />
        <div className="game-container">
          <Figure wrongLetter={wrongLetter} />
          <WrongLetter wrongLetter={wrongLetter} />
          <Word selectedWord={selectedWord} correctLetter={correctLetter} />
        </div>
        <Popup
          correctLetter={correctLetter}
          wrongLetter={wrongLetter}
          selectedWord={selectedWord}
          setPlayable={setPlayable}
          playAgain={playAgain}
        />
        <Notification showNotification={showNotification} />
      </>
    </ThemeProvider>
  );
}

export default App;
