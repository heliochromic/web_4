function changeFilter(element) {
  console.log("okie");
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
      for (let pizza of data) {
        const contentList = Object.keys(pizza["content"]);
        if (contentList.includes(content)) {
          for (let pizzaCard of document.querySelectorAll(".pizza-panel")) {
            if (
              pizzaCard.querySelector(".caption > h3").textContent ==
              pizza.title
            ) {
              pizzaCard.style.display = "block";
            }
          }
        }
      }

      for (let pizza of data) {
        const contentList = Object.keys(pizza["content"]);
        if (!contentList.includes(content)) {
          for (let pizzaCard of document.querySelectorAll(".pizza-panel")) {
            if (
              pizzaCard.querySelector(".caption > h3").textContent ==
              pizza.title
            ) {
              pizzaCard.style.display = "none";
            }
          }
        }
      }
    })
    .catch((error) => {
      console.error("Error in orderlist:", error);
    });
}
