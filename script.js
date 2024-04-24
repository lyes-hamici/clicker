class Item {
  #name;
  #price;
  #possess;
  #imagePath;
  #description;
  constructor(name, price, path, description) {
    this.#name = name;
    this.#price = price;
    this.#possess = 0;
    this.#imagePath = path;
    this.#description = description;
  }

  incrementPrice(params) {
    this.#price += params;
  }
  incrementPossess() {
    this.#possess += 1;
  }

  get Possess() {
    return this.#possess;
  }
  get Price() {
    return this.#price;
  }
  get Name() {
    return this.#name;
  }
  get ImagePath() {
    return this.#imagePath;
  }
  get Description() {
    return this.#description;
  }

  toJSON() {
    return {
      name: this.#name,
      price: this.#price,
      possess: this.#possess,
      imagePath: this.#imagePath,
      description: this.#description,
    };
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var valueClick = localStorage.getItem("valueClick") || 1;
  var valueAuto = localStorage.getItem("valueAuto") || 0;
  var score = localStorage.getItem("score") || 0;

  var itemList =
    JSON.parse(localStorage.getItem("itemList")) ||
    [
      // Exemple new Item("Cursor", 10, "images/cookie.png", "Auto clicker"),
    ];

  itemList = itemList.map(
    (item) => new Item(item.name, item.price, item.imagePath, item.description)
  );

  // document should be changed to the id of the div
  //   document.getElementById("")
  document.addEventListener("click", addToScore);

  setInterval(function () {
    score += valueAuto;
    localStorage.setItem("score", score);
  }, 1000);

  function addToScore() {
    score += valueClick;
    localStorage.setItem("score", score);
  }

//   Update local storage info every time the user leaves the page
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("valueClick", valueClick);
    localStorage.setItem("valueAuto", valueAuto);
    localStorage.setItem("itemList", JSON.stringify(itemList));
  });
});
