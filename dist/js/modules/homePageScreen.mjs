import { logicForFoodInformationEl } from "./foodInformationScreen.mjs";
import { API_KEY } from "../main.js";

const homePageEl = document.createElement("section");
homePageEl.setAttribute("class", "homePage");
homePageEl.insertAdjacentHTML(
  "beforeend",
  `
<div class="homePageElement tryThisElement">
  <h1 class="headingElement">Try this !</h1>
  <div class="foodItems">
    <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</div>
<div class="homePageElement favouriteElement">
  <h1 class="headingElement">Favourite<button id="refreshFavourites"><img src="dist/images/refresh-svgrepo-com.svg"/></button><button id="deleteAllFavourites"><img src="dist/images/recycle-bin-svgrepo-com.svg"</button></h1>
  <div class="foodItems">
  </div>
</div>
</div>
`
);

const logicForHomePage = () => {
  let recipesInformation = [];
  let recipesId = [];
  let i = 0;
  // getting user preferences
  let intolerances = localStorage.getItem("intolerances");
  let cusine = localStorage.getItem("cusine");
  let diet = localStorage.getItem("diet");

  let tryThisElement = document.querySelector(".tryThisElement .foodItems");

  document.body.insertAdjacentHTML("beforeend",`<div class="warningBanner"></div>`)
  // checking if user dont insert any value in range input, and setting it to 4 
 if(localStorage.getItem("recipesRange") === "undefined"){
   localStorage.setItem("recipesRange",4)
 }
  getFoodData();
  //querying data form API
  function getFoodData() {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&cuisine=${cusine}&diet=${diet}&intolerances=${intolerances}&number=${localStorage.getItem("recipesRange")}`
    )
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((element) => {
          //pushing id of every meal that matches to user preferences
          recipesId.push(element.id);
        });
        console.log(recipesId);
        //card display if nothing matches to user preferences
        if (recipesId.length === 0) {
          tryThisElement.innerHTML = `
          <div class="foodItem" style="height:15rem;display:grid;place-items:center;padding:0 1rem;text-align:center;opacity:1;">
          <h1>Nothing matches your preferences :(</h1>
            <h2>Try to do interview again by reseting it in menu</h2>
          </div>`;
        } else {
          // adding spinner while cards is loading
          setTimeout(()=>{
            let el = document.querySelector(".lds-spinner")
          el.remove()
          },600)
          //searching clicked food by ID
          searchByFoodId(recipesId);
        }
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
          //render food card 
          insertFoodData(recipesInformation);
          console.log(recipesInformation)
        });
    });
  }

  function insertFoodData(recipesInformation) {
    tryThisElement.insertAdjacentHTML(
      "beforeend",
      `
          <div class="foodItem" id=foodItem${i}>
        <div class="foodImageAndTags">
        <div class="foodImage"></div>
        <div class="tags">
          <h3>About:</h3>
          <p>${recipesInformation[i].readyInMinutes} min.</p>
          <p>Servings: ${recipesInformation[i].servings}</p>
          <p>${recipesInformation[i].cuisines[0]}</p>
        </div>
        </div>
        <h2>${recipesInformation[i].title}</h2>
      </div>`
    );

    let foodImages = document.querySelectorAll(".tryThisElement .foodItems .foodItem .foodImage");
    foodImages[i].style.backgroundImage = `url(${recipesInformation[i].image})`;

    let foodItems = document.querySelectorAll(".tryThisElement .foodItems .foodItem");
    foodItems[i].addEventListener("click",logicForFoodInformationEl.bind(this, recipesInformation[i]));
    i++;

      // adding fancy drop animation
      function observeHomePage(){
        let foodItemsObserver = document.querySelectorAll(
          ".tryThisElement .foodItems .foodItem"
        );
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry =>{
            entry.target.classList.toggle("show",entry.isIntersecting)
            if(entry.isIntersecting) observer.unobserve(entry.target)
          })
        },{
          threshold: 0.1,
        });
        foodItemsObserver.forEach(item =>{
          observer.observe(item)
        })
      }
      observeHomePage()
  }
};

export { homePageEl, logicForHomePage };
