const interviewScreenEl = document.createElement("section");
interviewScreenEl.setAttribute("class", "interviewScreen");
const body = document.querySelector("body");
import { searchBarEl, logicForSearchBar } from "./searchBar.mjs";
import {homePageEl, logicForHomePage} from "./homePageScreen.mjs"

interviewScreenEl.insertAdjacentHTML(
  "beforeend",
  `      <h1 class="heading">Interview</h1>
  <div class="warningBanner"></div>
<form onsubmit="return false">
  <div class="interviewElement intolerances">
    <label>Choose your intolerances:</label>
    <div class="interviewElementInputs">
      <input type="button" value="Dairy" />
      <input type="button" value="Egg" />
      <input type="button" value="Gluten" />
      <input type="button" value="Grain" />
      <input type="button" value="Peanut" />
      <input type="button" value="Seafood" />
      <input type="button" value="Sesame" />
      <input type="button" value="Shellfish" />
      <input type="button" value="Soy" />
      <input type="button" value="Sulfite" />
      <input type="button" value="Tree Nut" />
      <input type="button" value="Wheat" />
    </div>
  </div>
  <div class="interviewElement diet">
    <label>Choose your diet (only one):</label>
    <div class="interviewElementInputs">
      <input type="button" value="Gluten Free" />
      <input type="button" value="Ketogenic" />
      <input type="button" value="Vegetarian" />
      <input type="button" value="Paleo" />
      <input type="button" value="Lacto-Vegetarian" />
      <input type="button" value="Ovo-Vegetarian" />
      <input type="button" value="Vegan" />
      <input type="button" value="Pescetarian" />
      <input type="button" value="Paleo" />
      <input type="button" value="Primal" />
      <input type="button" value="Low FODMAP" />
      <input type="button" value="Whole30" />
    </div>
  </div>
  <div class="interviewElement cusine">
    <label>Choose your favourite cusine:</label>
    <div class="interviewElementInputs">
      <input type="button" value="African" />
      <input type="button" value="American" />
      <input type="button" value="Japanese" />
      <input type="button" value="Chinese" />
      <input type="button" value="European" />
      <input type="button" value="French" />
      <input type="button" value="Greek" />
      <input type="button" value="Italian" />
      <input type="button" value="Korean" />
      <input type="button" value="Mexican" />
      <input type="button" value="Nordic" />
      <input type="button" value="Spanish" />
      <input type="button" value="Thai" />
      <input type="button" value="Vietnamese" />
      <input type="button" value="Jewish" />
      <input type="button" value="Caribbean" />
    </div>
  </div>
</form>
<button class="saveBtn">Save</button>
`
);

export { interviewScreenEl };

const logicForInterviewScreen = () => {
  localStorage.setItem(`favourite`,[]); 
  let intolerances = [];
  let diet = [];
  let cusine = [];
  const intolerancesEl = document.querySelectorAll(
    ".intolerances .interviewElementInputs input"
  );
  const dietEl = document.querySelectorAll(
    ".diet .interviewElementInputs input"
  );
  const cusineEl = document.querySelectorAll(
    ".cusine .interviewElementInputs input"
  );
  const warningBanner = document.querySelector(".warningBanner");
  //Adding jelly effect to ecery input
  const EvForEveryOption = (ElementOption, typeOption) => {
    ElementOption.forEach((option) => {
      option.addEventListener("click", () => {
        option.classList.toggle("optionActive");
        if (option.classList.value === "optionActive") {
          if (typeOption === "intolerances") {
            intolerances.push(option.value);
            console.log(intolerances);
          } else if (typeOption === "diet") {
            if (diet.length > 0) {
              warningBanner.classList.add("warningBannerActive");
              warningBanner.textContent = "You can pick max one diet"
              setTimeout(() => {
                warningBanner.classList.remove("warningBannerActive");
              }, 1850);
              option.classList.remove("optionActive");
            } else {
              diet.push(option.value);
              console.log(diet);
            }
          } else {
            cusine.push(option.value);
            console.log(cusine);
          }
        } else {
          if (typeOption === "intolerances") {
            intolerances = intolerances.filter((item) => item !== option.value);
            console.log(intolerances);
          } else if (typeOption === "diet") {
            diet.pop();
            console.log(diet);
          } else {
            cusine = cusine.filter((item) => item !== option.value);
            console.log(cusine);
          }
        }
      });
    });
  };

  EvForEveryOption(intolerancesEl, "intolerances");
  EvForEveryOption(dietEl, "diet");
  EvForEveryOption(cusineEl, "cusine");
  // Save button action
  const saveBtn = document.querySelector(".saveBtn");
  saveBtn.addEventListener("click", () => {
    if (cusine.length == 0) {
      warningBanner.classList.add("warningBannerActive");
      warningBanner.textContent = "Choose at least one cusine"
      setTimeout(() => {
        warningBanner.classList.remove("warningBannerActive");
      }, 1850);
    } else {
      localStorage.setItem("intolerances", intolerances);
      localStorage.setItem("diet", diet);
      localStorage.setItem("cusine", cusine);
      localStorage.setItem("interviewDone","true")
      body.lastChild.remove();
      body.appendChild(searchBarEl);
      logicForSearchBar();
      body.appendChild(homePageEl)
      logicForHomePage()
    }
  });
};
 
export { logicForInterviewScreen, searchBarEl,logicForSearchBar,homePageEl,logicForHomePage}
