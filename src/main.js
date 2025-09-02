import "./index.css";
import renderResultPage from "./result.js";
let maleType;

const rizzLines = {
  Sigma:
    "Oh wow, the shadow walker has arrived. Mr. 'I don't need anyone'—except your WiFi router, that's your only real friend. Keep telling yourself silence is power while the group chat forgets you exist.",
  Gigachad:
    "Walking cheat code, aren't you? Your jawline could slice bread and your flex breaks mirrors. The problem? You've got 3 brain cells, but don't worry — they're absolutely shredded too.",
  Alpha:
    "Here comes the self-proclaimed leader. Always barking orders, never finishing the task. You call it dominance, but really it's just main character syndrome with a WiFi connection.",
  Beta: "Ah, the human doormat. You say 'yes' before the question is even finished. The highlight of your week? Being noticed when tagged in a meme. Side quest character energy, 24/7.",
};

function getMaleType(nameInput, dobInput) {
  const name = nameInput.value;
  const day = parseInt(dobInput.value.split("-")[2]);
  const month = parseInt(dobInput.value.split("-")[1]);
  const year = parseInt(dobInput.value.split("-")[0]);

  const nameLength = name.length;
  const nameSum = name
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const dateSum = day + month + year;

  const score = nameLength * 2 + (nameSum % 50) + (dateSum % 30);

  if (score <= 50) maleType = "Beta";
  else if (score <= 75) maleType = "Alpha";
  else if (score <= 90) maleType = "Sigma";
  else maleType = "Gigachad";
  
  renderResultPage(maleType, rizzLines[maleType], score);
  window.location.href = "./result.html";
}

const nameInput = document.getElementById("js-name-input");
const dobInput = document.getElementById("js-dob-input");
const submitButton = document.getElementById("submit-btn");

if (submitButton) {
  submitButton.addEventListener("click", () => {

    const nameValue = nameInput ? nameInput.value.trim() : "";
    const dobValue = dobInput ? dobInput.value : "";
    
    // Validate inputs
    if (!nameValue) {
      alert("Please enter your name!");
      return;
    }
    
    if (!dobValue) {
      alert("Please enter your date of birth!");
      return;
    }
    
    getMaleType(nameInput, dobInput);
  });
}


