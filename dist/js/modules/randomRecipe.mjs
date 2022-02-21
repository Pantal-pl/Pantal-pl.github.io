import { API_KEY } from "../main.js";
import { logicForFoodInformationEl } from "./foodInformationScreen.mjs";
import { warningBannerActive } from "./warningBanner.mjs";

function randomRecipeButtonLogic() {
  const randomRecipeButton = document.querySelector(".randomRecipeButton");
  randomRecipeButton.addEventListener("click", function () {
    if (document.body.contains(document.querySelector(".foodInformation"))) {
      let el = document.querySelector(".foodInformation");
      el.remove();
    }
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`
    )
      .then((response) => response.json())
      .then((randomRecipeResult) => {
        logicForFoodInformationEl(randomRecipeResult.recipes[0]);
        console.log(randomRecipeResult);
        warningBannerActive(
          `${randomRecipeResult.recipes[0].title}`,"#339900","#f0f0f0","1rem");
      });
    document.querySelector(".menuBar").classList.remove("menuBarActive");
  });
}

export { randomRecipeButtonLogic };
