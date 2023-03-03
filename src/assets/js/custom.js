/**
 * @author Tarun
 * @description JS for dashboard sidebar
 */

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}

function togglenav() {
    var element = document.getElementById("navbar");
    element.classList.toggle("opennav");
}