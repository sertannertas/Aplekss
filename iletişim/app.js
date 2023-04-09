const navbar = document.querySelector("nav");

function animation() {
  var controller = new ScrollMagic.Controller();

  const t1 = gsap.timeline({ defaults: { ease: Expo.InOut } });

  t1.fromTo(navbar, 1, { y: "-5rem" }, { y: 0 });
  t1.fromTo(
    ".banner-text",
    0.5,
    { x: "-2rem", opacity: 0 },
    { x: 0, opacity: 1 },
    "-=1"
  );
  t1.fromTo(
    ".banner-img",
    0.5,
    { x: "5rem", opacity: 0 },
    { x: 0, opacity: 1 }
  );
  t1.fromTo(".banner-img img", 0.5, { scale: 1.5 }, { scale: 1 });

  // about animations

  const t2 = gsap.timeline({ defaults: { ease: Expo.InOut } });

  t2.fromTo(
    ".about-text",
    0.5,
    { x: "-2rem", opacity: 0 },
    { x: 0, opacity: 1 }
  );
  t2.fromTo(".about-img", 0.5, { x: "5rem", opacity: 0 }, { x: 0, opacity: 1 });
  t2.fromTo(".about-img img", 0.5, { scale: 1.5 }, { scale: 1 });

  new ScrollMagic.Scene({
    triggerElement: "#about",
    triggerHook: 0.5,
    reverse: false,
  })
    .setTween(t2)
    .addTo(controller);

  // card animations

  const t3 = gsap.timeline({ defaults: { ease: Expo.InOut } });
  t3.fromTo(
    ".card",
    1,
    { y: "-3rem", opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.3 }
  );
  t3.set(".card", { clearProps: "all" });

  new ScrollMagic.Scene({
    triggerElement: "#vid",
    triggerHook: 0.5,
    reverse: false,
  })
    .setTween(t3)
    .addTo(controller);
}

animation();
const leftArr = document.getElementById("leftArr");
const rightArr = document.getElementById("rightArr");
const textDiv = document.querySelector(".texts");
const sliderCon = document.querySelector(".sliderCon"); // to swipe left / right on mobile
let index = 0;

const texts = [
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   "",
   ""
]

function slideLeft() {
   if (index == 0) index = texts.length-1;
   else index--;
   gsap.to(".images", .3, {x: `${-index*100}%`})
   textDiv.textContent = texts[index];
   gsap.from(textDiv, .5, {y: -20, opacity: 0, ease: 'power3.out'})
}

function slideRight() {
   if (index == texts.length-1) index = 0;
   else index++;
   gsap.to(".images", .3, {x: `${-index*100}%`});
   textDiv.textContent = texts[index];
   gsap.from(textDiv, .5, {y: -20, opacity: 0, ease: 'power3.out'})
}

leftArr.addEventListener("click", slideLeft);
rightArr.addEventListener("click", slideRight);

// SWIPE FUNCTIONALITY FOR MOBILE ⬇
let start = null;
sliderCon.addEventListener("touchstart",function(event){
   if (event.touches.length === 1) start = event.touches.item(0).clientX;
   else start = null;
});

sliderCon.addEventListener("touchend",function(event){
   let offset = 30; // at least 30px
   if (start) {
      let end = event.changedTouches.item(0).clientX;
      if (end > start + offset) slideLeft();
      if (end < start - offset ) slideRight();
   }
});