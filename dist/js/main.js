const API_KEY = "1bd21e7db7a94a10b01a3ec4e055080d";
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

// fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=pasta`)
//   .then((response) => response.json())
//   .then((data) => console.log(data));
