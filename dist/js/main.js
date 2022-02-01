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
var API_KEY = "2bc61db4f6364c6baf24ffb62496d497"

const insertScreen = (elToInsert) => {
  body.appendChild(elToInsert);
};

insertScreen(startScreenEl);
const startBtn = document.querySelector(".start-btn");


startBtn.addEventListener("click", () => {
  body.lastChild.remove();
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
