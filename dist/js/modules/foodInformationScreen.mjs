const foodInformationEL = document.createElement("section");
foodInformationEL.setAttribute("class", "foodInformation");

foodInformationEL.insertAdjacentHTML(
  "beforeend",
  `
  <div class="foodDescription">
    <div class="imageAndTags">
      <div class="foodImage"></div>
      <button class="addToFavouriteBtn">
        <img src="/dist/images/Star 1.svg" alt="Add to favourite button" />
      </button>
      <div class="tags">
        <h3>About</h3>
        <p>Pasta</p>
        <p>Italian</p>
      </div>
    </div>
    <div class="description">
      <h1>Spaghetti</h1>
      <h2>Instructions</h2>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat,
        aliquam rerum saepe ipsa fugit neque! Obcaecati at ut, consequatur
        est quia tempore possimus, porro perspiciatis praesentium ducimus
        soluta corrupti iure.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
        soluta laboriosam magnam dolor temporibus corrupti explicabo! At
        accusamus nemo officia?
      </p>
      <br />
      <h2>Ingredients</h2>
      <ul>
        <li>1 pound ground beef.</li>
        <li>1 onion, chopped.</li>
        <li>4 cloves garlic, minced.</li>
        <li>1 small green bell pepper, diced.</li>
        <li>1 (28 ounce) can diced tomatoes.</li>
        <li>1 (16 ounce) can tomato sauce.</li>
      </ul>
    </div>
  </div>
  <button class="backButton"></button>

  <div class="similarRecipes">
    <h2>Similar recipes</h2>

    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
    <div class="similarRecipe">
      <div class="similarRecipe-foodImage"></div>
      <p>Spaghetti</p>
    </div>
  </div>`
);
export { foodInformationEL };
