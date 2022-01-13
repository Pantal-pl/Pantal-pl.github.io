const searchResultsEl = document.createElement("section");
searchResultsEl.setAttribute("class", "searchResults");

searchResultsEl.insertAdjacentHTML(
  "beforeend",
  `<div class="searchResult">
    <div class="foodImage"></div>
    <p>Spaghetti</p>
  </div>`
);
export { searchResultsEl };
