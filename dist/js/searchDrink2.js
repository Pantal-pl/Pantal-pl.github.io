const wantedDrink = document.querySelector(".wanted-drink");
const searchButton = document.querySelector(".search-button");
const drinkForm = document.querySelector(".drink-form");
const drinkList = document.querySelector(".drink-list");
const drinkDescription = document.querySelector(".drink-description");
const randomButton = document.querySelector("#menu-option1");
let headerText = document.querySelector(".header-text");
let drinkNames = [];
let drinkImages = [];
let drinkCategory = [];
let backButtons = []

randomButton.addEventListener("click", () => {
  drinkForm.remove();
  drinkList.remove()
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
  <img class="drink-image" src="${data.drinks[0].strDrinkThumb}" alt="" />
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
  </div>`;
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
        document.querySelector(".drink-ingredients").innerHTML += `<p> ${j}." " ${
          data.drinks[0][`strIngredient${j}`]
        }</p>`;
      } else {
        document.querySelector(".drink-ingredients").innerHTML += `<p> ${j}. ${
          data.drinks[0][`strMeasure${j}`]
        } ${data.drinks[0][`strIngredient${j}`]}</p>`;
      }
    }
  }
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
      drinkList.style.display = "none"
      headerText.textContent = drinkNames[i];

      drinkDescription.insertAdjacentHTML(
        "beforeend",
        `<div class="drink-image-and-instruction">
        <img class="drink-image" src="${drinkImages[i]}" alt="" />
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
          document.querySelector(".drink-ingredients").innerHTML += `<p> ${j}.${
            data.drinks[i][`strIngredient${j}`]
          }</p>`;
        } else {
          document.querySelector(
            ".drink-ingredients"
          ).innerHTML += `<p> ${j}. ${data.drinks[i][`strMeasure${j}`]} ${
            data.drinks[i][`strIngredient${j}`]
          }</p>`;
        }
      }
      // backButtons = document.getElementsByClassName("back-button")
      // backButtons[i].addEventListener("click", ()=>{
      //   drinkDescription.insertAdjacentHTML('afterend','')
      //   drinkList.style.display = "block"
      // })
    });

  }
}

searchButton.addEventListener("click", () => {
  if (wantedDrink.value) {
    drinkForm.remove();
    getDrinkData();
    wantedDrink.value = "";
    showDrinkData();
  } else {
    console.log("err");
  }
});
