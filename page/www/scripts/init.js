document.addEventListener("DOMContentLoaded", function () {
  const cart = document.getElementById("cart");

  fetch("./scripts/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((pizza) => {
        // Create a new pizza card element
        const card = document.createElement("div");
        card.className = "pizza-panel";
        let content = "";

        for (const key in pizza.content) {
          const elements = pizza.content[key];
          content += elements.join(", ") + ", ";
        }

        const contentString =
          content.charAt(0).toUpperCase() + content.slice(1);

        card.innerHTML = `
          <div class="pizza-card">
            <img src="${pizza.icon}" />
            <div class="caption">
              <h3>${pizza.title}</h3>
              <p class="pizza-type">${pizza.type}</p>
              <p>${contentString}</p>
            </div>
            <div class="order-buttons">
              <div class="buy_button small_pizza">
                <div class="svg-container">
                  <img src="assets/images/size-icon.svg" alt="size-icon" />
                  ${pizza.small_size.size}
                </div>
                <div class="svg-container">
                  <img src="assets/images/weight.svg" alt="size-icon" />
                  ${pizza.small_size.weight}
                </div>
                <div class="price-container">
                  <div class="price">${pizza.small_size.price}</div>
                  <div class="grn">грн</div>
                </div>
                <button onclick="addItemToOrder(this)" class="add-to-order" data-id="${pizza.id}">Купити</button>
              </div>
              <div class="buy_button big_pizza">
                <div class="svg-container">
                  <img src="assets/images/size-icon.svg" alt="size-icon" />
                  ${pizza.big_size.size}
                </div>
                <div class="svg-container">
                  <img src="assets/images/weight.svg" alt="size-icon" />
                  ${pizza.big_size.weight}
                </div>
                <div class="price-container">
                  <div class="price">${pizza.big_size.price}</div>
                  <div class="grn">грн</div>
                </div>
                <button onclick="addItemToOrder(this)" class="add-to-order" data-id="${pizza.id}">Купити</button>
              </div>
            </div>
          </div>
        `;

        // Append the pizza card to the cart
        cart.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function addItemToOrder(button) {
  const pizzaId = button.getAttribute("data-id");
  const cartItem = document.getElementById(pizzaId);

  if (cartItem) {
    // If the item already exists in the cart, increase the quantity
    const quantityElement = cartItem.querySelector(".quantity");
    const quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
  } else {
    // If the item doesn't exist in the cart, add it as a new item
    const pizzaCard = button.closest(".pizza-card");
    const pizzaTitle = pizzaCard.querySelector("h3").textContent;
    const pizzaSize = button
      .closest(".buy_button")
      .querySelector(".svg-container:first-child").textContent;
    const pizzaPrice = button
      .closest(".buy_button")
      .querySelector(".price").textContent;

    const cartItem = document.createElement("div");
    cartItem.id = pizzaId;
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <span class="pizza-title">${pizzaTitle}</span>
      <span class="pizza-size">${pizzaSize}</span>
      <span class="quantity">1</span>
      <span class="pizza-price">${pizzaPrice}</span>
      <button class="remove-from-cart" onclick="removeItemFromOrder(this)">Remove</button>
    `;

    const cart = document.getElementById("cart");
    cart.appendChild(cartItem);
  }
}

function removeItemFromOrder(button) {
  const cartItem = button.closest(".cart-item");
  cartItem.remove();
}
