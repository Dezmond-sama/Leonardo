//Тест на поддержку webp
const testWebp = (callback) => {
  let webp = new Image();
  webp.onload = webp.onerror = () => {
    callback(webp.height === 2);
  }
  webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebp(support => {
  if (support === true) document.querySelector('body').classList.add('webp');
  else document.querySelector('body').classList.add('no-webp');
});