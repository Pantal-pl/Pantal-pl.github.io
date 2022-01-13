const body = document.querySelector("body");
const insertScreen = (elToInsert) => {
  body.appendChild(elToInsert);
};
import { startScreenEl } from "./modules/startScreen.mjs";
import {
  interviewScreenEl,
  logicForInterviewScreen,
} from "./modules/interviewScreen.mjs";


insertScreen(startScreenEl);

const startBtn = document.querySelector(".start-btn");

startBtn.addEventListener("click", () => {
  body.lastChild.remove();
  insertScreen(interviewScreenEl);
  logicForInterviewScreen();
});

