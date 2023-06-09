function addItemToOrder(button) {
  const buyButton = button.closest(".buy_button");
  const size_property = Array.from(buyButton.classList)[1];
  const order = document.getElementById("order-list");

  var size;

  if (size_property == "big_pizza") {
    size = "big";
  } else {
    size = "small";
  }

  const pizzaCard = button.closest("div.pizza-card");
  const pizzaName = pizzaCard.querySelector(".caption > h3").innerText;

  fetch("./scripts/data.json")
    .then((response) => response.json())
    .then((data) => {
      for (let pizza of data) {
        if (pizza.title !== pizzaName) {
          continue;
        }
        var sizeLabel;
        if (size === "big") {
          sizeLabel = "(Велика)";
        } else {
          sizeLabel = "(Мала)";
        }

        let itemElement = document.createElement("div");
        itemElement.classList.add("order-list-item");

        itemElement.innerHTML = `
          <div class="order-list-text">
            <span class="ordered-pizza-name">${pizza.title} ${sizeLabel}</span>
            <div class="features">
              <div class="svg-container">
                <img src="assets/images/size-icon.svg" alt="size-icon" />
                <span>${pizza[size + "_size"].size}</span>
              </div>
              <div class="svg-container">
                <img src="assets/images/weight.svg" alt="size-icon" />
                <span>${pizza[size + "_size"].weight}</span>
              </div>
            </div>
            <div class="price-config">
              <span class="order-list-price">${
                pizza[size + "_size"].price
              } грн</span>
              <div class="amount-config">
                <button class="round-button add">-</button>
                <span class="order-counter">1</span>
                <button class="round-button delete">+</button>
                <button class="round-button remove">x</button>
              </div>
            </div>
          </div>
          <img
            src="${pizza.icon}"
            alt="small order pizza"
            class="ordered-pizza-img"
          />
          `;
        order.appendChild(itemElement);
      }
    })
    .catch((error) => {
      console.error("Error in orderlist:", error);
    });
}
