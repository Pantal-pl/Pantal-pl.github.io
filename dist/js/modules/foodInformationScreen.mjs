import { logicForHomePage } from "./homePageScreen.mjs";
const body = document.querySelector("body");
function createFoodInformationEl(element) {
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
        <p>${element.dishTypes[0]}</p>
        <p>${element.cuisines[0]}</p>
      </div>
    </div>
    <div class="description">
      <h1>${element.title}</h1>
      <h2>Instructions</h2>
      <p>
        ${element.instructions}
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
  body.appendChild(foodInformationEL);
}
const logicForFoodInformationEl = (element) => {
  console.log(element);
  let homePageEl = document.querySelector(".homePage");
  homePageEl.style.display = "none";
  createFoodInformationEl(element);
  let recipeDescription = document.querySelector(".description p");
  if (recipeDescription.innerText === "null") {
    recipeDescription.innerText = "Instruction not found :(";
  }else {
    let recipeDescriptionString = recipeDescription.innerText
    recipeDescriptionString = recipeDescriptionString.replace(/\./g, '. <br/> <br/>')
    recipeDescription.innerHTML = recipeDescriptionString

  }
 
  let recipeIngredients = document.querySelector(".description ul");
  element.extendedIngredients.forEach((line) => {
    recipeIngredients.innerHTML += `<li>${line.originalString}</li>`;
  });

  let descriptionFoodImage = document.querySelector(".foodDescription .imageAndTags .foodImage");
  descriptionFoodImage.style.backgroundImage = `url(${element.image})`;

  const backButton = document.querySelector(".backButton")
  backButton.addEventListener("click",function(){
  homePageEl.style.display = "flex";
  body.lastChild.remove()
  window.scrollTo(0,0)
  })
};
export { logicForFoodInformationEl };