
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

function resetInterviewScreen(){
  const resetInterviewButton = document.querySelector(".interviewScreenButton")
  resetInterviewButton.addEventListener("click",function(){
  window.scroll(0,0)
  document.querySelector(".homePage").style.display = "none"
  document.querySelector(".menuBar").style.display = "none"
  if(document.body.contains(document.querySelector(".searchResults"))){
    let el = document.querySelector(".searchResults")
    el.remove()
  }
  if(document.body.contains(document.querySelector(".foodInformation"))){
    let el = document.querySelector(".foodInformation")
    el.remove()
  }

  createResetInterviewScreen()

  document.querySelector(".yes").addEventListener("click",function(){
    localStorage.setItem("cusine","")
    localStorage.setItem("intolerances","")
    localStorage.setItem("diet","")
    localStorage.setItem("interviewDone","")
    localStorage.setItem("recipesRange","")
    window.location.reload()
  })
  document.querySelector(".no").addEventListener("click",function(){
    let homePage = document.querySelector(".homePage")
    document.querySelector(".resetInterviewScreen").remove()
    homePage.style.display = "flex"
    homePage.style.zIndex = "1"
    homePage.style.opacity = "1"
  document.querySelector(".menuBar").style.display = "flex"
  })
  document.querySelector(".menuBar").classList.remove("menuBarActive")

})
}
export { resetInterviewScreen };
