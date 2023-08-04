$(function () {

  $('button#startButton').click(function () {
    $('button#startButton').hide();
    $('#button-div').append('<img id="typing-gif" src="' + staticUrl + 'chatbot/images/loading.gif" style="height:30px;">');

    searchParams = new URLSearchParams(window.location.search);
    username = searchParams.get('PROLIFIC_PID');
    console.log('username:', username);
    $.ajax({
      type: "POST",
      url: server_url + '/participants/',
      data: {'username': username},
      success: function () {
        console.log('username:', username);
        // window.location.href = server_url + "/chatbot";
        window.location.href = server_url + "/information";
      },
      error: function (data, msg, reason) {
        console.log('error arguments', data.responseJSON);
        if (data.responseJSON.username.length > 0) {
          if (data.responseJSON.username[0].code === 'duplicate') {
            var message = `It looks like you already took part in this study once. Unfortunately, you can only take part in the study once.`;
            bootbox.alert(message);
          }
        }
      }
    });
  });

  $('input#consentCheck').click(function () {
    $('button#startButton').prop('disabled', function(i, v) { return !v; });
  });

  $('input#consentCheck').click(function () {
      $('button#continueButton').prop('disabled', function(i, v) { return !v; });
  });

  $('button#continueButton').click(function () {
      // window.location.href = server_url + "/chatbot/";
      window.location.href = server_url + "/questionnaire1/";
  });

  $('.carousel').carousel({
    wrap: false,
    interval: false
  }).on('slid.bs.carousel', function () {
      curSlide = $('.active');
    if (curSlide.is( ':last-child' )) {
       $('.carousel-control-next').hide();
       return;
    } else {
       $('.carousel-control-next').show();
    }
    if (curSlide.is( ':first-child' )) {
        $('.carousel-control-prev').hide();
        return;
     } else {
        $('.carousel-control-prev').show();
     }
   });

   $('button#startStudyButton').click(function() {
     window.location.href = server_url + "/investment/";
   })

});
