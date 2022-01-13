import { foodInformationEL } from "./foodInformationScreen.mjs";
const homePageEl = document.createElement("section");
homePageEl.setAttribute("class", "homePage");
homePageEl.insertAdjacentHTML(
  "beforeend",
  `
<div class="homePageElement tryThisElement">
  <h1 class="headingElement">Try this !</h1>
  <div class="foodItems">

  </div>
</div>
<div class="homePageElement favouriteElement">
  <h1 class="headingElement">Favourite</h1>
  <div class="foodItems">
  
  </div>
</div>
<div class="homePageElement viewedElement">
  <h1 class="headingElement">Viewed</h1>
  <div class="foodItems">
    
  </div>
</div>
`
);

const logicForHomePage = () => {
  let recipesInformation = [];
  let recipesId = [];
  let i = 0;
  let j = 0;
  let intolerances = localStorage.getItem("intolerances");
  let cusine = localStorage.getItem("cusine");
  let diet = localStorage.getItem("diet");
  let tryThisElement = document.querySelector(".tryThisElement .foodItems");
  let favouriteElement = document.querySelector(".favouriteElement .foodItems");
  let viewedElement = document.querySelector(".viewedElement .foodItems");
  const API_KEY = "4a15b02aaf8447afa196362d0199e7cc";
  const mapsItems = (recipesInformation) => {
    document.getElementById(`foodItem${j}`).addEventListener("click", () => {
      console.log(j+1);
      
    });
    j++;
  };
  getFoodData();
  function getFoodData() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cusine}&diet=${diet}&intolerances=${intolerances}&number=15`
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((element) => {
          recipesId.push(element.id);
        });
        searchByFoodId(recipesId);
      });
  }
  function searchByFoodId() {
    recipesId.forEach((element) => {
      fetch(
        `https://api.spoonacular.com/recipes/${element}/information?apiKey=${API_KEY}&includeNutrition=false`
      )
        .then((response) => response.json())
        .then((ids) => {
          recipesInformation.push(ids);
          insertFoodData(recipesInformation);
        });
    });

    // console.log(recipesInformation);
  }

  function insertFoodData(recipesInformation) {
    console.log(recipesInformation);
    tryThisElement.insertAdjacentHTML(
      "beforeend",
      `
        <div class="foodItem" id=foodItem${i}>
      <div class="foodImage"></div>
      <div class="tags">
        <h3>About:</h3>
        <p>${recipesInformation[i].readyInMinutes} min.</p>
        <p>Servings: ${recipesInformation[i].servings}</p>
        <p>${recipesInformation[i].cuisines[0]}</p>
      </div>
      <h2>${recipesInformation[i].title}</h2>
    </div>`
    );

    let foodImages = document.querySelectorAll(
      ".tryThisElement .foodItems .foodItem .foodImage"
    );
    foodImages.forEach((element, index) => {
      element.style.backgroundImage = `url(${recipesInformation[index].image})`;
    });
    mapsItems(recipesInformation);
    i++;

  }
};
export { homePageEl, logicForHomePage };
