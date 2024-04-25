document.addEventListener("DOMContentLoaded", function () {
  const DEFAULT_VALUE_CLICK = 1;
  const DEFAULT_VALUE_AUTO = 0;
  const DEFAULT_SCORE = 0;
  const INTERVAL_MS = 1000;
  const PRICE_INCREASE_FACTOR = 2;

  let valueClick =
    parseInt(localStorage.getItem("valueClick")) || DEFAULT_VALUE_CLICK;
  let valueAuto =
    parseInt(localStorage.getItem("valueAuto")) || DEFAULT_VALUE_AUTO;
  let score = parseInt(localStorage.getItem("score")) || DEFAULT_SCORE;

  let boxGame = document.querySelector(".box-game");
  let balance = document.getElementById("balance");

  // items variables ->
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

  items.forEach(updateCardDisplay);
  boxGame.addEventListener("click", addToScore);

  setInterval(function () {
    score += valueAuto;
    updateScoreDisplay();
  }, 1000);

  function addToScore() {
    score += valueClick;
    updateScoreDisplay();
  }

  function updateScoreDisplay() {
    balance.innerHTML = score;
    localStorage.setItem("score", score);
  }

  function updateValueClick() {
    localStorage.setItem("valueClick", valueClick);
  }

  function updateValueAuto() {
    localStorage.setItem("valueAuto", valueAuto);
  }

  function updateCardDisplay(item) {
    const card = document.getElementById(item.id);
    card.querySelector(".price-text").textContent = item.price;
    card.querySelector(".level").textContent = item.level;
  }

  function updateItemList() {
    localStorage.setItem("items", JSON.stringify(items));
  }

  document
    .querySelector(".card-container")
    .addEventListener("click", handleCardContainerClick);

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
    updateBuff(item.id);
    updateItemList();
  }

  function updateBuff(id) {
    if (id === "card-1") {
    } else if (id === "card-2") {
    } else if (id === "card-3") {
    } else if (id === "card-4") {
    } else if (id === "card-5") {
    } else if (id === "card-6") {
    } else if (id === "card-7") {
    } else if (id === "card-8") {
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


  // Update local storage info every time the user leaves the page
  window.addEventListener("beforeunload", function () {
    updateItemList();
    updateValueAuto();
    updateValueClick();
    updateScoreDisplay();
  });
});
