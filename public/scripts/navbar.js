const menuIcon = document.querySelector(".menu-icon");
const cancelIcon = document.querySelector(".cancel-icon");
const linksContainer = document.querySelector(".links");

menuIcon.addEventListener("click", () => {
    menuIcon.classList.add("hidden");
    cancelIcon.classList.remove("hidden");
    linksContainer.style.left = "0%";
});

cancelIcon.addEventListener("click", () => {
    cancelIcon.classList.add("hidden");
    menuIcon.classList.remove("hidden");
    linksContainer.style.left = "100%";
});