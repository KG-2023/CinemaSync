'use strict';

// ! ========== Theme transition from dark mode to light mode ==========
var icon = document.getElementById("icon");
icon.onclick = function () {
  document.body.classList.toggle("light-theme");
  if (document.body.classList.contains("light-theme")) {
    icon.src = "./images/moon.png";
  } else {
    icon.src = "./images/sun.png";
  }
};