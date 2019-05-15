document.addEventListener("DOMContentLoaded", function () {
  //Note: I have used HttpRequest , because fetch function is not supported in IE.
  /*fetch("../data.json").then((response) => response.json()).then((json) => {
    const arrObj = Object.keys(json).map(key => json[key]);
    loadSlides(arrObj);
  }).catch(error => alert(error + ". Please run on local-host server"));*/

  let xhr = new XMLHttpRequest;
  xhr.open("GET", "../data.json", true);
  xhr.onload = function(){
    if (this.status === 200){
      const arrObj = Object.keys(JSON.parse(this.responseText)).map(key => JSON.parse(this.responseText)[key]);
      loadSlides(arrObj);
    }
  }

  xhr.send();

  //Sidenavigation
  const btn = document.querySelector(".header__button");
  const sideNav = document.querySelector(".sidenav");
  const sideText = document.querySelector(".sidenav__navigation");
  const headerEl = document.querySelector(".header");
  const mainEl = document.querySelector(".main");
  const footerEl = document.querySelector(".footer");
  const sectionHero = document.querySelector(".section-hero");
  let nav = false;

  btn.addEventListener("click", () => {
    nav = !nav;
    if (nav) {
      headerEl.style.marginLeft = "-72.5%";
      mainEl.style.marginLeft = "-72.5%";
      footerEl.style.marginLeft = "-72.5%";
      sectionHero.style.marginLeft = "-72.5%";
      sideNav.style.width = "72.5%";
      sideText.style.opacity = "1";

    } else {
      headerEl.style.marginLeft = "0";
      mainEl.style.marginLeft = "0";
      footerEl.style.marginLeft = "0";
      sectionHero.style.marginLeft = "0";
      sideNav.style.width = "0";
      sideText.style.opacity = "0";
    }
  });
});

//Section Slider
const slideBcg = document.querySelector(".section-slider");
const slideTitle = document.querySelector(".section-slider__heading--slider");
const slideParagraph = document.querySelector(".section-slider__paragraph--slider");
const slideButton = document.querySelector(".section-slider__btn--link");

let index = 0;
function loadSlides(data) {
  showSlide(data);
  document.querySelector(".section-slider__btn-control--ne").addEventListener('click', () => {
    if (index >= data.length - 1) {
      index = data.length - 1;
      return showSlide(data);
    } else {
      index++;
      return showSlide(data)
    }
  });

  document.querySelector(".section-slider__btn-control--pr").addEventListener("click", () => {
    if (index === 0) {
      index = 0;
      return showSlide(data);
    } else {
      index--;
      return showSlide(data)
    }
  });
};

function showSlide(slides) {
  slideBcg.style.backgroundImage = `url(${slides[index].path})`;
  slideTitle.innerHTML = slides[index].title;
  slideParagraph.innerHTML = slides[index].description;
  slideButton.innerHTML = slides[index].btnText;
}


