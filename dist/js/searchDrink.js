const wantedDrink = document.querySelector(".wanted-drink");
const searchButton = document.querySelector(".search-button");
const drinkForm = document.querySelector(".drink-form")
const drinkList = document.querySelector(".drink-list")
let drinkNames = [];
let drinkImages = [];
let drinkIngredients = [
    {
        "ingredient": ""
    }
]
let drinkIngredients1 = [];
let drinkIngredients2 = [];
let drinkIngredients3 = [];
let drinkIngredients4 = [];
let drinkIngredients5 = [];
let drinkIngredients6 = [];
let drinkIngredients7 = [];
let drinkIngredients8 = [];
let drinkIngredients9 = [];
let drinkIngredients10 = [];
let drinkIngredients11 = [];
let drinkIngredients12 = [];
let drinkIngredients13 = [];
let drinkIngredients14 = [];
let drinkIngredients15 = [];
let drinkIngredients16 = [];
function getRandomDrinkData() {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
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
    
  for (let i = 0; i < data.drinks.length; i++) {
    drinkNames[i] = data.drinks[i].strDrink;
    drinkImages[i] = data.drinks[i].strDrinkThumb;
    
    for(let j = 0;j<15;j++){
       if(data.drinks[i][`strIngredient${j+1}`] === null) {
           break
       }else {
            console.log(drinkNames[i] + " " + data.drinks[i][`strIngredient${j+1}`])
       }
    }
    drinkList.innerHTML += `<ul>
      <img src="${drinkImages[i]}" alt="">
      <div class="name-and-ingredients">
        <p class="drink-name">${drinkNames[i]}</p>
        <br>
        <span class="difficulty"><p>Difficulty:</p><img src="/dist/images/star.svg" alt=""><img src="/dist/images/star.svg" alt=""><img src="/dist/images/star.svg" alt=""></span>
      </div>
      <button class="show-drink-button" id="button${i}">Show</button>
    </ul>`
  }

}
searchButton.addEventListener("click", () => {
  if (wantedDrink.value) {
    drinkForm.remove()
    getDrinkData();
    wantedDrink.value = "";
    showDrinkData();
  } else {
    console.log("err");
  }
});

