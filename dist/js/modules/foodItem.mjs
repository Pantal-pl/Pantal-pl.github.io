const foodItemEl = document.createElement("section");
foodItemEl.setAttribute("class", "homePage");

foodItemEl.insertAdjacentHTML(
  "beforeend",
  `<div class="foodItem">
  <div class="foodImage"></div>
  <div class="tags">
    <h3>Tags:</h3>
    <p>Mexicano</p>
    <p>Meal</p>
    <p>Mexicano</p>
  </div>
  <h2>{data.results.title$}</h2>
</div>`
);
