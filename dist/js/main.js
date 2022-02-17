import { startScreenEl } from "./modules/startScreen.mjs";
import {
  interviewScreenEl,
  logicForInterviewScreen,
  searchBarEl,
  logicForSearchBar,
  homePageEl,
  logicForHomePage
} from "./modules/interviewScreen.mjs";
const body = document.querySelector("body");
var API_KEY = "61e47f7785344ae3b4c589ac6bf2c496"

const insertScreen = (elToInsert) => {
  body.appendChild(elToInsert);
};

insertScreen(startScreenEl);
const startBtn = document.querySelector(".start-btn");


startBtn.addEventListener("click", () => {
  body.lastChild.remove();
  window.scrollTo(0,0)
  if(localStorage.getItem("interviewDone")!=="true"){
    insertScreen(interviewScreenEl);
    logicForInterviewScreen();
  }else{
      body.lastChild.remove();
      body.appendChild(searchBarEl);
      logicForSearchBar();
      body.appendChild(homePageEl)
      logicForHomePage()
  }
});
export {API_KEY}
