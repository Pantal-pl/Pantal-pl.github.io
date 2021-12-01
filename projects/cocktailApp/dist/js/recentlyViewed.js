const recentlyViewedDrinksButton = document.querySelector("#menu-option3");
let isRecentlyViewedExist = false;
recentlyViewedDrinksButton.addEventListener("click", () => 
{
  if(isAlertBannerExist === true){
    document.querySelector(".alert").classList.remove("alert-active")
    isAlertBannerExist = false
  }
  if (isRecentlyViewedExist === false) {
    headerText.textContent = "Recently Viewed";
    drinkDescription.style.display = "none";
    let recentlyViewed = document.createElement("div");
    recentlyViewed.setAttribute("class", "recentlyViewed");
    for (let i = 0; i < sessionStorage.getItem("sessionStorageIndex"); i++) {
      // inserting each drink description from session storage
      recentlyViewed.insertAdjacentHTML(
        "beforeend",
        sessionStorage.getItem(`drink${i}`)
      );
    }
    drinkList.style.display = drinkForm.style.display = "none";
    body.append(recentlyViewed);
    isRecentlyViewedExist = true;
  } else if (isRecentlyViewedExist === true) {
    document.querySelector(".recentlyViewed").remove();
    isRecentlyViewedExist = false;
    headerText.textContent = "Recently Viewed";
    drinkDescription.style.display = "none";
    let recentlyViewed = document.createElement("div");
    recentlyViewed.setAttribute("class", "recentlyViewed");
    for (let i = 0; i < sessionStorage.getItem("sessionStorageIndex"); i++) {
      // inserting each drink description from session storage
      recentlyViewed.insertAdjacentHTML(
        "beforeend",
        sessionStorage.getItem(`drink${i}`)
      );
    }

    drinkList.style.display = drinkForm.style.display = "none";
    body.append(recentlyViewed);
    isRecentlyViewedExist = true;
  }
  let allBackButtons = [...document.querySelectorAll(".back-button")];
  allBackButtons.forEach((element) => {
    element.style.display = "none";
  });
});
