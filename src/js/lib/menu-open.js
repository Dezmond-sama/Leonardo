
const btn = document.querySelector(".mobile-menu__icon");
console.log(btn);
if (btn) {
  btn.addEventListener("click", (evt) => {
    btn.classList.toggle("active");
    const menu = document.querySelector(".mobile-menu__list");
    if (menu) menu.classList.toggle("active");
    document.body.classList.toggle("lock");
  });
}