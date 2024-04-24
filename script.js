document.addEventListener("DOMContentLoaded", function () {
  let valueClick = parseInt(localStorage.getItem("valueClick")) || 1;
  let valueAuto = parseInt(localStorage.getItem("valueAuto")) || 0;
  let score = parseInt(localStorage.getItem("score")) || 0;

  let boxGame = document.querySelector(".box-game");
  let balance = document.getElementById("balance");

  // items variables ->
  let items = JSON.parse(localStorage.getItem("items")) || [
    { id: "card-1", price: 10, level: 0 },
    { id: "card-2", price: 20, level: 0 },
  ];

  //  items.forEach((item) => {
  //    let card = document.getElementById(item.id);
  //    card.querySelector(".price").innerHTML = item.price;
  //    card.querySelector(".level").innerHTML = item.possessed;
  //  });

  boxGame.addEventListener("click", addToScore);

  setInterval(function () {
    score += valueAuto;
    balance.innerHTML = score;
    localStorage.setItem("score", score);
  }, 1000);

  function addToScore() {
    score += valueClick;
    balance.innerHTML = score;
    localStorage.setItem("score", score);
  }

  document
    .querySelector(".card-container")
    .addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
        let card = event.target.closest(".card");
        let item = items.find((item) => item.id === card.id);
        if (score >= item.price) {
          score -= item.price;
          item.level++;
          item.price *= 2; // or however you want to increase the price
          // update the score display and the card display
          balance.innerHTML = score;
          card.querySelector(".price").innerHTML = item.price;
          card.querySelector(".level").innerHTML = item.level;
          // save everything to localStorage
          localStorage.setItem("score", score);
          localStorage.setItem("items", JSON.stringify(items));
        }
      }
    });

  // Update local storage info every time the user leaves the page
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("valueClick", valueClick);
    localStorage.setItem("valueAuto", valueAuto);
    localStorage.setItem("itemList", JSON.stringify(itemList));
  });
});
