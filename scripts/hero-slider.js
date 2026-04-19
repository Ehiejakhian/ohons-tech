import { sel } from './util/methods.js';

let slides = sel('.hero__img > img', true);
let current = 0;

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

// Change every 4 seconds
setInterval(nextSlide, 4000);