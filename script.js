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
}



document.addEventListener("DOMContentLoaded", function () {
  var valueClick = 1;
  var valueAuto = 0;
  var score = 0;

  // Remplacer document par la div qui contient les items
  document.addEventListener("click", addToScore)

  itemList = [
    // Exemple new Item("Cursor", 10, "images/cookie.png", "Auto clicker"),
  ];
  

  setInterval(function () {
    score += valueAuto;
  }, 1000);

  function addToScore() {
    score += valueClick
  }
});