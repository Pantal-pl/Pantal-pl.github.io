const searchBarEl = document.createElement("div");
searchBarEl.setAttribute("class", "menuBar");

searchBarEl.insertAdjacentHTML(
  "beforeend",
  `
<div class="row1">
  <label id="instructionRequired">
    <p>Instruction required?</p>
    <div id="instructionRequiredOption">
      <div class="option optionYes">
        <p>Yes</p>
      </div>
      <div class="option optionNo">
        <p>No</p>
      </div>
    </div>
  </label>
  <button class="homeScreenButton">Home</button>
  <button class="interviewScreenButton">Interview</button>
</div>
<div class="row2">
  <label for="name" id="name">
    <p>Name:</p>
    <input type="text" autocomplete="off" name="name" placeholder="Write here" />
  </label>
  <label for="searchBy" id="searchBy">
    <p>Search by:</p>
    <select name="searchBy">
      <option value=""></option>
      <option value="name">Name</option>
      <option value="Ingredients">Ingredients</option>
    </select>
  </label>
  <button class="searchButton">Search</button>
</div>
<div class="moveBar"></div>
`
);
const logicForSearchBar = () => {
  const menuBar = document.querySelector(".menuBar");
  const moveBar = document.querySelector(".moveBar");
  const swipeDownMenuBar = () => {
    moveBar.addEventListener("touchstart", () => {
      menuBar.style.top = "0";
      swipeUpMenuBar();
    });
  };
  const swipeUpMenuBar = () => {
    moveBar.addEventListener("touchstart", () => {
      menuBar.style.top = "-18vh";
      swipeDownMenuBar();
    });
  };
  swipeDownMenuBar()

};
export { searchBarEl, logicForSearchBar };
