$(function() {
  makeRandNm();
});

function makeRandNm () {
  var l = 8;
  var c = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var cl = c.length;
  var r = "";
  for(var i=0; i<l; i++){
    r += c[Math.floor(Math.random()*cl)];
  };

  $("#user_nickname").val(r);
};
