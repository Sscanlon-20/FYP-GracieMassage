window.onscroll = function() {
    myFunction();
};

const header = document.getElementById("topHeader");
const sticky = header.offsetTop;

function toggleMenu() {
    const menu = document.getElementById("menu1");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


function myFunction() {
    if (window.scrollY > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

