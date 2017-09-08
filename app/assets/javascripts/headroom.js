(function($) {
  var ost = 0;
  $(window).scroll(function() {
    var cOst = $(this).scrollTop();

    if(cOst > 200 && cOst > ost) {
       $('.tab').addClass('fixed').removeClass('default');
    }
    else {
       $('.tab').addClass('default').removeClass('fixed');
    }
    ost = cOst;
  });
})(jQuery);

// $(function(){
//   $(".menu-toggle").click(function(){
//     $(this).toggleClass("on");
//     $(".headB").slideToggle();
//   });
// });
