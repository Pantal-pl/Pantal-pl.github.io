import { API_KEY } from "../main.js";
import { warningBannerActive } from "./warningBanner.mjs";
import { logicForFoodInformationEl } from "./foodInformationScreen.mjs";

//refresh favourite section
function refresh(favouritesIds){
  if(localStorage.getItem("favourite").length !== 0) {
    favouritesIds = localStorage.getItem("favourite").split(",")
    let favouritesRecipes = []
        warningBannerActive("Success","#339900","#f0f0f0")
        document.querySelector(".favouriteElement .foodItems").innerHTML = "<div></div>"
        favouritesIds.forEach((id,index)=>{
          fetch(
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=false`
          )
          .then((response) => response.json())
          .then((favourite)=>{
            favouritesRecipes.push(favourite)
            document.querySelector(".favouriteElement .foodItems").insertAdjacentHTML('beforeend',`
            <div class="foodItem" id="favouriteItem${index}">
          <div class="foodImageAndTags">
          <div class="foodImage"></div>
          <div class="tags">
            <h3>About:</h3>
            <p>${favourite.readyInMinutes} min.</p>
            <p>Servings: ${favourite.servings}</p>
            <p id="favourite-cuisines">${favourite.cuisines[0]}</p>
          </div>
          </div>
          <h2>${favourite.title}</h2>
        </div>`)
        let foodImages = document.querySelectorAll(
          ".favouriteElement .foodItems .foodItem .foodImage"
        );
        foodImages[index].style.backgroundImage = `url(${favourite.image})`;
        if(favourite.cuisines.length === 0 ) {
          document.querySelector("#favourite-cuisines").textContent = "Not found"
        }
          })
        });
        setTimeout(()=>{
          document.querySelectorAll(".favouriteElement .foodItems .foodItem").forEach((item,index)=>{
            item.addEventListener("click",()=>{
              logicForFoodInformationEl(favouritesRecipes[index])
              console.log(favouritesRecipes)
            })
          })
        },1000)
    } else {
      warningBannerActive("Nothing to show")
    }
  }

export {refresh}