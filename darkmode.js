
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it

window.onclick = function(event) { 
  if (!event.target.matches('.dropbtn')){
   var dropdowns = document.getElementsByClassName("dropdown-content");
  var i; for (i = 0; i < dropdowns.length; i++) { 
    var openDropdown = dropdowns[i];
     if (openDropdown.classList.contains('show')) 
  { openDropdown.classList.remove('show');
 } 
} 
} 
} 
//Change Themes
const currentTheme = localStorage.getItem("theme");
const themeContainer = document.getElementById("theme");
const btnDark= document.getElementById("dark");
const btn= document.getElementById("light");
function getLight(){
  localStorage.setItem("darkMode",null);
    themeContainer.classList.remove('dark');
    document.body.style.backgroundColor = "white";
    themeContainer.classList.toggle('light');
}; 

function getDark() {
  localStorage.setItem("darkMode","enabled");
    themeContainer.classList.remove('light');
    document.body.style.backgroundColor = "#1D0127";
    themeContainer.classList.toggle('dark');
       
   };
//local Storage
let darkMode = localStorage.getItem("darkMode");
if(darkMode==="enabled"){
 
  getDark();
}
