$(document).ready(function() {
    var icon = $("#icon");
  
    if (localStorage.getItem("theme") == null) {
      localStorage.setItem("theme", "light");
    }
  
    let localData = localStorage.getItem("theme");
  
    if (localData === "light") {
      icon.attr("src", "../images/moon.png");
      $("body").removeClass("dark-theme");
    } else if (localData === "dark") {
      icon.attr("src", "../images/sun.png");
      $("body").addClass("dark-theme");
    }
  
    icon.click(function() {
      $("body").toggleClass("dark-theme");
      if ($("body").hasClass("dark-theme")) {
        icon.attr("src", "../images/sun.png");
        localStorage.setItem("theme", "dark");
      } else {
        icon.attr("src", "../images/moon.png");
        localStorage.setItem("theme", "light");
      }
    });
  });
  