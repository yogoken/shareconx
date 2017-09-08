jQuery(function($) {
  //多すぎる文字を消す
  $('.tweet_text').each(function() {
    var $target = $(this);

    // オリジナルの文章を取得する
    var html = $target.html();

    // 対象の要素を、高さにautoを指定し非表示で複製する
    var $clone = $target.clone();
    $clone
      .css({
        display: 'none',
        position : 'absolute',
        overflow : 'visible'
      })
      .width($target.width())
      .height('auto');

    // DOMを一旦追加
    $target.after($clone);

    // 指定した高さになるまで、1文字ずつ消去していく
    while((html.length > 0) && ($clone.height() > $target.height())) {
      html = html.substr(0, html.length - 1);
      $clone.html(html + '...（続きを読む）');
    }

    // 文章を入れ替えて、複製した要素を削除する
    $target.html($clone.html());
    $clone.remove();
  });
  $('.counter').each(function () {
      $(this).prop('Counter',0).animate({
          Counter: $(this).text()
      }, {
          duration: 1500,
          easing: 'swing',
          step: function (now) {
              $(this).text(Math.ceil(now));
          }
      });
  });

  // いいね機能
  var $tweetLikeBox = $("#tweet_like_button");
  // tweetLike
  $("#tweet_like_button").on("click", function(){
    var $tweetLikeSum = $("#tweet_like_sum");
    var $tweetLikeText = $("#tweet_like_text");
    var $tweetId = $(this).data("tweetid");
    var $tweetLikeId = $(this).data("tweetlikeid");
    tweet_like_function($tweetId, $tweetLikeId, $(this), $tweetLikeBox, $tweetLikeSum, $tweetLikeText);
  });
  function tweet_like_function(tweetId, tweetLikeId, button, tweetLikeBox, sum, liketext) {
    if (button.hasClass("decrement")){
        $.ajax({
          url: "/tweets/" + tweetId + "/tweet_likes/" + tweetLikeId,
          type: "delete",
          data: {tweet_id: tweetId, dataType: "json"}
        }).done(function(data){
          button.removeClass("decrement").addClass("increment")
          tweetLikeBox.attr("style", "color: #666; text-decoration: none;")
          liketext.text("Like")
          sum.text(data["count"])
          $("#comment-create-tweet-like").text(data["count"])
        })
      }else{
        $.ajax({
          url: "/tweets/" + tweetId + "/tweet_likes",
          type: "post",
          data: {tweet_id: tweetId, dataType: "json"}
        }).done(function(data){
          button.removeClass("increment").addClass("decrement")
          tweetLikeBox.attr("style", "color: rgb(255, 134, 134); text-decoration: none;")
          liketext.text("Liked")
          sum.text(data["count"])
          $("#comment-create-tweet-like").text(data["count"])
        })
      }
  }
  // commentLike
  $(".comment_like_button").on("click", function(){
    var $commentLikeSum = $("#" + $(this).data("commentid") + "_comment_like_sum");
    var $commentLikeText = $("#" + $(this).data("commentid") + "_comment_like_text");
    var $commentLikeIcon = $("#" + $(this).data("commentid") + "_comment_like_icon");
    var $tweetId = $(this).data("tweetid");
    var $commentId = $(this).data("commentid");
    var $commentLikeId = $(this).data("commentlikeid");
    comment_like_function($tweetId, $commentId, $commentLikeId, $(this), $commentLikeSum, $commentLikeText, $commentLikeIcon);
  });
  function comment_like_function(tweetId, commentId, commentLikeId, button, sum, liketext, icon) {
    if (button.hasClass("decrement")){
        $.ajax({
          url: "/tweets/" + tweetId + "/comments/" + commentId + "/comment_likes/" + commentLikeId,
          type: "delete",
          data: {tweet_id: tweetId, comment_id: commentId, dataType: "json"}
        }).done(function(data){
          button.removeClass("decrement").addClass("increment")
          icon.attr("style", "color: #666; text-decoration: none;")
          liketext.attr("style", "color: #666; text-decoration: none;")
          sum.attr("style", "color: #666; text-decoration: none;")
          liketext.text("Like")
          // $("#reply-create-comment-like").text(data["comment_likes_count"])
          sum.text(data["comment_likes_count"])
        })
      }else{
        $.ajax({
          url: "/tweets/" + tweetId + "/comments/" + commentId + "/comment_likes",
          type: "post",
          data: {tweet_id: tweetId, comment_id: commentId, dataType: "json"}
        }).done(function(data){
          button.removeClass("increment").addClass("decrement")
          icon.attr("style", "color: rgb(255, 134, 134); text-decoration: none;")
          liketext.attr("style", "color: rgb(255, 134, 134); text-decoration: none;")
          sum.attr("style", "color: rgb(255, 134, 134); text-decoration: none;")
          liketext.text("Liked")
          sum.text(data["comment_likes_count"])
          // $("#reply-create-comment-like").text(data["comment_likes_count"])
        })
      }
  }

  // PV計測
  $(".tweet_detail_for_pv").on("click", function(){
    var $pvTweetId = $(this).data("pvtweetid");
    $.post({
      url: "/tweets/" + $pvTweetId + "/pvs",
      data: {tweet_id: $pvTweetId, dataType: "json"}
    });
  });

  // ajax
  // comment_post_ajax
  

});
