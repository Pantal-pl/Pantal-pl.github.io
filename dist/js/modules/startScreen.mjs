const startScreenEl = document.createElement("section")
startScreenEl.setAttribute("class","start-screen")

startScreenEl.insertAdjacentHTML("beforeend",`
<div class="start-screen__text">
    <h1>Food App</h1>
    <br>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    <br>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione blanditiis cupiditate sit</p>
    <img src="/dist/images/cooking.svg" alt="">
</div>
<div class="start-screen__element"></div>
<div class="start-screen__footer">
    <ul>
        <li><a href="https://spoonacular.com/food-api">API</a></li>
        <li><a href="#">&#8226</a></li>
        <li><a href="https://github.com/Pantal-pl">Code</a></li>
        <li><a href="#">&#8226</a></li>
        <li><a href="#">Menu</a></li>

    </ul>
    <p>© 2021 Food App Corp.</p>
</div>
<button class="start-btn">Start</button>
<div class="line line1"></div>
<div class="line line2"></div>
<div class="line line3"></div>
`)
export {startScreenEl};