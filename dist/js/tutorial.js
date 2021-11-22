let body = document.querySelector("body")
const turorial1 = document.querySelector(".tutorial1")
const turorial2 = document.querySelector(".tutorial2")
const turorial3 = document.querySelector(".tutorial3")
const nextButton1 = document.querySelector(".next1")
const nextButton2 = document.querySelector(".next2")
const finishButton = document.querySelector(".finish")
const skipButtons = document.querySelectorAll(".skip");
const drinkForm = document.querySelector(".drink-form");

let endTutorial = false;
for(let i = 0; i < skipButtons.length; ++i){
  skipButtons[i].addEventListener("click",()=>{
    turorial1.style.left = "-100%";
    turorial2.style.left = "-100%";
    turorial3.style.left = "-100%";
    drinkForm.innerHTML += `<section class="search-screen">
    <div><label for="wanted-drink">Drink name:</label></div>
    <input autocomplete="off"  type="text" name="wanted-drink" required class="wanted-drink" placeholder="Enter drink name...">
    <button type="submit" class="search-button">Search</button>
    </section>`
    endTutorial = true;
    localStorage.setItem('endTutorial', endTutorial)
    location.reload();
  })
}
nextButton1.addEventListener("click",()=>{
  turorial1.style.left = "-100%";
  turorial2.style.left = "0";
})
nextButton2.addEventListener("click",()=>{
  turorial2.style.left = "-100%";
  turorial3.style.left = "0";
})
finishButton.addEventListener("click",()=>{
  turorial3.style.left = "-100%";
  endTutorial = true;
  localStorage.setItem('endTutorial', endTutorial)
  drinkForm.innerHTML += `<section class="search-screen">
  <div><label for="wanted-drink">Drink name:</label></div>
  <input autocomplete="off"  type="text" name="wanted-drink" required class="wanted-drink" placeholder="Enter drink name...">
  <button type="submit" class="search-button">Search</button>
</section>`
location.reload();
})

 if(localStorage.getItem('endTutorial') === 'true' || endTutorial === 'true') {
  turorial1.style.left = "-100%";
  turorial2.style.left = "-100%";
  turorial3.style.left = "-100%";
  drinkForm.innerHTML += `<section class="search-screen">
  <div><label for="wanted-drink">Drink name:</label></div>
  <input autocomplete="off" type="text" name="wanted-drink" required class="wanted-drink" placeholder="Enter drink name...">
  <button type="submit" class="search-button">Search</button>
</section>`
}
