//Адаптивное меню

const adaptive_menu = () => {
  let w = window.outerWidth;
  let stdMenu = document.querySelector(".header-menu");
  let menu = document.querySelector(".header-menu__list");
  let mobileMenu = document.querySelector(".mobile-menu__list");
  if (w < 700) {
    if (!mobileMenu.classList.contains('done')) {
      mobileMenu.classList.add('done');
      mobileMenu.append(menu);
    }
  } else {
    if (mobileMenu.classList.contains('done')) {
      mobileMenu.classList.remove('done');
      stdMenu.append(menu);
    }
  }
}

window.onresize = adaptive_menu;
adaptive_menu();