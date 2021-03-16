// const carousel__slide = document.querySelector('.carousel__slide');
// const carouselImages = document.querySelectorAll('.carousel__slide img');

// //buttons
// const prevBtn = document.querySelector('#prevBtn');
// const nextBtn = document.querySelector('#nextBtn');

// //counter
// let counter = 1;
// const size = carouselImages[0].clientWidth;

// carousel__slide.style.transform = 'translateX(' + (-size * counter) + 'px)';

// //button listeners

// nextBtn.addEventListener('click', () => {
//     if (counter >= carouselImages.length -1) return;
//     carousel__slide.style.transition = "transform 0.4s ease-in-out";
//     counter++;
//     carousel__slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
// });


// prevBtn.addEventListener('click', () => {
//     if (counter <= 0) return;
//     carousel__slide.style.transition = "transform 0.4s ease-in-out";
//     counter--;
//     carousel__slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
// });

// carousel__slide.addEventListener('transitionend', () => {
//     if (carouselImages[counter].id === 'lastClone') {
//         carousel__slide.style.transition = "none";
//         counter = carouselImages.length - 2;
//         carousel__slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
//     }
//     if (carouselImages[counter].id === 'firstClone') {
//         carousel__slide.style.transition = "none";
//         counter = carouselImages.length - counter;
//         carousel__slide.style.transform = 'translateX(' + (-size * counter) + 'px)';
//     }
// });
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}