let toggleButton=document.querySelector(".toggle");
let navLinks=document.querySelector(".nav-links");
toggleButton.addEventListener("click", function (){
    navLinks.classList.toggle("active");
});
const themeToggle= document.getElementById("theme-toggle");
themeToggle.addEventListener('click', function (){
    document.body.classList.toggle('dark-mode');});