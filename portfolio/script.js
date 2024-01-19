let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header ul li a");

function changeActiveLink() {
  let fromTop = window.scrollY + 100;

  navLinks.forEach((link) => {
    let section = document.querySelector(link.getAttribute("href"));
    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
  changeActiveLink();
});

changeActiveLink();

var i = 0;
var texts = [
  "Full Stack Developer",
  "Web Developer.",
  "App Developer.",
  "Web Designer.",
  "MERN Stack Developer.",
  "AWS Developer.",
];
var speed = 200;
var currentTextIndex = 0;
var intervalId;

function startTypewriter() {
  typeWriter();
  intervalId = setInterval(typeWriter, speed);
}
function typeWriter() {
  if (i < texts[currentTextIndex].length) {
    document.getElementById("content").innerHTML +=
      texts[currentTextIndex].charAt(i);
    i++;
  } else {
    clearInterval(intervalId);
    setTimeout(clearContent, 1000);
  }
}
function clearContent() {
  i = 0;
  document.getElementById("content").innerHTML = "";
  currentTextIndex = (currentTextIndex + 1) % texts.length;
  intervalId = setInterval(typeWriter, speed);
}

window.addEventListener("load", startTypewriter);
window.addEventListener("beforeunload", function () {
  clearInterval(intervalId);
});
