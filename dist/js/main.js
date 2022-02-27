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
var API_KEY = "1bd21e7db7a94a10b01a3ec4e055080d"

const insertScreen = (elToInsert) => {
  body.appendChild(elToInsert);
};

// render a start screen 
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
