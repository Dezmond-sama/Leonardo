//@@include("webp.js")
//@@include("scroll-anim.js")

$(".header-content__link").click(function () {
  let elem = $(".send-mail__form");
  let destination = $(elem).offset().top;
  $("html,body").animate({ scrollTop: destination }, {
    duration: 500, easing: "swing"
  });
  return false;
});