$(document).ready(function () {
  $(".slider").slick({
    arrows: true, //Кнопки - стрелки
    dots: true, //Буллеты
    adaptiveHeight: false, //подстройка по высоте при вкюченном align-items: flex-start;
    slidesToShow: 3,//Количество отображаемых элементов
    slidesToScroll: 1,//Количество слайдов для прокрутки 
    speed: 1000,//Скорость прокрутки
    easing: "linear",//Тип анимации
    infinite: true,//Зацикленность
    initialSlide: 0,//Начальный слайд
    autoplay: false,//Автовоспроизведение
    autoplaySpeed: 500,//Скорочть воспроизведения
    pauseOnFocus: true,//Пауза при фокусе
    pauseOnHover: true,//Пауза при наведении
    pauseOnDotsHover: true,//Пауза при наведении на буллеты
    draggable: false,//Управление мышью
    swipe: true,//Свайп на телефоне
    touchThreshold: 5,//Величина свайпа для перехода
    touchMove: true,//Пережвижение по слайдеру тачем
    WaitForAnimate: true,//Ожидание окончания предыдущего пролистывания
    centerMode: false,//Выбранный слайд по центру
    variableWidth: false,//Вариативная ширина (не подстраивать ширину под настройки слайдера)
    rows: 1,//Количество рядов
    slidesPerRow: 1,//
    vertical: false,//Вертикальный слайдер
    verticalSwiping: false,//Вертикальный свайп
    fade: false,//Смена слайдов через fade (Должен отображаться только 1 слайд)
    asNavFor: ".slider2",//Управление другим слайдером
    responsive: [//Настройка брейкпоинтов для адаптива
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 400,
        settings: "unslick"
      }
    ],
    mobileFirst: false,//Меняет max-width на win-width в брейкпоинтах
    //appendArrows: $(".arrows"),//Перемещает стрелки в другой блок
    //appendDots: $(".dots"),//Перемещает буллеты в другой блок
  });
  // если для изображений указать значение не в src а в data-lazy,
  // то загрузка будет происходить не сразу, а только при переходе на слайд

  $(".slider2").slick({
    arrows: false,
    fade: true,
    asNavFor: ".slider",
  });

  $(".slider").on("beforeChange", (evt, slick, currentSlide, nextSlide) => {//Событие перед сменой слайда
    console.log(currentSlide);
  });
  $(".slider").on("afterChange", (evt, slick, currentSlide) => {//Событие после смены слайда
    console.log(currentSlide);
  });
  $(".slider").slick("setPosition");
  //Управление слайдером из кода
  $(".slider").slick("goTo", 3);
  $(".slider").slick("slickPrev");
  $(".slider").slick("slickNext");
  $(".slider").slick("slickPlay");//Автопроигрывание
  $(".slider").slick("slickPause");//Автопроигрывание стоп

  //$(".slider").slick("slickAdd", "<div>text</div>");//Добавить слайд
  //$(".slider").slick("slickRemove", 0);//Удалить слайд

  $(".slider").slick("slickFilter", ".filter");//Фильтрация
  $(".slider").slick("slickUnfilter");//Отключить фильтр

  let s = $(".slider").slick("slickGetOption", "slidesToShow");//Посмотреть свойство слайдера
  console.log("value: " + s);
  $(".slider").slick("slickSetOption", "slidesToShow", 4);//Установить значение
  //$(".slider").slick("unslick");//Убить слайдер. Для включения перезапустить функцию-конструктор

  // https://kenwheeler.github.io/slick/
});