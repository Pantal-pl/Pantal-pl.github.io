import { logicForFoodInformationEl } from "./foodInformationScreen.mjs";
const searchBarEl = document.createElement("div");
searchBarEl.setAttribute("class", "menuBar");
const body = document.querySelector("body")
searchBarEl.insertAdjacentHTML(
  "beforeend",
  `
<div class="row1">
  <label id="instructionRequired">
    <p>Instruction required?</p>
    <div id="instructionRequiredOption">
      <div class="option optionYes">
      <div></div>
        <p>Yes</p>
      </div>
      <div class="option optionNo">
      <div><div></div></div>
        <p>No</p>
      </div>
    </div>
  </label>
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
      <option value="Ingredients">Ingredients</option>
      <option value="cuisine">cuisine</option>
    </select>
  </label>
  <button class="searchButton">Search</button>
</div>
<div class="moveBar"></div>
`
);
const logicForSearchBar = () => {
  const menuBar = document.querySelector(".menuBar");
  const moveBar = document.querySelector(".moveBar");
  const swipeDownMenuBar = () => {
    moveBar.addEventListener("touchstart", () => {
      menuBar.style.top = "0";
      swipeUpMenuBar();
    });
  };
  const swipeUpMenuBar = () => {
    moveBar.addEventListener("touchstart", () => {
      menuBar.style.top = "-18vh";
      swipeDownMenuBar();
    });
  };
  swipeDownMenuBar()
  const instructionRequiredYes = document.querySelector(".optionYes div")
  const instructionRequiredNo = document.querySelector(".optionNo div")
  const instructionRequiredNo2 = document.querySelector(".optionNo div div")
  instructionRequiredYes.addEventListener("click",()=>{
    instructionRequiredYes.classList.add("optionYesActive")
    instructionRequiredNo.classList.remove("optionNoActive")
    instructionRequiredNo2.classList.remove("optionNoActive2")
  })
  instructionRequiredNo.addEventListener("click",()=>{
    instructionRequiredNo.classList.add("optionNoActive")
    instructionRequiredNo2.classList.add("optionNoActive2")
    instructionRequiredYes.classList.remove("optionYesActive")
  })

  let nameInput = document.querySelector(".name")
  let searchByInput = document.querySelector(".searchBy")
  const searchBtn = document.querySelector(".searchButton")
  const interviewBtn = document.querySelector(".interviewScreenButton")
  const homeBtn = document.querySelector(".homeScreenButton")
  searchBtn.addEventListener("click",()=>{
    if(body.contains(document.querySelector(".searchResults"))===true){
      body.removeChild(body.lastElementChild)
    }
    const searchResultsEl = document.createElement("section");
    searchResultsEl.setAttribute("class", "searchResults");
    document.querySelector(".homePage").style.display = "none"
    body.appendChild(searchResultsEl)

      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=1bd21e7db7a94a10b01a3ec4e055080d&${searchByInput.value}=${nameInput.value}&number=15`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          data.results.forEach((element,index) =>{
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
                `https://api.spoonacular.com/recipes/${data.results[index].id}/information?apiKey=1bd21e7db7a94a10b01a3ec4e055080d&includeNutrition=false`
              ).then((response) => response.json())
              .then((searchResultItemDescription) =>{
                logicForFoodInformationEl(searchResultItemDescription)
              })
            setTimeout(()=>{
              document.querySelector(".similarRecipesSection").remove()
            },300)

            document.querySelector(".searchResults").style.display = "none";

            })
          })
        });

  })
  homeBtn.addEventListener("click",()=>{
    if(body.contains(document.querySelector(".searchResults"))){
      document.querySelector(".searchResults").remove()
      document.querySelector(".homePage").style.display = "flex"
      document.querySelector(".homePage").style.opacity = "1"
      document.querySelector(".homePage").style.zIndex = "1"
      window.scrollTo(0,0)
      if(body.contains(document.querySelector(".foodInformation"))){
        document.querySelector(".foodInformation").remove()
      }
    }
  })
};
export { searchBarEl, logicForSearchBar };
