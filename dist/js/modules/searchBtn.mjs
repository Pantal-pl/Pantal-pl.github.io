import { API_KEY } from "../main.js";
import { logicForFoodInformationEl } from "./foodInformationScreen.mjs";
import { warningBannerActive } from "./warningBanner.mjs";


function searchBtn(){
    let body = document.querySelector("body")
    let nameInput = document.querySelector(".name")
    let searchByInput = document.querySelector(".searchBy")
  
    const searchBtn = document.querySelector(".searchButton")
    var offSetDishName = 0;
    var offSetIngredients = 0;
    searchBtn.addEventListener("click",()=>{
      if(searchByInput.value === "" || nameInput.value === ""){
        warningBannerActive("Enter name and search by")
      }else{
        if(body.contains(document.querySelector(".searchResults"))){
          let el = document.querySelector(".searchResults")
          el.remove()
        }
        if(body.contains(document.querySelector(".foodInformation"))){
          let el = document.querySelector(".foodInformation")
          el.remove()
        }
        document.querySelector(".menuBar").classList.remove("menuBarActive")
  
        const searchResultsEl = document.createElement("section");
        searchResultsEl.setAttribute("class", "searchResults");
        document.querySelector(".homePage").style.display = "none"
        body.appendChild(searchResultsEl)
        
          if(searchByInput.value === "ingredients"){
            let searchType = "findByIngredients"
            fetch(
              `https://api.spoonacular.com/recipes/${searchType}?apiKey=${API_KEY}&${searchByInput.value}=${nameInput.value}&number=${localStorage.getItem("recipesRange")}&offset=${offSetIngredients}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                data.forEach((element) =>{
                  offSetIngredients++;
                  console.log(offSetIngredients)
                  
                  searchResultsEl.insertAdjacentHTML(
                    "beforeend",
                    `<div class="searchResult">
                      <div class="foodImage searchResultFoodImage"></div>
                      <p>${element.title}</p>
                    </div>`
                  );
                })

                if(offSetIngredients >= 16) offSetIngredients = 0;
                
                let searchResultFoodImages = document.querySelectorAll(".searchResultFoodImage")
                searchResultFoodImages.forEach((image,index)=>{
                  image.style.backgroundImage = `url(${data[index].image})`
                })
                let searchResultItem = document.querySelectorAll(".searchResult")
                searchResultItem.forEach((item,index)=>{
                  item.addEventListener("click",()=>{
                    fetch(
                      `https://api.spoonacular.com/recipes/${data[index].id}/information?apiKey=${API_KEY}&includeNutrition=false`
                    ).then((response) => response.json())
                    .then((searchResultItemDescription) =>{
                      logicForFoodInformationEl(searchResultItemDescription)
                    })
                  document.querySelector(".searchResults").style.display = "none";
      
                  })
                })
                data.length === 0 ? warningBannerActive("Nothing found, search again") : warningBannerActive(`${data.length} results`,"#339900","#f0f0f0")
              });
          }else{
            let searchType = "complexSearch"
            fetch(
              `https://api.spoonacular.com/recipes/${searchType}?apiKey=${API_KEY}&${searchByInput.value}=${nameInput.value}&number=${localStorage.getItem("recipesRange")}&offset=${offSetDishName}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                data.results.forEach((element) =>{
                  offSetDishName++;
                  console.log(offSetDishName)
                  searchResultsEl.insertAdjacentHTML(
                    "beforeend",
                    `<div class="searchResult">
                      <div class="foodImage searchResultFoodImage"></div>
                      <p>${element.title}</p>
                    </div>`
                  );
                })

                if(offSetDishName > 16) offSetDishName = 0;

                let searchResultFoodImages = document.querySelectorAll(".searchResultFoodImage")
                searchResultFoodImages.forEach((image,index)=>{
                  image.style.backgroundImage = `url(${data.results[index].image})`
                })
                let searchResultItem = document.querySelectorAll(".searchResult")
                searchResultItem.forEach((item,index)=>{
                  item.addEventListener("click",()=>{
                    fetch(
                      `https://api.spoonacular.com/recipes/${data.results[index].id}/information?apiKey=${API_KEY}&includeNutrition=false`
                    ).then((response) => response.json())
                    .then((searchResultItemDescription) =>{
                      logicForFoodInformationEl(searchResultItemDescription)
                    })
                  document.querySelector(".searchResults").style.display = "none";
                  })
                })
            
            data.results.length === 0 ? warningBannerActive("Nothing found, search again") : warningBannerActive(`${data.results.length} results`,"#339900","#f0f0f0")
              });
          }
          searchByInput.value = "";
          nameInput.value = "";
      }
    })
}
export {searchBtn}