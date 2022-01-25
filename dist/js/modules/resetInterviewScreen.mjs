function createResetInterviewScreen() {
  const body = document.querySelector("body")
  const resetInterviewScreenEl = document.createElement("section");
  resetInterviewScreenEl.setAttribute("class", "resetInterviewScreen");

  resetInterviewScreenEl.insertAdjacentHTML(
    "beforeend",
    `
<h1 class="heading">Are you sure to reset your settings ?</h1>
<div class="buttons">
  <button class="yes">Reset my settings</button>
  <button class="no">Keep my settings save</button>
</div>
`
  );
  body.appendChild(resetInterviewScreenEl)
}
export { createResetInterviewScreen };
