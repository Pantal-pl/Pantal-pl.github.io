const {
  searchBottomButton,
  drinkList,
  drinkDescription,
  randomButton,
  wantedDrink,
  searchButton,
} = variables();
variables();
let backButtons = []
let headerText = document.querySelector(".header-text");
let bottomSearchButtonIsClicked = true;
let i = 0;
let sessionStorageIndex = 0;
searchBottomButton.addEventListener("click", () => {
  drinkForm.style.display = "block";
  headerText.textContent = "Search for drink";
  if (bottomSearchButtonIsClicked === false) {
    drinkList.innerHTML = "";
    drinkDescription.innerHTML = "";
    drinkForm.style.display = "block";
    drinkDescription.style.display = drinkList.style.display = "none";
    bottomSearchButtonIsClicked = true;
  }
  document.querySelector(".recentlyViewed").style.display = "none";
});
randomButton.addEventListener("click", () => {
  bottomSearchButtonIsClicked = false;
  drinkForm.style.display = drinkList.style.display = "none";
  drinkDescription.style.display = "inline-flex";
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
    createDrinkDescription(data, 0); //data, dataIndex
    let allBackButtons = [...document.querySelectorAll(".back-button")]
    allBackButtons.forEach(element => {
      element.style.display = "none"
    });

  }
  document.querySelector(".recentlyViewed").style.display = "none";
});

searchButton.addEventListener("click", () => {
  drinkList.style.display = "block";
  if (wantedDrink.value) {
    getDrinkData();
    drinkForm.style.display = "none";
    wantedDrink.value = "";
    showDrinkData();
    bottomSearchButtonIsClicked = false;
  } else {
    headerText.textContent = "Enter drink name!";
    headerText.style.fontWeight = "bold";
    setTimeout(() => {
      headerText.textContent = "Search for drink";
      headerText.style.fontWeight = "normal";
    }, 2000);
  }
  document.querySelector(".recentlyViewed").style.display = "none";
});

function variables() {
  const wantedDrink = document.querySelector(".wanted-drink");
  const searchButton = document.querySelector(".search-button");
  const drinkList = document.querySelector(".drink-list");
  const drinkDescription = document.querySelector(".drink-description");
  const randomButton = document.querySelector("#menu-option1");
  const searchBottomButton = document.querySelector("#menu-option2");
  const searchScreen = document.querySelector(".search-screen");
  return {
    searchBottomButton,
    drinkList,
    drinkDescription,
    randomButton,
    wantedDrink,
    searchButton,
    searchScreen
  };
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
  bottomSearchButtonIsClicked = false;
  headerText.textContent = `Found: ${data.drinks.length} drinks`;
  for (let i = 0; i < data.drinks.length; i++) {
    drinkList.insertAdjacentHTML(
      "beforeend",
      `<ul>
      <img src="${data.drinks[i].strDrinkThumb}" alt="" />
      <div class="name-and-ingredients">
        <p class="drink-name">${data.drinks[i].strDrink}</p>
        <br />
        <span class="difficulty"><p>${data.drinks[i].strCategory}</p></span>
      </div>
      <button class="show-drink-button" id="button${i}">Show</button>
    </ul>`
    );

    showButtons = document.querySelectorAll(`.show-drink-button`);
    showButtons[i].addEventListener("click", () => {
      drinkList.style.display = "none";
      drinkDescription.style.display = "inline-flex";
      createDrinkDescription(data, i);
    });
  }
}
function createDrinkDescription(data, i) {
  headerText.textContent = data.drinks[i].strDrink;
  drinkDescription.innerHTML = `<div class="drink-image-and-instruction">
      <div class="drink-name-and-img">
        <img class="drink-image" src="${data.drinks[i].strDrinkThumb}" alt="" />
        <p class="drink-name">${data.drinks[i].strDrink}</p>
        <p>Type: ${data.drinks[i].strCategory}</p>
        <p class="difficulty" id="difficulty${i}"></p>
      </div>
      <div class="drink-instruction">
        <span>Instruction:</span>
        <br /><br />
        <p>${data.drinks[i].strInstructions}</p>
      </div>
    </div>
    <div class="drink-ingredients" id="drink-ingredients${i}">
      <span>Ingredients:</span>
      <br /><br />
    </div>`;
      const backButton = document.createElement('button')
      backButton.setAttribute('class','back-button')
      backButton.setAttribute("id",`back-button${i}`)
      backButton.textContent = "Back"
      drinkDescription.insertAdjacentHTML('beforeend',backButton.outerHTML)
      backButtons[i] = document.getElementById(`back-button${i}`)
      backButtons.forEach(element => {
        element.addEventListener("click",()=>{
          drinkDescription.style.display = "none"
          drinkList.style.display = "list-item"
          drinkList.innerHTML = ""
          showDrinkData(data)
        })
      });
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
      ).innerHTML += `<p> <b>${j}</b>.  ${
        data.drinks[i][`strIngredient${j}`]
      }</p>`;
    } else {
      document.querySelector(
        ".drink-ingredients"
      ).innerHTML += `<p> <b>${j}</b>. ${data.drinks[i][`strMeasure${j}`]} ${
        data.drinks[i][`strIngredient${j}`]
      }</p>`;
    }
    // difficulty counter depends on ingredients quantity
    if (
      document.getElementById(`drink-ingredients${i}`).getElementsByTagName("p")
        .length <= 4
    ) {
      document.getElementById(`difficulty${i}`).innerHTML =
        'Difficulty: <img src="./dist/images/star.svg"/><img src="./dist/images/empty-star.svg"/><img src="./dist/images/empty-star.svg"/>';
    } else if (
      document.getElementById(`drink-ingredients${i}`).getElementsByTagName("p")
        .length <= 7
    ) {
      document.getElementById(`difficulty${i}`).innerHTML =
        'Difficulty:  <img src="./dist/images/star.svg"/> <img src="./dist/images/star.svg"/><img src="./dist/images/empty-star.svg"/>';
    } else {
      document.getElementById(`difficulty${i}`).innerHTML =
        'Difficulty:  <img src="./dist/images/star.svg"/> <img src="./dist/images/star.svg"/> <img src="./dist/images/star.svg"/>';
    }
  }

  // saving each drink description in session storage
  sessionStorage.setItem(
    `drink${sessionStorageIndex}`,
    drinkDescription.outerHTML
  );
  sessionStorageIndex++;
  sessionStorage.setItem("sessionStorageIndex", sessionStorageIndex);
  i++;
}
