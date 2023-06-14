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
                <span class="order-counter">${pizzaObject.amount}</span>
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

        // Retrieve existing pizza items from local storage
        var pizzaItemsJSON = localStorage.getItem("pizzaItems");
        var pizzaItems = [];

        if (pizzaItemsJSON) {
          pizzaItems = JSON.parse(pizzaItemsJSON);
        }

        // Create a local storage object for the current pizza item
        var pizzaObject = {
          title: pizza.title,
          sizeLabel: sizeLabel,
          size: pizza[size + "_size"].size,
          weight: pizza[size + "_size"].weight,
          price: pizza[size + "_size"].price,
          icon: pizza.icon,
          amount: 0,
        };

        // Add the pizza object to the pizza items array
        pizzaItems.push(pizzaObject);

        // Convert the array to a JSON string
        var pizzaItemsJSONUpdated = JSON.stringify(pizzaItems);

        // Store the updated array in local storage
        localStorage.setItem("pizzaItems", pizzaItemsJSONUpdated);
      }
    })
    .catch((error) => {
      console.error("Error in orderlist:", error);
    });
}

// On page load, check if there are saved pizza items in local storage
window.addEventListener("load", function () {
  var pizzaItemsJSON = localStorage.getItem("pizzaItems");
  if (pizzaItemsJSON) {
    // If saved items exist, parse them back to an array
    var pizzaItems = JSON.parse(pizzaItemsJSON);

    // Iterate over the array and create HTML elements for each pizza item
    for (let pizzaObject of pizzaItems) {
      let itemElement = document.createElement("div");
      itemElement.classList.add("order-list-item");

      itemElement.innerHTML = `
        <div class="order-list-text">
          <span class="ordered-pizza-name">${pizzaObject.title} ${pizzaObject.sizeLabel}</span>
          <div class="features">
            <div class="svg-container">
              <img src="assets/images/size-icon.svg" alt="size-icon" />
              <span>${pizzaObject.size}</span>
            </div>
            <div class="svg-container">
              <img src="assets/images/weight.svg" alt="size-icon" />
              <span>${pizzaObject.weight}</span>
            </div>
          </div>
          <div class="price-config">
            <span class="order-list-price">${pizzaObject.price} грн</span>
            <div class="amount-config">
              <button class="round-button add">-</button>
              <span class="order-counter">${pizzaObject.amount}</span>
              <button class="round-button delete">+</button>
              <button class="round-button remove">x</button>
            </div>
          </div>
        </div>
        <img
          src="${pizzaObject.icon}"
          alt="small order pizza"
          class="ordered-pizza-img"
        />
      `;

      // Append the item element to the order list container
      const order = document.getElementById("order-list");
      order.appendChild(itemElement);
    }
  }
});
