/**
 * @author Tarun
 * @description JS for dashboard sidebar
 */

function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("overlay").style.display = "block";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("overlay").style.display = "none";
}

function togglenav() {
  var element = document.getElementById("navbar");
  element.classList.toggle("opennav");
}
