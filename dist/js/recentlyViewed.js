let isRecentlyViewedExist = false;
recentlyViewedDrinksButton.addEventListener("click", () => {
  if (isRecentlyViewedExist === false) {
    headerText.textContent = "Recently Viewed";
    drinkDescription.style.position = "inline-flex";
    let recentlyViewed = document.createElement("div");
    recentlyViewed.setAttribute("class", "recentlyViewed");
    for (let i = 0; i < sessionStorage.getItem("sessionStorageIndex"); i++) {
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
    drinkDescription.style.position = "inline-flex";
    let recentlyViewed = document.createElement("div");
    recentlyViewed.setAttribute("class", "recentlyViewed");
    for (let i = 0; i < sessionStorage.getItem("sessionStorageIndex"); i++) {
      recentlyViewed.insertAdjacentHTML(
        "beforeend",
        sessionStorage.getItem(`drink${i}`)
      );
    }
    drinkList.style.display = drinkForm.style.display = "none";
    body.append(recentlyViewed);
    isRecentlyViewedExist = true;
  }
});