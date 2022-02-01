import { logicForFoodInformationEl } from "./foodInformationScreen.mjs";
import { createResetInterviewScreen } from "./resetInterviewScreen.mjs";
import { API_KEY } from "../main.js";

const searchBarEl = document.createElement("div");

searchBarEl.setAttribute("class", "menuBar");
const body = document.querySelector("body")
searchBarEl.insertAdjacentHTML(
  "beforeend",
  `
<div class="row1">
  <button class="randomRecipeButton">Random</button>
  <button class="homeScreenButton">Home</button>
  <button class="interviewScreenButton">Interview</button>
</div>
<div class="row2">
  <label for="name" id="name">
    <p>Name:</p>
    <input type="text" autocomplete="off" name="name" placeholder="Write here" class="name"/>
  </label>
  <label for="searchBy" id="searchBy">
    <p>Search by:</p>
    <select name="searchBy" class="searchBy">
      <option value=""></option>
      <option value="query">Dish name</option>
      <option value="ingredients">Ingredients</option>
      <option value="cuisine">cuisine</option>
    </select>
  </label>
  <button class="searchButton">Search</button>
</div>
<div class="moveBar"><img id="moveBarImage" src="./dist/images/arrow-down-svgrepo-com.svg"></div>
`
);

function warningBannerActive(text,bgColor,fontColor,fontSize){
  let warningBanner =  document.querySelector(".warningBanner")
  warningBanner.style = "top: 0; background: #f8e46c; text-align: center; position: fixed; z-index: 5; width: 100%; height: 11vh; display: grid; place-items: center; font-size: 1.4rem;color:#fafafa; transition: .25s ease-in-out; opacity:1 !important; color:#3f3d56;"
  warningBanner.textContent = text
  warningBanner.style.background = bgColor
  warningBanner.style.color = fontColor
  warningBanner.style.fontSize = fontSize
  setTimeout(() => {
    warningBanner.style.top = "-11.1vh"
    warningBanner.textContent = ""
  }, 1450);
}

const logicForSearchBar = () => {
  const menuBar = document.querySelector(".menuBar");
  const moveBar = document.querySelector(".moveBar");
  moveBar.addEventListener("touchstart", ()=>{
    menuBar.classList.toggle("menuBarActive")
    document.querySelector("#moveBarImage").classList.toggle("menuBarImageActive")
  })
  moveBar.addEventListener("click", ()=>{
    menuBar.classList.toggle("menuBarActive")
    document.querySelector("#moveBarImage").classList.toggle("menuBarImageActive")
  })


  let nameInput = document.querySelector(".name")
  let searchByInput = document.querySelector(".searchBy")

  const searchBtn = document.querySelector(".searchButton")
  searchBtn.addEventListener("click",()=>{
    if(searchByInput.value === "" || nameInput.value === ""){
      warningBannerActive("Enter name and search by")
    }else{
      if(body.contains(document.querySelector(".searchResults"))){
        let el = document.querySelector(".searchResults")
        el.remove()
      }
      if(body.contains(document.querySelector(".foodInformation"))){
        let el = document.querySelector(".foodInformation")
        el.remove()
      }
      document.querySelector(".menuBar").classList.remove("menuBarActive")
      const searchResultsEl = document.createElement("section");
      searchResultsEl.setAttribute("class", "searchResults");
      document.querySelector(".homePage").style.display = "none"
      body.appendChild(searchResultsEl)
        if(searchByInput.value === "ingredients"){
          let searchType = "findByIngredients"
          fetch(
            `https://api.spoonacular.com/recipes/${searchType}?apiKey=${API_KEY}&${searchByInput.value}=${nameInput.value}&number=5`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              data.forEach((element) =>{
                searchResultsEl.insertAdjacentHTML(
                  "beforeend",
                  `<div class="searchResult">
                    <div class="foodImage searchResultFoodImage"></div>
                    <p>${element.title}</p>
                  </div>`
                );
              })
              let searchResultFoodImages = document.querySelectorAll(".searchResultFoodImage")
              searchResultFoodImages.forEach((image,index)=>{
                image.style.backgroundImage = `url(${data[index].image})`
              })
              let searchResultItem = document.querySelectorAll(".searchResult")
              searchResultItem.forEach((item,index)=>{
                item.addEventListener("click",()=>{
                  fetch(
                    `https://api.spoonacular.com/recipes/${data[index].id}/information?apiKey=${API_KEY}&includeNutrition=false`
                  ).then((response) => response.json())
                  .then((searchResultItemDescription) =>{
                    logicForFoodInformationEl(searchResultItemDescription)
                  })
                document.querySelector(".searchResults").style.display = "none";
    
                })
              })
            });
        }else{
          let searchType = "complexSearch"
          fetch(
            `https://api.spoonacular.com/recipes/${searchType}?apiKey=${API_KEY}&${searchByInput.value}=${nameInput.value}&number=5`
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data)
              data.results.forEach((element) =>{
                searchResultsEl.insertAdjacentHTML(
                  "beforeend",
                  `<div class="searchResult">
                    <div class="foodImage searchResultFoodImage"></div>
                    <p>${element.title}</p>
                  </div>`
                );
    
              })
              let searchResultFoodImages = document.querySelectorAll(".searchResultFoodImage")
              searchResultFoodImages.forEach((image,index)=>{
                image.style.backgroundImage = `url(${data.results[index].image})`
              })
              let searchResultItem = document.querySelectorAll(".searchResult")
              searchResultItem.forEach((item,index)=>{
                item.addEventListener("click",()=>{
                  fetch(
                    `https://api.spoonacular.com/recipes/${data.results[index].id}/information?apiKey=${API_KEY}&includeNutrition=false`
                  ).then((response) => response.json())
                  .then((searchResultItemDescription) =>{
                    logicForFoodInformationEl(searchResultItemDescription)
                  })
                document.querySelector(".searchResults").style.display = "none";
                })
              })
            });
        }
        searchByInput.value = "";
        nameInput.value = "";
    }
  })
  
  const homeBtn = document.querySelector(".homeScreenButton")
  homeBtn.addEventListener("click",()=>{
    if(body.contains(document.querySelector(".searchResults"))){
      let el = document.querySelector(".searchResults")
      el.remove();
      let homePage = document.querySelector(".homePage")
      homePage.style.display = "flex"
      homePage.style.opacity = "1"
      homePage.style.zIndex = "1"
      window.scrollTo(0,0)
      if(body.contains(document.querySelector(".foodInformation"))){
        let el = document.querySelector(".foodInformation")
        el.remove()
      }
    }
    document.querySelector(".menuBar").classList.remove("menuBarActive")

  })

  const resetInterviewButton = document.querySelector(".interviewScreenButton")
  resetInterviewButton.addEventListener("click",function(){
    window.scroll(0,0)
    document.querySelector(".homePage").style.display = "none"
    document.querySelector(".menuBar").style.display = "none"
    if(body.contains(document.querySelector(".searchResults"))){
      let el = document.querySelector(".searchResults")
      el.remove()
    }
    if(body.contains(document.querySelector(".foodInformation"))){
      let el = document.querySelector(".foodInformation")
      el.remove()
    }
 
    createResetInterviewScreen()

    document.querySelector(".yes").addEventListener("click",function(){
      localStorage.setItem("cusine","")
      localStorage.setItem("intolerances","")
      localStorage.setItem("diet","")
      localStorage.setItem("interviewDone","")
      window.location.reload()
    })
    document.querySelector(".no").addEventListener("click",function(){
      let homePage = document.querySelector(".homePage")
      document.querySelector(".resetInterviewScreen").remove()
      homePage.style.display = "flex"
      homePage.style.zIndex = "1"
      homePage.style.opacity = "1"
    document.querySelector(".menuBar").style.display = "flex"
    })
    document.querySelector(".menuBar").classList.remove("menuBarActive")

  })
  const randomRecipeButton = document.querySelector(".randomRecipeButton")
  randomRecipeButton.addEventListener("click",function(){
    if(body.contains(document.querySelector(".foodInformation"))){
      let el = document.querySelector(".foodInformation")
      el.remove()
    }
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`
    ).then((response) => response.json())
    .then((randomRecipeResult) =>{
      logicForFoodInformationEl(randomRecipeResult.recipes[0])
      console.log(randomRecipeResult)
      warningBannerActive(`${randomRecipeResult.recipes[0].title}`,"#339900","#f0f0f0","1rem")
    })
    document.querySelector(".menuBar").classList.remove("menuBarActive")

  })
 
};
export { searchBarEl, logicForSearchBar,warningBannerActive};
