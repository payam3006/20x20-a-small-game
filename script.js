q = console.log;

const words = [
  "payam",
  "mohajerat",
  "esfahan",
  "ahmad",
  "asadi",
  "looyeh",
  "rasht",
  "kurosh",
  "doctor",
  "jigar",
  "programming",
  "webdev",
];
const possibleKeys = [];
// for (let i = 65; i <= 90; i++) {
//   possibleKeys.push(String.fromCharCode(i));
// }
for (let i = 97; i <= 122; i++) {
  possibleKeys.push(String.fromCharCode(i));
}

const maxMistake = 6;
let mistakeNum = 0;
let answerArray = [];
let wrongLetters = [];
let isFinished = false;

const wrongLettersDiv = document.getElementById("wrongLetters");
const inputLettersDiv = document.getElementById("inputLetters");
const resetBtn = document.getElementById("resetBtn");
const notification = document.getElementById("notification");
const winBox = document.getElementById("winBox");
const loseBox = document.getElementById("loseBox");

reset();

function setAnswer() {
  const answer = words[Math.floor(Math.random() * words.length)];

  for (let i = 0; i < answer.length; i++) {
    answerArray.push(answer[i]);
  }
  inputLettersDiv.innerHTML = "";
  for (let i = 0; i < answer.length; i++) {
    inputLettersDiv.innerHTML += `<div id="letter${i}" class="letter question">?</div>`;
  }
  wrongLetters = [];
}

function fillWrongLetters() {
  if (wrongLetters.length == 0) {
    wrongLettersDiv.innerHTML = "";
  } else {
    wrongLettersDiv.innerHTML = `<div class="wrongLettersTitle">Wrong</div>`;
    for (let i = 0; i < wrongLetters.length; i++) {
      wrongLettersDiv.innerHTML += `<div class="wrongLetter">${wrongLetters[i]},</div>`;
    }
  }
}

function resetHang() {
  for (let i = 1; i <= 6; i++) {
    document.getElementById(`${i}`).classList.add("hidden");
  }
}

function reset() {
  setAnswer();
  fillWrongLetters();
  resetHang();
  winBox.classList.remove("show");
  loseBox.classList.remove("show");
  isFinished = false;
  mistakeNum = 0;
}

window.addEventListener("keypress", action);

// q(answerArray);

function isCompelete() {
  if (document.getElementsByClassName("question").length == 0) {
    return true;
  }
  return false;
}

function action(event) {
  const letter = event.key;
  if (!isFinished) {
    if (possibleKeys.includes(letter)) {
      if (answerArray.includes(letter)) {
        for (let i = 0; i < answerArray.length; i++) {
          if (letter == answerArray[i]) {
            document.getElementById(`letter${i}`).innerHTML = letter;
            document.getElementById(`letter${i}`).classList.remove("question");
          }
        }
        if (isCompelete()) {
          winBox.classList.add("show");
          isFinished = true;
        }
      } else {
        if (wrongLetters.includes(letter)) {
          notification.classList.remove("out");
          setInterval(function () {
            notification.classList.add("out");
          }, 4200);
        } else {
          if (mistakeNum == maxMistake) {
            loseBox.classList.add("show");
            isFinished = true;
          } else {
            mistakeNum += 1;
            wrongLetters.push(letter);
            fillWrongLetters();
            document.getElementById(`${mistakeNum}`).classList.remove("hidden");
          }
        }
      }
    }
  }
}
