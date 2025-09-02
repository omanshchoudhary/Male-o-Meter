
function renderResultPage(maleType, rizzline, score) {
  const resultElement = document.querySelector(".js-result");
  
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



export default renderResultPage;