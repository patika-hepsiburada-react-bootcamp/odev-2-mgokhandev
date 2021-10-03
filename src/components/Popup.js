import React, { useEffect } from "react";
import { checkWin } from "./helpers";

const Popup = ({
  correctLetter,
  wrongLetter,
  selectedWord,
  setPlayable,
  playAgain,
}) => {
  let finalMessage = "";
  let finalMessageRevealWord = "";
  let playable = true;

  if (checkWin(correctLetter, wrongLetter, selectedWord) === "win") {
    finalMessage = "Kazandınız :) ";
    playable = false;
  } else if (checkWin(correctLetter, wrongLetter, selectedWord) === "lose") {
    finalMessage = "Kaybettiniz :(";
    finalMessageRevealWord = `Kelime: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => setPlayable(playable));

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        <button onClick={playAgain}>Tekrar Oynayın :)</button>
      </div>
    </div>
  );
};

export default Popup;
