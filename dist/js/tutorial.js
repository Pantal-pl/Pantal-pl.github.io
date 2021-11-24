const {body, turorial3, turorial2, turorial1, drinkForm, skipButtons, nextButton1, nextButton2, finishButton } = tutorialVariables();

let endTutorial = false;
let tutorial = document.createElement("div");
tutorial.insertAdjacentHTML(
  "beforeend",
  `<section class="search-screen">
<div><label for="wanted-drink">Drink name:</label></div>
<input oninvalid="this.setCustomValidity('Enter drink name.')" autocomplete="off"  type="text" name="wanted-drink" required class="wanted-drink" placeholder="Enter drink name...">
<button type="submit" class="search-button">Search</button>
</section>`
);

function hidingTutorial(){
  turorial3.style.display =
  turorial2.style.display =
  turorial1.style.display =
    "none";
  drinkForm.append(tutorial);

}
// menuButtonMark(1)
for (let i = 0; i < skipButtons.length; ++i) {
  skipButtons[i].addEventListener("click", () => {
    hidingTutorial()
    endTutorial = true;
    localStorage.setItem("endTutorial", endTutorial);
    location.reload();
    // setInterval(() => {
    //   document.querySelector("#menu-option1").style.outline = "none"
    // }, 1);  
    // setInterval(() => {
    //   document.querySelector("#menu-option2").style.outline = "none"
    // }, 1);  
    // setInterval(() => {
    //   document.querySelector("#menu-option").style.outline = "none"
    // }, 1);
  });
}
nextButton1.addEventListener("click", () => {
  turorial1.style.left = "-100%";
  turorial2.style.left = "0";
  // setInterval(() => {
  //   document.querySelector("#menu-option1").style.outline = "none"
  // }, 0);
  // menuButtonMark(2)

});
nextButton2.addEventListener("click", () => {
  turorial2.style.left = "-100%";
  turorial3.style.left = "0";
  // setInterval(() => {
  //   document.querySelector("#menu-option2").style.outline = "none"
  // }, 0);
  // menuButtonMark(3)
});
finishButton.addEventListener("click", () => {
  turorial3.style.left = "-100%";
  endTutorial = true;
  localStorage.setItem("endTutorial", endTutorial);
  drinkForm.append(tutorial);
  location.reload();
  // setInterval(() => {
  //   document.querySelector("#menu-option3").style.outline = "none"
  // }, 0);
});

if (localStorage.getItem("endTutorial") === "true" || endTutorial === "true") {
  hidingTutorial()
}
function tutorialVariables() {
  let body = document.querySelector("body");
  const turorial1 = document.querySelector(".tutorial1");
  const turorial2 = document.querySelector(".tutorial2");
  const turorial3 = document.querySelector(".tutorial3");
  const nextButton1 = document.querySelector(".next1");
  const nextButton2 = document.querySelector(".next2");
  const finishButton = document.querySelector(".finish");
  const skipButtons = document.querySelectorAll(".skip");
  const drinkForm = document.querySelector(".drink-form");
  return {body, turorial3, turorial2, turorial1, drinkForm, skipButtons, nextButton1, nextButton2, finishButton };
}
// function menuButtonMark(menuButtonNumber){
//   document.querySelector(`#menu-option${menuButtonNumber}`).style.outline = "5px solid white" 
//   setInterval(() => {
//     document.querySelector(`#menu-option${menuButtonNumber}`).style.outline = "none" 
//   }, 1000);
//   setInterval(() => {
//     document.querySelector(`#menu-option${menuButtonNumber}`).style.outline = "5px solid white" 
//   }, 2000);
// }