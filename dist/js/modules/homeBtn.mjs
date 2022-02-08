function homeBtn(){
    const homeBtn = document.querySelector(".homeScreenButton")
homeBtn.addEventListener("click",()=>{
  if(document.body.contains(document.querySelector(".searchResults"))){
    let el = document.querySelector(".searchResults")
    el.remove();
    let homePage = document.querySelector(".homePage")
    homePage.style.display = "flex"
    homePage.style.opacity = "1"
    homePage.style.zIndex = "1"
    window.scrollTo(0,0)
    if(document.body.contains(document.querySelector(".foodInformation"))){
      let el = document.querySelector(".foodInformation")
      el.remove()
    }
  }
  document.querySelector(".menuBar").classList.remove("menuBarActive")

})
}

export {homeBtn}