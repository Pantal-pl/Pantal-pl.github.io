const body = document.querySelector("body");
let similarRecipesArr = []
let favouritesIds = []
let duplicates = []
let i = 0
function refresh(){
    if(favouritesIds.length!=0){
      document.querySelector(".favouriteElement .foodItems").innerHTML = "<div></div>"
      favouritesIds.forEach((id,index)=>{
        fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=c7af2dc174ae45e1ada59835211ca534&includeNutrition=false`
        )
        .then((response) => response.json())
        .then((favourite)=>{
          document.querySelector(".favouriteElement .foodItems").insertAdjacentHTML('beforeend',`
          <div class="foodItem">
        <div class="foodImageAndTags">
        <div class="foodImage"></div>
        <div class="tags">
          <h3>About:</h3>
          <p>${favourite.readyInMinutes} min.</p>
          <p>Servings: ${favourite.servings}</p>
          <p>${favourite.cuisines[0]}</p>
        </div>
        </div>
        <h2>${favourite.title}</h2>
      </div>`)
      let foodImages = document.querySelectorAll(
        ".tryThisElement .foodItems .foodItem .foodImage"
      );
      [...foodImages[index].style.backgroundImage] = `url(${favourite.image})`;
        })
      
      })
  
    }else {
      console.log("ss")
    }
    [...document.querySelectorAll(".favouriteElement .foodItems .foodItem")].forEach((item)=>{
      JSON.parse(duplicates.push(item.outerHTML))
  })
  console.log(duplicates)
}
function createFoodInformationEl(element) {
  const foodInformationEL = document.createElement("section");
  foodInformationEL.setAttribute("class", "foodInformation");

  foodInformationEL.insertAdjacentHTML(
    "beforeend",
    `
  <div class="foodDescription">
    <div class="imageAndTags">
      <div class="foodImage"></div>
      <button class="addToFavouriteBtn" id="">
        <img src="/dist/images/Star 1.svg" alt="click to add to favourite" />
      </button>
      <div class="tags">
        <h3>About</h3>
        <p>${element.dishTypes[0]}</p>
        <p>${element.cuisines[0]}</p>
        <p>Servings: ${element.servings}</p>
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
  <div class="similarRecipesSection">
    <h2>Similar recipes</h2>
    <div class="similarRecipes">
    </div>
  </div>
  `
  );
  body.appendChild(foodInformationEL);

}
const logicForFoodInformationEl = (element) => {
  console.log(element)
  let homePageEl = document.querySelector(".homePage");
  homePageEl.style.display = "none";

  createFoodInformationEl(element);
  let recipeDescription = document.querySelector(".description p");

  if (recipeDescription.innerText === "null") {
    recipeDescription.innerText = "Instruction not found :(";
  } else {
    let recipeDescriptionString = recipeDescription.innerText;
    recipeDescriptionString = recipeDescriptionString.replace(
      /\./g,
      ". <br/> <br/>"
    );
    recipeDescription.innerHTML = recipeDescriptionString;
  }
  let recipeIngredients = document.querySelector(".description ul");
  element.extendedIngredients.forEach((line) => {
    recipeIngredients.innerHTML += `<li>${line.originalString}</li>`;
  });

  let descriptionFoodImage = document.querySelector(
    ".foodDescription .imageAndTags .foodImage"
  );
  descriptionFoodImage.style.backgroundImage = `url(${element.image})`;

 let addToFavouriteBtn = document.querySelector(".addToFavouriteBtn")
    addToFavouriteBtn.addEventListener("click",function(){
      if(JSON.parse(localStorage.getItem("favourite").includes(element.id))){
        favouritesIds = favouritesIds.filter(item => item != element.id)
        return;
      }else{
        favouritesIds.push(element.id)
        JSON.stringify(localStorage.setItem("favourite",favouritesIds))
      }
    })
  const backButton = document.querySelector(".backButton");
  backButton.addEventListener("click", function () {
    homePageEl.style.display = "flex";
    body.lastChild.remove();
    window.scrollTo(0, 0);
  });
  let similarRecipes = document.querySelector(".similarRecipes");
  fetch(
    `https://api.spoonacular.com/recipes/${element.id}/similar?apiKey=c7af2dc174ae45e1ada59835211ca534`
  )
    .then((response) => response.json())
    .then((similarRecipe) => {
      similarRecipesArr.push(similarRecipe);
      console.log(similarRecipesArr);
      similarRecipesArr.forEach((recipe, index) => {
        console.log(recipe);
        recipe.forEach((element) => {
          similarRecipes.insertAdjacentHTML(
            "beforeend",
            `<div class="similarRecipe">
            <p>${element.title}</p>
          </div>`
          );
        });
      });
    });


  console.log(favouritesIds.length)

    if(i===1){
      document.querySelector(".favouriteElement .headingElement button").addEventListener("click",refresh.bind(this))
    }
    i++;
};


export { logicForFoodInformationEl};
