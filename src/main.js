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

// Map of image extensions (Alpha asset is a .jpg, others are .png)
const maleImageExt = { Alpha: 'jpg', Beta: 'png', Sigma: 'png', Gigachad: 'png' };

function getMaleImagePath(type) {
  const ext = maleImageExt[type] || 'png';
  return `pics/${type}.${ext}`;
}

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

  if (score <= 65) maleType = "Beta";
  else if (score <= 80) maleType = "Alpha";
  else if (score <= 95) maleType = "Sigma";
  else maleType = "Gigachad";
  
  renderResultPage(maleType, rizzLines[maleType], score);
}

function renderResultPage(maleType, rizzline, score) {
  const resultElement = document.querySelector(".js-result");
  const inputScreen= document.querySelector('.js-input-screen');
  const resultDiv=document.querySelector('.js-result-div');
  
  // Show result div with proper flex layout
  resultDiv.classList.remove('hidden');
  resultDiv.classList.add('flex');
  inputScreen.classList.add('hidden');
  
  if (!resultElement) {
    console.error("Result element not found!");
    return;
  }
  
  const displayScore = Math.min(score, 100); // clamp just in case
  const imagePath = getMaleImagePath(maleType);

  resultElement.innerHTML = `
    <div class="flex flex-col items-center justify-center h-full w-full overflow-y-auto">
      <!-- Avatar -->
      <div class="flex justify-center mb-3">
        <img src="${imagePath}" alt="${maleType} avatar" class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-400 shadow-lg" onerror="this.style.display='none'">
      </div>
      
      <!-- Title and Type -->
      <div class="text-center mb-3">
        <h1 class="text-xl sm:text-2xl font-bold text-white mb-1">Your Result</h1>
        <div class="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
          ${maleType}
        </div>
      </div>
      
      <!-- Rizz Lines -->
      <div class="text-center mb-3 px-3 max-w-sm mx-auto">
        <div class="text-white text-xs sm:text-sm leading-relaxed">
          ${rizzline}
        </div>
      </div>
      
      <!-- Score -->
      <div class="bg-white/20 backdrop-blur-sm rounded-lg p-2 mb-3 border border-white/30">
        <div class="text-white text-center">
          <span class="text-lg sm:text-xl font-bold">${displayScore}</span>
          <span class="text-sm sm:text-base opacity-80">/100</span>
        </div>
      </div>
      
      <!-- Button -->
      <div>
        <button onclick="window.location.reload()" class="px-4 py-2 sm:px-6 sm:py-2 border-2 border-gray-400 text-white font-bold rounded-lg hover:bg-gray-500/20 hover:border-gray-300 active:bg-gray-600/30 active:scale-95 transition-all duration-200 text-xs sm:text-sm">
          Test Again
        </button>
      </div>
    </div>
  `;
}
