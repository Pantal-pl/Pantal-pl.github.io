const interviewScreenEl = document.createElement("section");
interviewScreenEl.setAttribute("class", "interviewScreen");
const body = document.querySelector("body");

interviewScreenEl.insertAdjacentHTML(
  "beforeend",
  `      <h1 class="heading">Interview</h1>
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
  const EvForEveryOption = (objectOption, typeOption) => {
    objectOption.forEach((option) => {
      option.addEventListener("click", () => {
        option.classList.toggle("optionActive");
        if (option.classList.value === "optionActive") {
          if (typeOption === "intolerances") {
            intolerances.push(option.value);
            console.log(intolerances);
          } else if (typeOption === "diet") {
            if (diet.length > 0) {
              console.log("you can choose only one diet");
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
            intolerances.pop();
            console.log(intolerances);
          } else if (typeOption === "diet") {
            diet.pop();
            console.log(diet);
          } else {
            cusine.pop();
            console.log(cusine);
          }
        }
      });
    });
  };
  EvForEveryOption(intolerancesEl, "intolerances");
  EvForEveryOption(dietEl, "diet");
  EvForEveryOption(cusineEl, "cusine");
  const saveBtn = document.querySelector(".saveBtn");
  saveBtn.addEventListener("click", () => {
    if (intolerances.length == 0 || diet.length == 0 || cusine.length == 0) {
      console.log("error");
    } else {
      localStorage.setItem("intolerances", intolerances);
      localStorage.setItem("diet", diet);
      localStorage.setItem("cusine", cusine);
      body.lastChild.remove();
    }
  });
};
export { logicForInterviewScreen };
