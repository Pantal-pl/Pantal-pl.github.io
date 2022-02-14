import { API_KEY } from "../main.js";
import { warningBannerActive } from "./warningBanner.mjs";


const body = document.querySelector("body");
let similarRecipesArr = []
let favouritesRecipes = []
let isEvExist = 0;
const bandColors = ["e84317","f8e46c","813531","ff611d","982121","cf5c3c"]

function refresh(element,favouritesIds){
  favouritesIds = localStorage.getItem("favourite").split(",")
  favouritesRecipes = []
    if(favouritesIds.length>0){
      warningBannerActive("Success","#339900","#f0f0f0")
      document.querySelector(".favouriteElement .foodItems").innerHTML = "<div></div>"
      favouritesIds.forEach((id,index)=>{
        fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`
        )
        .then((response) => response.json())
        .then((favourite)=>{
          favouritesRecipes.push(favourite)
          document.querySelector(".favouriteElement .foodItems").insertAdjacentHTML('beforeend',`
          <div class="foodItem" id="favouriteItem${index}">
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
        ".favouriteElement .foodItems .foodItem .foodImage"
      );
      foodImages[index].style.backgroundImage = `url(${favourite.image})`;

        })
      });
      setTimeout(()=>{
        document.querySelectorAll(".favouriteElement .foodItems .foodItem").forEach((item,index)=>{
          item.addEventListener("click",()=>{
            logicForFoodInformationEl(favouritesRecipes[index])
            console.log(favouritesRecipes)
          })
        })
      },1000)
    }else {
      warningBannerActive("Nothing to show")
    }
}

function createFoodInformationEl(element) {
  const foodInformationEL = document.createElement("section");
  foodInformationEL.setAttribute("class", "foodInformation");
  foodInformationEL.classList.add("slide-in-left")
  setTimeout(()=>{
    foodInformationEL.classList.remove("slide-in-left")
  },500)
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
        <p id="dishTypes">${element.dishTypes[0]}</p>
        <p id="cuisines">${element.cuisines[0]}</p>
        <p id="servings">Servings: ${element.servings}</p>
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
  let favouritesIds = localStorage.getItem("favourite").split(",")
  favouritesIds = favouritesIds.filter((item) => item != "")

  console.log(favouritesIds)
  console.log(typeof favouritesIds)
  
  let menuBar = document.querySelector(".menuBar")
  menuBar.classList.remove("menuBarActive")

  localStorage.setItem("favourite",favouritesIds)

  let homePageEl = document.querySelector(".homePage");
  homePageEl.style.zIndex = "-99999";
  homePageEl.style.opacity = "0";
  window.scrollTo(0, 0);

  createFoodInformationEl(element);

  if(element.cuisines.length === 0) {
    document.querySelector("#cuisines").textContent = "Not found"
  }
  if(element.dishTypes.length === 0) {
    document.querySelector("#dishTypes").textContent = "Not found"
  }
  let recipeDescription = document.querySelector(".description p");
  if (recipeDescription.innerText === "null") {
    recipeDescription.innerText = "Instruction not found :(";
  } else {
    let recipeDescriptionString = recipeDescription.innerText;
    recipeDescriptionString = recipeDescriptionString.replace(/\./g,". <br/> <br/>");
    recipeDescription.innerHTML = recipeDescriptionString;
  }


  let recipeIngredients = document.querySelector(".description ul");
  element.extendedIngredients.forEach((line) => {
    recipeIngredients.insertAdjacentHTML('beforeend',`<li>${line.original}</li>`);
  });
  let descriptionFoodImage = document.querySelector(
    ".foodDescription .imageAndTags .foodImage"
  );
  descriptionFoodImage.style.backgroundImage = `url(${element.image})`;


 let addToFavouriteBtn = document.querySelector(".addToFavouriteBtn")
    addToFavouriteBtn.addEventListener("click",function(){
      if(JSON.parse(localStorage.getItem("favourite").includes(element.id))){
        favouritesIds = [...new Set(favouritesIds)]
        favouritesIds = favouritesIds.filter(item => item != element.id)
        localStorage.setItem("favourite",favouritesIds)
        addToFavouriteBtn.querySelector("img").src = "dist/images/Star 1.svg"
        console.log("exist")
        warningBannerActive("Removed")
      }else{
        console.log("new")
        warningBannerActive("Added to favourite")
        favouritesIds.push(element.id)
        localStorage.setItem("favourite",favouritesIds)
        addToFavouriteBtn.querySelector("img").src = "dist/images/Star 2.svg"
      }
      addToFavouriteBtn.style.transform = "scale(1.2)"
      setTimeout(()=>{addToFavouriteBtn.style.transform = "scale(1)"},500)
    })


  const backButton = document.querySelector(".backButton");
  backButton.addEventListener("click", function () {
    homePageEl.style.zIndex = "1";
    homePageEl.style.opacity = "1";
    body.lastChild.remove();
    window.scrollTo(0, 0);
    if(body.contains(document.querySelector(".searchResults"))){
      document.querySelector(".searchResults").style.display = "grid";
    }
  });


  let similarRecipes = document.querySelector(".similarRecipes");
  fetch(
    `https://api.spoonacular.com/recipes/${element.id}/similar?apiKey=${API_KEY}&number=${localStorage.getItem("recipesRange")}`
  )
    .then((response) => response.json())
    .then((similarRecipe) => {
      similarRecipesArr = []
      similarRecipesArr.push(similarRecipe);
      console.log(similarRecipesArr);
      similarRecipesArr.forEach((recipe) => {
        recipe.forEach((element) => {
          similarRecipes.insertAdjacentHTML(
            "beforeend",
            `<div class="similarRecipe">
            <p>${element.title}</p>
            <a href="${element.sourceUrl}" target="_blank">Click to open</a>
            <span class="band"></span
          </div>`
          );
        });
      });
      let decoratesBands = document.querySelectorAll(".band")
      decoratesBands.forEach((band,index)=>{
        band.style.background = `#${bandColors[index]}`
      })
    });
 
    if(isEvExist === 0){
      const refreshButton =  document.querySelector(".favouriteElement .headingElement #refreshFavourites")
      const deleteAllFavouritesButton =  document.querySelector(".favouriteElement .headingElement #deleteAllFavourites")
      refreshButton.addEventListener("click",refresh.bind(this,element,favouritesIds))
      deleteAllFavouritesButton.addEventListener("click",()=>{
        localStorage.setItem("favourite",[])
        warningBannerActive("Deleted","#cc3300","#f0f0f0")
      })
    }
    isEvExist++
};


export { logicForFoodInformationEl};
