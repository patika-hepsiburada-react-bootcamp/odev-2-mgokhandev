import React from "react";

function Word({ selectedWord, correctLetter }) {
  return (
    <div className="word">
      {selectedWord.split("").map((letter, i) => {
        return (
          <span className="letter" key={i}>
            {correctLetter.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
}

export default Word;
