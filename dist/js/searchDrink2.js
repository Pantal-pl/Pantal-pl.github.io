const wantedDrink = document.querySelector(".wanted-drink");
const searchButton = document.querySelector(".search-button");
const drinkList = document.querySelector(".drink-list");
const drinkDescription = document.querySelector(".drink-description");
const randomButton = document.querySelector("#menu-option1");
const searchBottomButton = document.querySelector("#menu-option2");
const recentlyViewedDrinksButton = document.querySelector("#menu-option3");
let headerText = document.querySelector(".header-text");
const searchScreen = document.querySelector(".search-screen");
let drinkNames = [];
let drinkImages = [];
let drinkCategory = [];
let backButtons = [];
let buttonClicked = true;
let sessionStorageIndex = 0;
searchBottomButton.addEventListener("click", () => {
  drinkForm.style.display = "block";
  headerText.textContent = "Search for drink";
  if (buttonClicked === false) {
    drinkList.innerHTML = "";
    drinkDescription.innerHTML = "";
    drinkForm.style.display = "block";
    drinkList.style.display = "none";
    drinkDescription.style.display = "none";
    buttonClicked = true;
  } else if (buttonClicked === true) {
  }
  document.querySelector(".recentlyViewed").style.display = "none";
});
randomButton.addEventListener("click", () => {
  buttonClicked = false;
  drinkList.style.display = "none";
  drinkDescription.style.display = "inline-flex";
  drinkForm.style.display = "none";
  function getRandomDrinkData() {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        showRandomDrinkData(data);
      });
  }
  getRandomDrinkData();
  function showRandomDrinkData(data) {
    headerText.textContent = data.drinks[0].strDrink;
    drinkDescription.innerHTML = `<div class="drink-image-and-instruction">
    <div class="drink-name-and-img"><img class="drink-image" src="${data.drinks[0].strDrinkThumb}" alt="" /><p class="drink-name">Name: ${data.drinks[0].strDrink}</p></div>
    <div class="drink-instruction">
      <span>Instruction:</span>
      <br><br>
      <p>
        ${data.drinks[0].strInstructions}
      </p>
    </div>
    </div>
    <div class="drink-ingredients">
      <span>Ingredients:</span>
      <br><br>
    </div>
  <button class="back-button">Back</button>`;
    for (let j = 1; j < 15; j++) {
      if (
        data.drinks[0][`strIngredient${j}`] === null ||
        data.drinks[0][`strIngredient${j}`] == ""
      ) {
        break;
      } else if (
        data.drinks[0][`strMeasure${j}`] === null ||
        data.drinks[0][`strMeasure${j}`] == ""
      ) {
        document.querySelector(
          ".drink-ingredients"
        ).innerHTML += `<p> <b>${j}</b>.  ${
          data.drinks[0][`strIngredient${j}`]
        }</p>`;
      } else {
        document.querySelector(
          ".drink-ingredients"
        ).innerHTML += `<p> <b>${j}</b>. ${data.drinks[0][`strMeasure${j}`]} ${
          data.drinks[0][`strIngredient${j}`]
        }</p>`;
      }
    }
    sessionStorage.setItem(
      `drink${sessionStorageIndex}`,
      drinkDescription.outerHTML
    );
    sessionStorageIndex++;
    sessionStorage.setItem("sessionStorageIndex", sessionStorageIndex);
  }
  document.querySelector(".recentlyViewed").style.display = "none";
});

function getDrinkData() {
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${wantedDrink.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showDrinkData(data);
    });
}
function showDrinkData(data) {
  buttonClicked = false;
  headerText.textContent = `Found: ${data.drinks.length} drinks`;
  for (let i = 0; i < data.drinks.length; i++) {
    drinkNames[i] = data.drinks[i].strDrink;
    drinkImages[i] = data.drinks[i].strDrinkThumb;
    drinkCategory[i] = data.drinks[i].strCategory;
    drinkList.insertAdjacentHTML(
      "beforeend",
      `<ul>
    <img src="${drinkImages[i]}" alt="">
    <div class="name-and-ingredients">
      <p class="drink-name">${drinkNames[i]}</p>
      <br>
      <span class="difficulty"><p>${drinkCategory[i]}</span>
    </div>
    <button class="show-drink-button" id="button${i}">Show</button>
  </ul>`
    );

    showButtons = document.querySelectorAll(`.show-drink-button`);
    showButtons[i].addEventListener("click", () => {
      drinkList.style.display = "none";
      headerText.textContent = drinkNames[i];

      drinkDescription.insertAdjacentHTML(
        "beforeend",
        `<div class="drink-image-and-instruction">
        <div class="drink-name-and-img"><img class="drink-image" src="${drinkImages[i]}" alt="" /><p class="drink-name">Name:${drinkNames[i]}</p></div>
        <div class="drink-instruction">
          <span>Instruction:</span>
          <br><br>
          <p>
            ${data.drinks[i].strInstructions}
          </p>
        </div>
        </div>
        <div class="drink-ingredients">
          <span>Ingredients:</span>
          <br><br>
        </div>
      <button class="back-button">Back</button>`
      );

      drinkDescription.style.display = "block";

      for (let j = 1; j < 15; j++) {
        if (
          data.drinks[i][`strIngredient${j}`] === null ||
          data.drinks[i][`strIngredient${j}`] == ""
        ) {
          break;
        } else if (
          data.drinks[i][`strMeasure${j}`] === null ||
          data.drinks[i][`strMeasure${j}`] == ""
        ) {
          document.querySelector(
            ".drink-ingredients"
          ).innerHTML += `<p> <b>${j}</b>.${
            data.drinks[i][`strIngredient${j}`]
          }</p>`;
        } else {
          document.querySelector(
            ".drink-ingredients"
          ).innerHTML += `<p> <b>${j}</b>. ${
            data.drinks[i][`strMeasure${j}`]
          } ${data.drinks[i][`strIngredient${j}`]}</p>`;
        }
      }

      sessionStorage.setItem(
        `drink${sessionStorageIndex}`,
        drinkDescription.outerHTML
      );
      sessionStorageIndex++;
      sessionStorage.setItem("sessionStorageIndex", sessionStorageIndex);
    });
  }
}


searchButton.addEventListener("click", () => {
  drinkList.style.display = "block";
  if (wantedDrink.value) {
    getDrinkData();
    drinkForm.style.display = "none";
    wantedDrink.value = "";
    showDrinkData();
    buttonClicked = false;
  } else {
    console.log("err");
  }
  document.querySelector(".recentlyViewed").style.display = "none";
});
