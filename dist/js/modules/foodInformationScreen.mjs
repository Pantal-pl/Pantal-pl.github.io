import { API_KEY } from "../main.js";
import { warningBannerActive } from "./warningBanner.mjs";

const body = document.querySelector("body");
let similarRecipesArr = []
const bandColors = ["e84317","f8e46c","813531","ff611d","982121","cf5c3c"]

// coping ingredients    
function CopyMe(TextToCopy) {
  var TempText = document.createElement("input");
  TempText.value = TextToCopy;
  document.body.appendChild(TempText);
  TempText.select();
  
  document.execCommand("copy");
  document.body.removeChild(TempText);
}

//render food information element
function createFoodInformationEl(element) {
  const foodInformationEL = document.createElement("section");
  foodInformationEL.setAttribute("class", "foodInformation");
  //adding slide animation
  foodInformationEL.classList.add("slide-in-left")
  setTimeout(()=>{
    foodInformationEL.classList.remove("slide-in-left")
  },500)
  //inserting HTML template
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
      <button class="copyToClipboard"><img src="/dist/images/copy-files-svgrepo-com.svg"></button>
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
  // getting user favourite recipes IDs from local storage
  let favouritesIds = localStorage.getItem("favourite").split(",")
  favouritesIds = favouritesIds.filter((item) => item != "")

  console.log(favouritesIds)
  console.log(typeof favouritesIds)
  
  let menuBar = document.querySelector(".menuBar")
  menuBar.classList.remove("menuBarActive")

  localStorage.setItem("favourite",favouritesIds)

  let homePageEl = document.querySelector(".homePage");
  //hidding home page when render food information card
  homePageEl.style.zIndex = "-99999";
  homePageEl.style.opacity = "0";
  window.scrollTo(0, 0);

  createFoodInformationEl(element);

  //copy to clipboard action
  const copyToClipboardBtn = document.querySelector(".copyToClipboard")
  copyToClipboardBtn.addEventListener("click",()=>{
    let clipboardStorage = [];
    element.extendedIngredients.forEach((name)=>{
      clipboardStorage.push(name.original)
    })
    let clipboardStorageText = clipboardStorage.toString()
    CopyMe(clipboardStorageText)
    warningBannerActive("Copied to clipboard","#339900","#f0f0f0")
    //animation for copy button
    copyToClipboardBtn.style.transform = "rotate(360deg) scale(1.2)"
    setTimeout(()=>{
    copyToClipboardBtn.style.transform = "rotate(360deg) scale(1)"
    },650)
  })


  if(element.cuisines.length === 0) {
    document.querySelector("#cuisines").textContent = "Not found"
  }
  if(element.dishTypes.length === 0) {
    document.querySelector("#dishTypes").textContent = "Not found"
  }
  //Checking that fetch data does not contain instructions
  let recipeDescription = document.querySelector(".description p");
  if (recipeDescription.innerText === "null") {
    recipeDescription.innerText = "Instruction not found :(";
  } else {
    //if data from fetch include instructions, replace all "." with "<br>" tag
    let recipeDescriptionString = recipeDescription.innerText;
    recipeDescriptionString = recipeDescriptionString.replace(/\./g,". <br/> <br/>");
    recipeDescription.innerHTML = recipeDescriptionString;
  }
  // inserting ingredients to food information card and image
  let recipeIngredients = document.querySelector(".description ul");
  element.extendedIngredients.forEach((line) => {
    recipeIngredients.insertAdjacentHTML('beforeend',`<li>${line.original}</li>`);
  });
  let descriptionFoodImage = document.querySelector(
    ".foodDescription .imageAndTags .foodImage"
  );
  descriptionFoodImage.style.backgroundImage = `url(${element.image})`;

 //add to favourite button
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
      addToFavouriteBtn.style.transform = "scale(1.2) rotate(1turn)"
      setTimeout(()=>{addToFavouriteBtn.style.transform = "scale(1) rotate(1turn)"},500)
    })

  //back button action
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
      //adding colored bands to similar recipes card
      let decoratesBands = document.querySelectorAll(".band")
      decoratesBands.forEach((band,index)=>{
        band.style.background = `#${bandColors[index]}`
      })
    });

};


export { logicForFoodInformationEl};
