function anableSwipe(){
  // swipeList
  $(".js-swipeList").swipeList();
  $.FindContainer = function () {
      $('.tab-content>div').each(function findcontent() {
          var newindex = $('.activetab').index();
          var newheight = $('.activetab').height();
          $('.tab-content').animate({
              'height': newheight+20
          }, 100);
          var otherindex = $(this).index();
          var substractindex = otherindex - newindex;
          var currentwidth = $('.multipletab').width();
          var newpositions = substractindex * currentwidth;
          $(this).animate({
              'left': newpositions
          });
      });
    };
    $.FindId = function () {
        $('.tab-content>div').each(function () {
            if ($(this).attr('id') == $('.active').attr('id')) {
                $('.tab-content>div').removeClass('activetab');
                $(this).addClass('activetab');
            }
        });
    };
    $('.tab-buttons>span').first().addClass('active');
    $('.tab-content>div').each(function () {
        var activeid = $('.active').attr('id');
        if ($(this).attr('id') == activeid) {
            $(this).addClass('activetab');
        }
        var currentheight = $('.activetab').height();
        var currentwidth = $('.multipletab').width();
        var currentindex = $(this).index();
        var currentposition = currentindex * currentwidth;
        $(this).css({
            'left': currentposition,
            'width': currentwidth,
            'padding': '0px'
        });
        $(this).attr('data-position', currentposition);
        $('.tab-content').css('height', currentheight+20);
    });
    $('.tab-buttons>span').click(function () {
        $(window).scrollTop(0);
        $('.tab-buttons>span').removeClass('active');
        $(this).addClass('active');
        var currentid = $('.active').attr('id');
        $.FindId();
        $.FindContainer();
    });
}
function swipeRiset(){
  $(".js-swipeListTarget").css("transform", "translate3d(0, 0, 0)")
}

function modals (){
  //modal
  var $overlay = $('#modal-overlay');
  var $panel = $('#modal');
  var $commentCreatePanel = $('#comment-create-modal');
  var $replyCreatePanel = $('#reply-create-modal');
  var $commentEditPanel = $('#comment-edit-modal');
  var $replyEditPanel = $('#reply-edit-modal');
  var $tweetShowOptionPanel = $('#tweet-show-option-modal')
  var $tweetShowTweetEditPanel = $('#tweetShow-tweet-edit-modal')
  var $userCompanyEditPanel = $('#user-company-edit-modal')
  var $userNicknameEditPanel = $('#user-nickname-edit-modal')
  var $userEmailEditPanel = $('#user-email-edit-modal')
  var $userEmailEditConfirmationPanel = $('#confirmation-modal')
  var $tweetViolationReportPanel = $('#violation_report_modal')

  //comment-create-modal
  $('.comment-create-btn').click(function(e){
    e.preventDefault();
    $commentCreatePanel.fadeIn();
    $overlay.fadeIn();
    setPosition();
    $(this).parent().addClass('flag');
    $('.comment-create-modal-contents').delay(500).animate({scrollTop: $('.comment-create-modal-contents')[0].scrollHeight}, 1000, 'swing');

    $('#comment-create').on("submit", function(e){
      e.preventDefault();
      var $commentCreatePanel = $('#comment-create-modal');
      var $overlay = $('#modal-overlay');
      var $form = $(this);
      $('.tweet-show-no-tweet').attr('style', "display: none;")
      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: {
          text: $("#comment-text").val()
        }
      }).done(function(response){
        $(".comment-text").val("");

        $("#tweet-show-comment-each-displayNone").clone().insertAfter(".tweet-show-comment-each:last-child").attr('id', 'tweet-show-comment-each')
        $("#least_comment_dispNone").clone().insertAfter(".least_comment:last-child").attr('id', 'least_comment')

        $("#tweet-show-comment-each .comment-nicknames").text(response.data["user_nickname"])
        $("#tweet-show-comment-each .tag").addClass("company_color_" + response.data["company_cd"])
        $("#tweet-show-comment-each .tag").text(response.data["company_cd"])
        $("#tweet-show-comment-each .text").text(response.data["text"])
        $("#tweet-show-comment-each .timestamp").text("1分以内")
        $("#tweet-show-comment-each .comment-edit-btn").attr('href', "/tweets/" + response.data["tweet_id"] + "/comments/" + response.data["comment_id"] + "/edit")
        $("#tweet-show-comment-each .comment-delete-btn").attr({
          'data-id1': response.data["tweet_id"],
          'data-id2': response.data["comment_id"]
        })
        $("#tweet-show-comment-each .reply-create-btn").attr({
          'data-commentid': response.data["comment_id"],
          'data-tweetid': response.data["tweet_id"],
          'data-commentlike': response.data["comment_likes_count"],
          'data-commentnickname': response.data["user_nickname"],
          'data-commenttext': response.data["text"]
        })
        $(".momentCreateBtn").on("click", function(){
          alert('投稿して間もない自分のコメントに「いいね！」はできません');
        })
        $("#least_comment .comment_text").text(response.data["text"])
        $("#least_comment .comment_user_nickname").text(response.data["user_nickname"])

        $("#tweet-show-comment-each").removeAttr('id').addClass('tweet-show-comment-each')
        $("#least_comment").removeAttr('id').addClass('least_comment')
        hideCommentCreateModal();
        anableSwipe();
        modals();

        $('html,body').delay(500).animate({scrollTop: $('.tweet-show-comment-each:last-child').offset().top}, 1000, 'swing');
      })
    });
  });

  //reply-create-modal
  $('.reply-create-btn').click(function(e){
    var $tweetId = $(this).data("tweetid");
    var $commentId = $(this).data("commentid");
    var $commentLikeCount = $(this).data("commentlike");
    var $commentNickname = $(this).data("commentnickname");
    var $commentText = $(this).data("commenttext");
    e.preventDefault();
    $replyCreatePanel.fadeIn();
    $overlay.fadeIn();
    setPosition();
    $.get({
      url: "/comments/" + $commentId + "/likes_counts"
    }).done(function(response){
      $("#reply-create-comment-like").text(Number(response.data["likesCount"]));
    })
    $(this).parent().addClass('flag');
    $("#reply-create-comment-nickname").text($commentNickname);
    $("#reply-create-comment-text").text($commentText);
    $("#reply-create").attr('action', "/tweets/" + $tweetId + "/comments/" + $commentId + "/replies");
  });

  //comment-edit-modal
  $('.comment-edit-btn').click(function(e){
    var $tweetId = $(this).data("tweetid");
    var $commentId = $(this).data("commentid");
    var $commentText = $(this).data("commenttext");
    var $commentEditText = $(this).closest(".list").find("p.text")
    e.preventDefault();
    $commentEditPanel.fadeIn();
    $overlay.fadeIn();
    setPosition();

    $("#comment-edit-text").text($commentEditText[0].innerText);
    $("#comment-edit").attr('action', "/tweets/" + $tweetId + "/comments/" + $commentId);
    $("#comment-edit").attr('method', "patch");

    $('#comment-edit').on("submit", function(e){
      e.preventDefault();
      var $commentEditPanel = $('#comment-edit-modal');
      var $overlay = $('#modal-overlay');
      var $form = $(this);
      function hideCommentEditModal() {
        $overlay.fadeOut();
        $commentEditPanel.fadeOut();
      }
      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: {
          text: $("#comment-edit-text").val()
        }
      }).done(function(response){
        $commentEditText.text(response.data["text"])
        hideCommentEditModal();
        anableSwipe();
        modals();
        swipeRiset()
        $("#checked-modal").delay(100).fadeIn('fast', 'swing')
        $("#checked-modal .check-words").text("コメントを編集しました")
        $("#checked-modal").delay(1100).fadeOut('slow', 'swing')
        // $('html,body').delay(500).animate({scrollTop: $('.tweet-show-comment-each:last-child').offset().top}, 1000, 'swing');
      })
    });
  });

  //reply-edit-modal
  $('.reply-edit-btn').click(function(e){
    var $tweetId = $(this).data("tweetid");
    var $commentId = $(this).data("commentid");
    var $replyId = $(this).data("replyid");
    var $replyEditText = $(this).closest(".list").find("p.text")
    e.preventDefault();
    $replyEditPanel.fadeIn();
    $overlay.fadeIn();
    setPosition();

    $("#reply-edit-text").text($replyEditText[0].innerText);
    $("#reply-edit").attr('action', "/tweets/" + $tweetId + "/comments/" + $commentId + "/replies/" + $replyId);
    $("#reply-edit").attr('method', "patch");

    $('#reply-edit').on("submit", function(e){
      e.preventDefault();
      var $replyEditPanel = $('#reply-edit-modal');
      var $overlay = $('#modal-overlay');
      var $form = $(this);
      function hideReplyEditModal() {
        $overlay.fadeOut();
        $replyEditPanel.fadeOut();
      }
      $.ajax({
        url: $form.attr('action'),
        type: $form.attr('method'),
        data: {
          text: $("#reply-edit-text").val()
        }
      }).done(function(response){
        $replyEditText.text(response.data["text"])
        hideReplyEditModal();
        anableSwipe();
        modals();
        swipeRiset()
        $("#checked-modal").delay(100).fadeIn('fast', 'swing')
        $("#checked-modal .check-words").text("返信を編集しました")
        $("#checked-modal").delay(1100).fadeOut('slow', 'swing')

        // $('html,body').delay(500).animate({scrollTop: $('.tweet-show-comment-each:last-child').offset().top}, 1000, 'swing');
      })
    });
  });


  //tweet-show option-modal
  $('.tweet_show_option_btn').click(function(e){
    var $tweetId = $(this).data("tweetid");
    e.preventDefault();
    $tweetShowOptionPanel.fadeIn();
    $overlay.fadeIn();
    setPosition();

    $("#tweet-show-tweetEdit").attr('data-tweetid', $tweetId)
    $("#tweet-show-tweetDelete").attr('data-tweetid', $tweetId)

    $("#tweet-show-tweetEdit").click(function(e){
      var $tweetId2 = $(this).data("tweetid");
      var $tweetShowEditTitle = $(this).data("tweettitle");
      var $tweetShowEditText = $(this).data("tweettext");
      e.preventDefault();
      $tweetShowOptionPanel.fadeOut();
      $tweetShowTweetEditPanel.fadeIn();
      setPosition();

      $("#tweetShow-tweet-edit-title").text($tweetShowEditTitle);
      $("#tweetShow-tweet-edit-text").text($tweetShowEditText);
      $("#tweetShow-tweet-edit-submit").attr('action', "/tweets/" + $tweetId);
      $("#tweetShow-tweet-edit-submit").attr('method', "patch");

      $('#tweetShow-tweet-edit-submit').on("click", function(e){
        e.preventDefault();
        var $form = $(this);
        $.ajax({
          url: $form.attr('action'),
          type: $form.attr('method'),
          data: {
            text: $("#tweetShow-tweet-edit-text").val(),
            title: $("#tweetShow-tweet-edit-title").val()
          },
          dataType: 'json'
        }).done(function(response){
          $("#tweetShow-tweet-edited-title").text(response.data["title"])
          $("#tweetShow-tweet-edited-text").text(response.data["text"])
          hideTweetShowTweetEditModal();
          modals();
          swipeRiset();
          $("#checked-modal").delay(100).fadeIn('fast', 'swing')
          $("#checked-modal .check-words").text("投稿を編集しました")
          $("#checked-modal").delay(1100).fadeOut('slow', 'swing')
        })
      });
    })
    $('#tweet-show-tweetDelete').click(function(e){
      var $tweetId3 = $(this).data("tweetid");
      $("#delete-modal").attr('href', "/tweets/" + $tweetId3);
      e.preventDefault();
      $tweetShowOptionPanel.fadeOut();
      $panel.fadeIn();
      setPosition();
      $(this).parent().addClass('flag');
    });
  })

  //user-info-update-modal
  $('.user_info_company').on("click", function(e){
    e.preventDefault();
    var $userId = $(this).data("userid");
    var $currentCompanyId = $(this).data("currentcompany");
    var $currentCompanyCd = $(this).data("currentcompanycd");
    var $changeableTimestamp = $(this).data("timestamp");
    var $form = $(this);
    e.preventDefault();
    $userCompanyEditPanel.fadeIn();
    $overlay.fadeIn();
    $('.company-submit').prop("disabled", true);
    $('input.company-submit[type="submit"]').attr("style", "background-color: #999")
    setPosition();

    $('[name=company-update-select]').change(function(){
      selected = $('[name=company-update-select] option:selected')
      $('#selected-confirmation').attr('style', "text-align: center; margin: 0 0 30px; color: rgb(255, 134, 134); font-size: 12px;")

      if ($currentCompanyId == $("#company-update-select").val()) {
        $('#selected-confirmation').html("現在登録されている事業会社が選択されています");
        $('#company-update-select').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
      }
      else{
        $('#selected-confirmation').html("※注意※<br />変更すると、本日より3ヶ月は再変更できません。<br />次回の変更は" + $changeableTimestamp + "以降になります。");
        $('#company-update-select').attr('style', "border-radius: 5px; border: 1px solid rgb(73, 162, 186)")
        $('.company-submit').prop("disabled", false);
        $('input.company-submit[type="submit"]').attr("style", "background-color: rgb(73, 162, 186)")
      }
    })

    $("#company-edit-submit-btn").on("click", function(e){
      e.preventDefault();

      var d = new Date();
      var year  = d.getFullYear();
      var month = ( d.getMonth() + 1   < 10 ) ? '0' + ( d.getMonth() + 1)  : d.getMonth() + 1;
      var day   = ( d.getDate()   < 10 ) ? '0' + d.getDate()   : d.getDate();
      var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
      var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
      var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
      var timestamp = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

      $.ajax({
        url: '/users/' + $userId,
        type: 'patch',
        data: {
          company_id: $("#company-update-select").val(),
          company_updated_at: timestamp
        },
        dataType: 'json'
      }).done(function(response){
        var currentCompanyColor = "company_color_" + $currentCompanyCd
        var newCompanyColor = "company_color_" + response.data["company_cd"]
        $("#updated-company").text(response.data["company_fullname"])
        $(".company-info-update").addClass("user-company-update-deactive")
        $("#company-updated-message").text("本日より3ヶ月間は変更できません")

        $("#updated-company").removeClass(currentCompanyColor);
        $("#updated-company").addClass(newCompanyColor);
        hideUserCompanyEditModal();
        modals();
        $("#checked-modal").delay(100).fadeIn('fast', 'swing')
        $("#checked-modal .check-words").text("会社を変更しました")
        $("#checked-modal").delay(1100).fadeOut('slow', 'swing')
      })
    })
  })

  $('.user_info_nickname').on("click", function(e){
    e.preventDefault();
    var $userId = $(this).data("userid");
    var $currentNickname = $(this).data("currentnickname");
    var $form = $(this);
    $userNicknameEditPanel.fadeIn();
    $overlay.fadeIn();

    $('#user-nickname-update-text').on("click", function(e){
      e.preventDefault();
      userInfoNicknameReset();
    })
    $('.nickname-submit').prop("disabled", true);
    $('input.nickname-submit[type="submit"]').attr("style", "background-color: #999")
    setPosition();

    $('#nickname-avail-check-btn').on("click", function(e){
      e.preventDefault();
      filled =  $('#user-nickname-update-text').val()
      if (filled) {
        if (filled.length < 4){
          $('#nickname-confirmation-meesage').attr('style', "color: rgb(255, 134, 134);")
          $('#user-nickname-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
          $('#nickname-confirmation-meesage').html("ニックネームは4文字以上にしてください")
        }
        else if (filled.length > 16) {
          $('#nickname-confirmation-meesage').attr('style', "color: rgb(255, 134, 134);")
          $('#user-nickname-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
          $('#nickname-confirmation-meesage').html("ニックネームは16文字以内にしてください")
        }
        else{
          $('#nickname-confirmation-meesage').attr('style', "color: #666;")
          $('#user-nickname-update-text').attr('style', "border-radius: 5px; border: 1px solid #666")
          $('#nickname-confirmation-meesage').text("ニックネームが使用可能か確認中です")
          $('#fa-validation').removeClass("fa fa-check-circle fa-exclamation-circle")
          $('.bar-animation').attr('style', "display: block;")
          $('.bar-animation').animate({
            width: "100%",
            opacity: 0.5
          }, 1400).fadeOut(100)
          $.ajax({
            url: '/check_user_nickname',
            type: 'get',
            data:{
              nickname: filled
            }
          }).done(function(response){
            if (response.data["flag"] == 1){
              setTimeout(function(){
                $('#nickname-confirmation-meesage').attr('style', "color: rgb(255, 134, 134);")
                $('#fa-validation').attr('style', "color: rgb(255, 134, 134);")
                $('#user-nickname-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
                $('#nickname-confirmation-meesage').html("このニックネームはすでに使われています")
                $('#fa-validation').addClass("fa fa-exclamation-circle")
              }, 1500)
            }
            else{
              setTimeout(function(){
                $('#nickname-confirmation-meesage').attr('style', "color: rgb(73, 162, 186);")
                $('#fa-validation').attr('style', "color: rgb(73, 162, 186);")
                $('#user-nickname-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(73, 162, 186)")
                $('#nickname-confirmation-meesage').html("使用可能なニックネームです")
                $('#fa-validation').addClass("fa fa-check-circle")
                $('.nickname-submit').prop("disabled", false);
                $('input.nickname-submit[type="submit"]').attr("style", "background-color: rgb(73, 162, 186)")
              }, 1500)
            }
          })
        }
      }
      else{
        $('#nickname-confirmation-meesage').attr('style', "color: rgb(255, 134, 134);")
        $('#user-nickname-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
        $('#nickname-confirmation-meesage').html("新しいニックネームを入れてください")
      }
    })

    $("#nickname-edit-submit-btn").on("click", function(e){
      e.preventDefault();

      $.ajax({
        url: '/users/' + $userId,
        type: 'patch',
        data: {
          nickname: $("#user-nickname-update-text").val()
        },
        dataType: 'json'
      }).done(function(response){
        $('#user-nickname-update-text').val("")
        $('#nickname-confirmation-meesage').text('自身を特定できるニックネームはお控えください')
        $('#nickname-confirmation-meesage').attr('style', "color: #666;")
        $('#fa-validation').removeClass("fa fa-check-circle fa-exclamation-circle")

        $('#updated-nickname').text(response.data["nickname"])
        hideUserNicknameEditModal();
        modals();

        $("#checked-modal").delay(100).fadeIn('fast', 'swing')
        $("#checked-modal .check-words").text("ニックネームを変更しました")
        $("#checked-modal").delay(1100).fadeOut('slow', 'swing')
      })
    })
  })

  $('.user_info_email').on("click", function(e){
    e.preventDefault();
    var $userId = $(this).data("userid");
    var $currentEmail = $(this).data("currentemail");
    var $form = $(this);
    $userEmailEditPanel.fadeIn();
    $overlay.fadeIn();
    function userInfoEmailReset(){
      $('#email-confirmation-meesage').text('社用メールアドレスのみご利用いただけます')
      $('#email-confirmation-meesage').attr('style', "color: #666;")
      $('#fa-validation').removeClass("fa fa-check-circle fa-exclamation-circle")
      $('.email-submit').prop("disabled", true);
      $('input.email-submit[type="submit"]').attr("style", "background-color: #999")
      $('#r-recruit').attr('style', "color: #666;")
      $('#waku-2').attr('style', "color: #666;")
    }
    $('#user-email-update-text').on("click", function(e){
      e.preventDefault();
      userInfoEmailReset();
    })
    $('.email-submit').prop("disabled", true);
    $('input.email-submit[type="submit"]').attr("style", "background-color: #999")
    setPosition();

    $('#email-avail-check-btn').on("click", function(e){
      e.preventDefault();
      filled = $('#user-email-update-text').val()
      if (filled) {
        if (filled.match(/(@r\.recruit\.co\.jp|@waku\-2\.co\.jp)/)) {
          $('#email-confirmation-meesage').attr('style', "color: #666;")
          $('#email-confirmation-meesage').text("ニックネームが使用可能か確認中です")
          $('#user-email-update-text').attr('style', "border-radius: 5px; border: 1px solid #666")
          $('#fa-validation').removeClass("fa fa-check-circle fa-exclamation-circle")
          $('.bar-animation').attr('style', "display: block;")
          $('.bar-animation').animate({
            width: "100%",
            opacity: 0.5
          }, 1400).fadeOut(100)
          $.ajax({
            url: '/check_user_email',
            type: 'get',
            data:{
              email: filled
            }
          }).done(function(response){
            if (response.data["flag"] == 1){
              setTimeout(function(){
                $('#email-confirmation-meesage').attr('style', "color: rgb(255, 134, 134);")
                $('#fa-validation').attr('style', "color: rgb(255, 134, 134);")
                $('#email-confirmation-meesage').html("このメールアドレスはすでに使われています")
                $('#user-email-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
                $('#fa-validation').addClass("fa fa-exclamation-circle")
              }, 1500)
            }
            else{
              setTimeout(function(){
                $('#email-confirmation-meesage').attr('style', "color: rgb(73, 162, 186);")
                $('#fa-validation').attr('style', "color: rgb(73, 162, 186);")
                $('#email-confirmation-meesage').html("使用可能なメールアドレスです")
                $('#user-email-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(73, 162, 186)")
                $('#fa-validation').addClass("fa fa-check-circle")
                if (filled.match(/@r\.recruit\.co\.jp/)){
                  $('#r-recruit').attr('style', "color: rgb(73, 162, 186);")
                }
                else if (filled.match(/@waku\-2\.co\.jp/)){
                  $('#waku-2').attr('style', "color: rgb(73, 162, 186);")
                }
                $('.email-submit').prop("disabled", false);
                $('input.email-submit[type="submit"]').attr("style", "background-color: rgb(73, 162, 186)")
              }, 1500)
            }
          })
        }
        else{
          $('#email-confirmation-meesage').attr('style', "color: rgb(255, 134, 134);")
          $('#email-confirmation-meesage').html("メールアドレスを確認してください")
          $('#user-email-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
        }
      }
      else{
        $('#email-confirmation-meesage').attr('style', "color: rgb(255, 134, 134);")
        $('#email-confirmation-meesage').html("新しいメールアドレスを入れてください")
        $('#user-email-update-text').attr('style', "border-radius: 5px; border: 1px solid rgb(255, 134, 134)")
      }
    })

    $("#email-edit-submit-btn").on("click", function(e){
      e.preventDefault();
      $userEmailEditPanel.fadeOut();
      $userEmailEditConfirmationPanel.fadeIn();
      setPosition();
      $(this).parent().addClass('flag');

      $('#logout-modal').on("click", function(e){
        $.ajax({
          url: '/users/' + $userId,
          type: 'patch',
          data: {
            email: $("#user-email-update-text").val()
          },
          dataType: 'json'
        }).done(function(response){
          $('#updated-email').text(response.data["email"])
          $userEmailEditConfirmationPanel.fadeOut();
          modals();

          $("#checked-modal").delay(100).fadeIn('fast', 'swing')
          $("#checked-modal .check-words").html("メールアドレスを変更しました。<br>3秒後にログアウトします。")
          $('#countdown').attr('style', "display: block;")

          var count = 3;
          function anim() {
              if (count > 0) {
                  $('.countdown-num').text(count);
                  count--;
                  setTimeout(anim, 1000);
              }
              else {
                $.ajax({
                  url: '/users/sign_out',
                  type: 'delete'
                }).done(function(response){
                  window.location.href = '/'
                })
              }
          }
          anim();
        })
      })
    })
  })

  //delete-modal
  $('.comment-delete-btn').click(function(e){
    var c_tweet_id = $(this).data("id1");
    var c_comment_id = $(this).data("id2");
    $("#delete-modal").attr('href', "/tweets/" + c_tweet_id + "/comments/" + c_comment_id);
    e.preventDefault();
    $panel.fadeIn();
    $overlay.fadeIn();
    setPosition();
    $(this).parent().addClass('flag');
  });
  $('.reply-delete-btn').click(function(e){
    var r_tweet_id = $(this).data("id1");
    var r_comment_id = $(this).data("id2");
    var r_reply_id = $(this).data("id3");
    $("#delete-modal").attr('href', "/tweets/" + r_tweet_id + "/comments/" + r_comment_id + "/replies/" + r_reply_id);
    e.preventDefault();
    $panel.fadeIn();
    $overlay.fadeIn();
    setPosition();
    $(this).parent().addClass('flag');
  });
  $('.tweet-delete-btn').click(function(e){
    var t_tweet_id = $(this).data("id");
    $("#delete-modal").attr('href', "/tweets/" + t_tweet_id);
    e.preventDefault();
    $panel.fadeIn();
    $overlay.fadeIn();
    setPosition();
    $(this).parent().addClass('flag');
  });
  $('.bookmark-delete-btn').click(function(e){
    var $userId = $(this).data("userid");
    var $tweetId = $(this).data("tweetid");
    var $bookmarkId = $(this).data("bookmarkid");

    e.preventDefault();
    $panel.fadeIn();
    $overlay.fadeIn();
    setPosition();
    $(this).parent().addClass('flag');

    $("#delete-modal").on("click", function(){
      $.ajax({
        url: "/users/" + $userId + "/bookmarks/" + $bookmarkId,
        type: "delete",
        data: {tweet_id: $tweetId, dataType: "json"}
      }).done(function(response){
        modals();
        hideModal();
        swipeRiset();
        $("#" + $bookmarkId + "-bm-id").attr("style", "display: none")
        $("#checked-modal").delay(100).fadeIn('fast', 'swing')
        $("#checked-modal .check-words").text("ブックマークから外しました")
        $("#checked-modal").delay(1100).fadeOut('slow', 'swing')
      })
    })
  });

  // violation_report_modal
  $('#tweet_report_btn').click(function(e){
    var $tweetId = $(this).data("tweetid");
    var $userId = $(this).data("userid");
    var $tweetUserNickname = $(this).data("tweetusername");
    var $tweetTitle = $(this).data("tweettitle");
    e.preventDefault();
    $tweetViolationReportPanel.fadeIn();
    $overlay.fadeIn();
    setPosition();
    $('.violation_report_submit').prop('disabled', true)
    $('.violation_report_submit').attr("style", "color: #666")

    $('#violation_reported_user_name').text($tweetUserNickname)
    $('#violation_reported_user_name').attr("style", "color: rgb(73, 162, 186)")
    $('#violation_reported_tweet_title').text($tweetTitle)
    $('.violation_report_tweet_post').attr("style", "overflow: hidden;")

    $('#violation_report_create').change(function(){
      selected = $('input[name=option]:checked').val()
      filled = $("textarea.violation_report_reason_textarea").val()
      if (selected){
        $('.violation_report_submit').prop('disabled', false)
        $('.violation_report_submit').attr("style", "color: rgb(73, 162, 186)")
      }
    })
    $('.violation_report_submit').on("click", function(){
      e.preventDefault();
      $.ajax({
        url: "/tweets/" + $tweetId + "/violation_reports",
        type: "post",
        data: {
          tweet_id: $tweetId,
          option: selected,
          text: filled
        }
      }).done(function(response){
        $.ajax({
          url: '/check_violation_count',
          type: 'get',
          data: {
            id: $tweetId
          }
        }).done(function(response){
          var flag = response.data['flag']
          if (flag == 1 || flag == 2){
            $tweetViolationReportPanel.fadeOut();
            $("#checked-modal").delay(100).fadeIn('fast', 'swing')
            if (flag == 1) {
              $("#checked-modal .check-words").html("この投稿は審査対象になりました。<br>3秒後にトップに戻ります。")
            }
            else{
              $("#checked-modal .check-words").html("この投稿は再審査の対象になりました。<br>3秒後にトップに戻ります。")
            }
            $('#countdown').attr("style", "display: block")
            var count = 3;
            function anim() {
                if (count > 0) {
                    $('.countdown-num').text(count);
                    count--;
                    setTimeout(anim, 1000);
                }
                else {
                  window.location.href = '/'
                }
            }
            anim();
          }
          else{
            $('#tweet_report_btn').attr('style', "color: rgb(255, 134, 134")
            $('#tweet_report_btn').prop('disabled', true)

            hideTweetViolationReportModal();
            modals();

            $("#checked-modal").delay(100).fadeIn('fast', 'swing')
            $("#checked-modal .check-words").text("通報されました")
            $("#checked-modal").delay(1100).fadeOut('slow', 'swing')
          }
        })
      })
    })
  })

  function userInfoNicknameReset(){
    $('.nickname-submit').prop("disabled", true);
    $('input.nickname-submit[type="submit"]').attr("style", "background-color: #999")
    $('#nickname-confirmation-meesage').text('自身を特定できるニックネームはお控えください')
    $('#nickname-confirmation-meesage').attr('style', "color: #666;")
    $('#user-nickname-update-text').val("")
    $('#fa-validation').removeClass("fa fa-check-circle fa-exclamation-circle")
    $('#user-nickname-update-text').attr('style', "border-radius: 0px; border: none; border-bottom: 1px solid #ddd")
  }
  function userInfoEmailReset(){
    $('#email-confirmation-meesage').text('社用メールアドレスのみご利用いただけます')
    $('#email-confirmation-meesage').attr('style', "color: #666;")
    $('#fa-validation').removeClass("fa fa-check-circle fa-exclamation-circle")
    $('.email-submit').prop("disabled", true);
    $('input.email-submit[type="submit"]').attr("style", "background-color: #999")
    $('#r-recruit').attr('style', "color: #666;")
    $('#waku-2').attr('style', "color: #666;")
    $('#user-email-update-text').val("")
    $('#user-email-update-text').attr('style', "border-radius: 0px; border: none; border-bottom: 1px solid #ddd")
  }


  //resize
  $(window).on('resize', function(){ setPosition();
  });
  function setPosition(){
  var panelHeight = $panel.height();
  var windowHeight = $(window).height();
  var adjustPosition = (windowHeight - panelHeight)/2;
  $panel.css("top", adjustPosition);
  }
  $overlay.click(function(){
    hideModal();
    hideCommentCreateModal();
    hideReplyCreateModal();
    hideCommentEditModal();
    hideReplyEditModal();
    hideTweetShowOptionModal();
    hideTweetShowTweetEditModal();
    hideUserCompanyEditModal()
    hideUserNicknameEditModal()
    hideUserEmailEditModal()
    hideTweetViolationReportModal();
    swipeRiset();
  });
  $('.modal-close').click(function(e){
    e.preventDefault();
    hideModal();
    swipeRiset();
  });
  $('.comment-create-close-btn').click(function(e){
    e.preventDefault();
    hideCommentCreateModal();
    swipeRiset();
  });
  $('.reply-create-close-btn').click(function(e){
    e.preventDefault();
    hideReplyCreateModal();
    swipeRiset();
  });
  $('.comment-edit-close-btn').click(function(e){
    e.preventDefault();
    hideCommentEditModal();
    swipeRiset();
  });
  $('.reply-edit-close-btn').click(function(e){
    e.preventDefault();
    hideReplyEditModal();
    swipeRiset();
  });
  $('.tweet-show-option-close-btn').click(function(e){
    e.preventDefault();
    hideTweetShowOptionModal();
    swipeRiset();
  });
  $('.tweetShow-tweet-edit-close-btn').click(function(e){
    e.preventDefault();
    hideTweetShowTweetEditModal();
    swipeRiset();
  });
  $('.user-edit-modal-close-btn').click(function(e){
    e.preventDefault();
    hideUserCompanyEditModal()
    hideUserNicknameEditModal()
    hideUserEmailEditModal()
  });
  $('.email-confirmation-modal-close').click(function(e){
    e.preventDefault();
    hideUserEmailEditConfirmatinoModal();
    userInfoEmailReset();
  });
  $('.violation-report-modal-close-btn').click(function(e){
    e.preventDefault();
    hideTweetViolationReportModal();

  });
  function hideModal() {
    $overlay.fadeOut();
    $panel.fadeOut();
  }
  function hideCommentCreateModal() {
    $overlay.fadeOut();
    $commentCreatePanel.fadeOut();
  }
  function hideReplyCreateModal() {
    $overlay.fadeOut();
    $replyCreatePanel.fadeOut();
  }
  function hideCommentEditModal() {
    $overlay.fadeOut();
    $commentEditPanel.fadeOut();
  }
  function hideReplyEditModal() {
    $overlay.fadeOut();
    $replyEditPanel.fadeOut();
  }
  function hideTweetShowOptionModal() {
    $overlay.fadeOut();
    $tweetShowOptionPanel.fadeOut();
  }
  function hideTweetShowTweetEditModal() {
    $overlay.fadeOut();
    $tweetShowTweetEditPanel.fadeOut();
  }
  function hideUserCompanyEditModal() {
    $overlay.fadeOut();
    $userCompanyEditPanel.fadeOut();
  }
  function hideUserNicknameEditModal() {
    $overlay.fadeOut();
    $userNicknameEditPanel.fadeOut();
    userInfoNicknameReset();
  }
  function hideUserEmailEditModal() {
    $overlay.fadeOut();
    $userEmailEditPanel.fadeOut();
    userInfoEmailReset();
  }
  function hideUserEmailEditConfirmatinoModal() {
    $overlay.fadeOut();
    $userEmailEditConfirmationPanel.fadeOut();
    userInfoEmailReset();
  }
  function hideTweetViolationReportModal() {
    $overlay.fadeOut();
    $tweetViolationReportPanel.fadeOut();

  }
}

function tweetOptions(){
  var $tweetBookmarkBox = $("#tweet_bookmark_btn");
  $("#tweet_bookmark_btn").on("click", function(){
    var $tweetId = $(this).data("tweetid");
    var $userId = $(this).data("userid");
    var $tweetBookmarkId = $(this).data("tweetbookmarkid");
    var button = $(this)

    if (button.hasClass("decrement")){
      $.ajax({
        url: "/users/" + $userId + "/bookmarks/" + $tweetBookmarkId,
        type: "delete",
        data: {user_id: $userId, tweet_id: $tweetId, dataType: "json"}
      }).done(function(response){
        button.removeClass("decrement").addClass("increment")
        $(".bookmark_icon").removeClass("fa-bookmark").addClass("fa-bookmark-o")
        $tweetBookmarkBox.attr("style", "color: #666; text-decoration: none;")
        $("#checked-modal").delay(300).fadeIn('fast', 'swing')
        $("#checked-modal .check-words").text("ブックマークから削除しました")
        $("#checked-modal").delay(1300).fadeOut('slow', 'swing')
      })
    }else{
      $.ajax({
        url: "/users/" + $userId + "/bookmarks",
        type: "post",
        data: {user_id: $userId, tweet_id: $tweetId, dataType: "json"}
      }).done(function(response){
        button.removeClass("increment").addClass("decrement")
        $(".bookmark_icon").removeClass("fa-bookmark-o").addClass("fa-bookmark")
        $tweetBookmarkBox.attr("style", "color: rgb(255, 134, 134); text-decoration: none;")
        $("#checked-modal").delay(300).fadeIn('fast', 'swing')
        $("#checked-modal .check-words").text("ブックマークに追加しました")
        $("#checked-modal").delay(1300).fadeOut('slow', 'swing')
      })
    }
  })
}

function textareaValidation(){

}

$(function () {
  anableSwipe();
  modals();
  tweetOptions();
  textareaValidation();
});
