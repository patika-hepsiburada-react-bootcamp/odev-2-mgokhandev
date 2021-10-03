export function showNotification(setter) {
  setter(true);
  setTimeout(() => {
    setter(false);
  }, 2000);
}

// Oyunun kazanma - kaybetme durumunu kontrol ediyor

export function checkWin(correct, wrong, word) {
  let status = "win";

  // If word does not exist, do nothing.
  if (!word) {
    return;
  }

  //check for win
  word.split("").forEach((letter) => {
    if (!correct.includes(letter)) {
      status = "";
    }
  });

  //check for lost
  if (wrong.length === 5) status = "lose";
  return status;
}
