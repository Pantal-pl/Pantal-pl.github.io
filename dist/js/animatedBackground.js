let abstractContainer = document.querySelector(".abstract-container");
const figures = ["square", "hex", "triangle"];
const abstracts = [];
// let j = 0;
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
for (let i = 0; i < 15; i++) {
  abstractContainer.innerHTML += `<img class="abstract abstract${i}" src="../dist/images/${
    figures[getRandomInt(0, 2)]
  }.svg">`;
  abstracts[i] = document.querySelector(`.abstract${i}`);
  abstracts[i].style.top = `${getRandomInt(10, 90)}%`;
  abstracts[i].style.left = `${getRandomInt(5, 88)}%`;
  abstracts[i].style.transform = `rotate(${getRandomInt(20, 180)}deg)`;
}
setInterval(() => {
  abstractContainer.innerHTML = "";
  for (let i = 0; i < 15; i++) {
    abstractContainer.innerHTML += `<img class="abstract abstract${i}" src="../dist/images/${
      figures[getRandomInt(0, 2)]
    }.svg">`;
    abstracts[i] = document.querySelector(`.abstract${i}`);
    abstracts[i].style.top = `${getRandomInt(10, 90)}%`;
    abstracts[i].style.left = `${getRandomInt(5, 88)}%`;
    abstracts[i].style.transform = `rotate(${getRandomInt(20, 180)}deg)`;
  }
}, 25000);
