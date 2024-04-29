document.addEventListener("DOMContentLoaded", function () {
  //========================Default values========================//
  const DEFAULT_VALUE_CLICK = 1;
  const DEFAULT_VALUE_AUTO = 0;
  const DEFAULT_SCORE = 0;
  const DEFAULT_INTERVAL_MS = 5000;
  const PRICE_INCREASE_FACTOR = 2;

  //=====================Loading variables from localstorage or setting on zero=====================//
  let valueClick =
    parseInt(localStorage.getItem("valueClick")) || DEFAULT_VALUE_CLICK;
  let valueAuto =
    parseInt(localStorage.getItem("valueAuto")) || DEFAULT_VALUE_AUTO;
  let score = parseInt(localStorage.getItem("score")) || DEFAULT_SCORE;
  let intervalMS =
    parseInt(localStorage.getItem("intervalMS")) || DEFAULT_INTERVAL_MS;

  // items variables -> id, price, level
  let items = JSON.parse(localStorage.getItem("items")) || [
    { id: "card-1", price: 10, level: 0 },
    { id: "card-2", price: 20, level: 0 },
    { id: "card-3", price: 30, level: 0 },
    { id: "card-4", price: 40, level: 0 },
    { id: "card-5", price: 50, level: 0 },
    { id: "card-6", price: 60, level: 0 },
    { id: "card-7", price: 70, level: 0 },
    { id: "card-8", price: 80, level: 0 },
  ];

  //========================DOM elements========================//
  let boxGame = document.querySelector(".box-game");
  let balance = document.getElementById("balance");

  items.forEach(updateCardDisplay);
  boxGame.addEventListener("click", addToScore);

  document
    .querySelector(".card-container")
    .addEventListener("click", handleCardContainerClick);

  //===============Functions================//

  setInterval(function () {
    score += valueAuto;
    updateScoreDisplay();
  }, intervalMS);

  function addToScore() {
    score += valueClick;
    updateScoreDisplay();
  }

  function updateCardDisplay(item) {
    const card = document.getElementById(item.id);
    card.querySelector(".price-text").textContent = item.price;
    card.querySelector(".level").textContent = item.level;
  }

  function handleCardContainerClick(event) {
    if (event.target.tagName === "BUTTON") {
      const card = event.target.closest(".card");
      const item = items.find((item) => item.id === card.id);
      if (score >= item.price) {
        purchaseItem(item);
      }
    }
  }

  function purchaseItem(item) {
    score -= item.price;
    item.level++;
    item.price *= PRICE_INCREASE_FACTOR;
    updateScoreDisplay();
    updateCardDisplay(item);
    updateBuff(item);
    updateItemList();
  }

  function updateBuff(item) {
    if (item.id === "card-1") {
      if (intervalMS > 110) {
        intervalMS -= 100;
        updateIntervalMS();
      }
    } else if (item.id === "card-2") {
      valueClick *= 2;
    } else if (item.id === "card-3") {
      if (valueAuto > 0) {
        valueAuto *= 2;
      } else {
        valueAuto = 1;
      }
    } else if (item.id === "card-4") {
      score *= 2;
    } else if (item.id === "card-5") {
      // Temporary bonus
      const BONUS_DURATION_MS = (10000 * item.level) / 2;
      const BONUS_MULTIPLIER = (2 * item.level) / 2;

      score *= BONUS_MULTIPLIER;
      setTimeout(function () {
        score /= BONUS_MULTIPLIER;
      }, BONUS_DURATION_MS);
    } else if (item.id === "card-6") {
      // Reinitialisation
      resetGame();
    } else if (item.id === "card-7") {
      // Click
      document.body.classList.add("custom-cursor");
    } else if (item.id === "card-8") {
    }
  }

  function incrementValueClick(value) {
    valueClick += value;
    updateValueClick();
  }

  function incrementValueAuto(value) {
    valueAuto += value;
    updateValueAuto();
  }

  function resetGame() {
    valueClick = DEFAULT_VALUE_CLICK;
    valueAuto = DEFAULT_VALUE_AUTO;
    score = DEFAULT_SCORE;
    items = [
      { id: "card-1", price: 10, level: 0 },
      { id: "card-2", price: 20, level: 0 },
      { id: "card-3", price: 30, level: 0 },
      { id: "card-4", price: 40, level: 0 },
      { id: "card-5", price: 50, level: 0 },
      { id: "card-6", price: 60, level: 0 },
      { id: "card-7", price: 70, level: 0 },
      { id: "card-8", price: 80, level: 0 },
    ];
    updateScoreDisplay();
    items.forEach(updateCardDisplay);
    updateItemList();
    updateValueAuto();
    updateValueClick();
  }

  //============Local storage update============//

  function updateScoreDisplay() {
    balance.innerHTML = score;
    localStorage.setItem("score", score);
  }

  function updateValueClick() {
    localStorage.setItem("valueClick", valueClick);
  }

  function updateIntervalMS() {
    localStorage.setItem("intervalMS", intervalMS);
  }

  function updateValueAuto() {
    localStorage.setItem("valueAuto", valueAuto);
  }
  
  function updateItemList() {
    localStorage.setItem("items", JSON.stringify(items));
  }



  // Update local storage info every time the user leaves the page
  window.addEventListener("beforeunload", function () {
    updateItemList();
    updateValueAuto();
    updateValueClick();
    updateScoreDisplay();
  });
});
