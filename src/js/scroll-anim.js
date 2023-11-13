//Анимация при прокрутке
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".scroll-anim");
  const animStart = 4;
  const offset = (elem) => {
    const rect = elem.getBoundingClientRect(),
      left = window.pageXOffset || document.documentElement.scrollLeft,
      top = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + top, left: rect.left + left };
  }
  const scrollAnim = (evt) => {
    items.forEach((item) => {
      const height = item.offsetHeight;
      const offsetY = offset(item).top;
      let animPoint = window.innerHeight - Math.min(height, window.innerHeight) / animStart;
      const y = window.pageYOffset || document.documentElement.scrollTop;
      if (y > offsetY - animPoint && y < offsetY + height) {
        item.classList.add("scroll-anim__active");
      } else {
        item.classList.remove("scroll-anim__active");
      }
    });
  }
  if (items.length > 0) {
    document.addEventListener("scroll", scrollAnim);
    setTimeout(scrollAnim, 300);
  }

});