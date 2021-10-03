import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetter from "./components/WrongLetter";
import Word from "./components/Word";
import Popup from "./components/Popup";
import Notification from "./components/Notification";
import { showNotification as show } from "./components/helpers";
import { ThemeProvider } from "./contexts/ThemeContext"; // Tema değişikliği için fakat çalışmıyor :)

function App() {
  const [word, setWord] = useState("");
  const [playable, setPlayable] = useState(true);
  const [correctLetter, setCorrectLetter] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      // 65 == a 90 == z 222 == i
      if (playable && keyCode >= 65 && keyCode <= 222) {
        const letter = key.toLowerCase();
        if (word.includes(letter)) {
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
  }, [word, correctLetter, wrongLetter, playable]);

  // Oynanabilir hale gelince tekrardan veri çekiyor
  useEffect(() => {
    if (playable) {
      getRandomWord();
    }
  }, [playable]);

  const getRandomWord = async () => {
    const res = await fetch(
      "https://random-word-form.herokuapp.com/random/noun"
    );
    const [data] = await res.json();

    setWord(data);
  };

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetter([]);
    setWrongLetter([]);
  }

  return (
    <ThemeProvider>
      <>
        <Header />
        <div className="game-container">
          <Figure wrongLetter={wrongLetter} />
          <WrongLetter wrongLetter={wrongLetter} />
          <Word selectedWord={word} correctLetter={correctLetter} />
        </div>
        <Popup
          correctLetter={correctLetter}
          wrongLetter={wrongLetter}
          selectedWord={word}
          setPlayable={setPlayable}
          playAgain={playAgain}
        />
        <Notification showNotification={showNotification} />
      </>
    </ThemeProvider>
  );
}

export default App;
