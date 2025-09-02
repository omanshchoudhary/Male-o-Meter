import "./index.css";

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

const nameInput = document.getElementById("js-name-input");
const dobInput = document.getElementById("js-dob-input");
const submitButton = document.getElementById("submit-btn");

if (submitButton) {
  submitButton.addEventListener("click", () => {

    const nameValue = nameInput ? nameInput.value.trim() : "";
    const dobValue = dobInput ? dobInput.value : "";
    
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
}

function renderResultPage(maleType, rizzline, score) {
  const resultElement = document.querySelector(".js-result");
  const inputScreen= document.querySelector('.js-input-screen');
  inputScreen.classList.add('hidden');
  
  if (!resultElement) {
    console.error("Result element not found!");
    return;
  }
  
  resultElement.innerHTML = `
      <div class="flex justify-center mb-6">
        <img src="pics/${maleType}.png" class="w-32 h-32 rounded-full object-cover border-4 border-gray-400">
      </div>
      
      <div class="text-center mb-6">
        <h1 class="text-4xl font-bold text-white mb-2">Your Result</h1>
        <div class="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
          ${maleType}
        </div>
      </div>
      
      <div class="rizz-lines text-center mb-8 max-w-2xl">
        ${(() => {
          const sentences = rizzline.split(/[.!?]\s+/);
          if (sentences.length >= 2) {
            const firstPart = sentences.slice(0, Math.ceil(sentences.length / 2)).join('. ') + '.';
            const secondPart = sentences.slice(Math.ceil(sentences.length / 2)).join('. ') + '.';
            return `
              <p class="text-white text-lg mb-3">${firstPart}</p>
              <p class="text-white text-lg mb-3">${secondPart}</p>
            `;
          } else {
            // If no proper sentences found, split roughly in the middle
            const midPoint = Math.floor(rizzline.length / 2);
            const spaceIndex = rizzline.indexOf(' ', midPoint);
            const splitPoint = spaceIndex !== -1 ? spaceIndex : midPoint;
            
            const firstPart = rizzline.substring(0, splitPoint);
            const secondPart = rizzline.substring(splitPoint + 1);
            
            return `
              <p class="text-white text-lg mb-3">${firstPart}</p>
              <p class="text-white text-lg mb-3">${secondPart}</p>
            `;
          }
        })()}
      </div>
      
      <div class="bg-white/20 rounded-xl p-4 mb-6">
        <div class="text-white text-center mt-2">
          <span class="text-2xl font-bold">${score}</span>
          <span class="text-lg">/100</span>
        </div>
      </div>
      
      <div class="flex gap-4">
        <button onclick="window.location.href='./index.html'" class="px-8 py-3 border-2 border-gray-400 text-white font-bold rounded-xl hover:bg-gray-500/20 hover:border-gray-300 active:bg-gray-600/30 active:scale-95 transition-all duration-200">
          Test Again
        </button>
      </div>
  `;
}

