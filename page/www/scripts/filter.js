var pizzaCardAmount = 0;

function changeFilter(element) {
  pizzaCardAmount = 0;
  let property = element.closest(".filter-property");
  const content = property.getAttribute("content");

  let filterProperties = document.querySelectorAll("#filter .filter-property");

  filterProperties.forEach((prop) => {
    if (prop) prop.classList.remove("active-property");
  });
  element.classList.add("active-property");

  fetch("./scripts/data.json")
    .then((response) => response.json())
    .then((data) => {
      for (let pizzaCard of document.querySelectorAll(".pizza-panel")) {
        pizzaCard.style.display = "none";
        const pizzaTitle = pizzaCard.querySelector(".caption > h3").textContent;

        for (let pizza of data) {
          const contentList = Object.keys(pizza["content"]);

          if (content == "all" || contentList.includes(content)) {
            if (pizza.title === pizzaTitle) {
              pizzaCard.style.display = "block";
              pizzaCardAmount++;
              break;
            }
          } else if (content == "vegan") {
            if (pizza.type == "Веган піца" && pizza.title === pizzaTitle) {
              pizzaCard.style.display = "block";
              pizzaCardAmount++;
              break;
            }
          }

          //when i click on button with content "vegan" i want to make pizzaCard.style.display = "block"; for object that corresponds to div and has pizza.type == "Веган піца"
        }
      }
      document.querySelector("#main-pay-sum").innerText = pizzaCardAmount;
    })
    .catch((error) => {
      console.error("Error in orderlist:", error);
    });
}
