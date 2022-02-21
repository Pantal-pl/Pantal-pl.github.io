import { resetInterviewScreen } from "./resetInterviewScreen.mjs";
import { randomRecipeButtonLogic } from "./randomRecipe.mjs";
import { homeBtn } from "./homeBtn.mjs";
import { searchBtn } from "./searchBtn.mjs";
import { warningBannerActive } from "./warningBanner.mjs";


const searchBarEl = document.createElement("div");

searchBarEl.setAttribute("class", "menuBar");
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

  searchBtn();

  homeBtn();

  resetInterviewScreen();

  randomRecipeButtonLogic();
};
export { searchBarEl, logicForSearchBar,warningBannerActive};
