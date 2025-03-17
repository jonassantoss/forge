const carouselContainer = document.querySelector(".carousel");
const carousel = document.querySelector(".cards");
const items = document.querySelectorAll(".card");
const buttonLeft = document.querySelector(".btn-left");
const buttonRight = document.querySelector(".btn-right");

let currentIndex = 0;

const itemWidth = 165;
const visibleItems = 4;

function updateCarousel() {
  carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

  if (currentIndex === 0) {
    buttonLeft.style.display = "none";
    carouselContainer.classList.add("hide-left-fade");
  } else {
    buttonLeft.style.display = "flex";
    carouselContainer.classList.remove("hide-left-fade");
  }

  if (currentIndex >= items.length - visibleItems) {
    buttonRight.style.display = "none";
    carouselContainer.classList.add("hide-right-fade");
  } else {
    buttonRight.style.display = "flex";
    carouselContainer.classList.remove("hide-right-fade");
  }
}

buttonLeft.addEventListener("click", () => {
  currentIndex = Math.max(currentIndex - 1, 0);
  updateCarousel();
});

buttonRight.addEventListener("click", () => {
  currentIndex = Math.min(currentIndex + 1, items.length - visibleItems);
  updateCarousel();
});

updateCarousel();
