var conditionActive;
var month = 1;

window.shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.getIdxForName = (fullName) => {
  return window.peopleVariants.get(fullName.split(" ")[0].toLowerCase());
}

let idxVars = window.shuffleArray([ 0, 1, 2, 3, 4, 5 ]);

window.people = [
  "masami",
  "florianne",
  "benjamin",
  "alois",
  "aricka",
  "kanya",
  "ralph",
  "paulinho",
  "william",
  "andrzej",
];

window.peopleVariants = new Map(window.people.map((person, idx) => [person, idxVars[idx % 6]]));

// posts the credibility list of window.people, for first month. Subsequent months are followed in the update month


const initialCredJSON = JSON.stringify(Object.fromEntries(window.peopleVariants));
var post_url = server_url + "/credlevel/";
var post_data = {
  month: month,
  initialCredJSON, 
}
fetch(post_url, {
  method: 'POST',
  body: JSON.stringify(post_data), 
  credentials: 'include',
  headers: {'Content-Type': 'application/json'}
}).then(res => res.json()).then(response => {
  console.log('POST response:', response);
  console.log('POST response.headers:', response.headers);
}).catch(err => {
  console.log('POST error:', err);
});


console.log(initialCredJSON);


$(document).ready(function () {  

/*
        for key in window.peopleVariants.keys()
          if key in message
            strreplace(button_key_text, window.peopleVariants.get(key))
*/

/*
  <button onClick=ShowMOdal(button_key_text)></button>

*/

  var contentHeight = $(".content-container").height();
  var portfoliosHeight = $("#portfolios").height();
  // var taggingHeight = $('.tagging').height();
  // var cardHeaderHeight = $('.card-header').height();
  // var cardBodyHeight = $('.card-body').height();

  $("#image-tagging-area").css("opacity", "0");
  $("#image-tagging-area").css("height", "0");
  $("#image-tagging-area").css("width", "0");
  // $('.tagging').css('height','0');
  // $('.card-header').css('height','0');
  // $('.card-body').css('height','0');

  // var portfolioWidth = $("#portfolios").width();
  // var chatbotWidth = $("#chatbot").width();

  $(function () {
    $("#imagetagging-button").click(function () {
      $("#investment-button").removeClass("active");
      $(this).addClass("active");

      //feed showing//
      $("#portfolio-title").html("Task");

      $("#portfolios").css("opacity", "0");
      $("#portfolios").css("height", "0");
      $("#portfolios").css("width", "0");

      $("#image-tagging-area").css("opacity", "100");
      $("#image-tagging-area").css("height", contentHeight);
      $("#image-tagging-area").css("width", "33%");
      // $('.tagging').css('height', taggingHeight);
      // $('.card-header').css('height', cardHeaderHeight);
      // $('.card-body').css('height', cardBodyHeight);

      // $('#image-tagging-area').css('display', 'inline-block');
      // $('.notification').css('display', 'inline-block');
    });

    $("#investment-button").click(function () {
      $("#imagetagging-button").removeClass("active");
      $(this).addClass("active");
      // $("#image-tagging-area").css('display', 'none');
      $("#image-tagging-area").css("opacity", "0");
      $("#image-tagging-area").css("height", "0");
      $("#image-tagging-area").css("width", "0");
      // $('.tagging').css('height','0');
      // $('.card-header').css('height','0');
      // $('.card-body').css('height','0');

      $(".notification").hide();

      $("#portfolio-title").html("Portfolios");
      $("#portfolios").css("opacity", "100");
      $("#portfolios").css("height", portfoliosHeight);
      $("#portfolios").css("width", "33%");
    });
  });

  $.ajax({
    type: "GET",
    url: server_url + "/getconditionactive/",
    success: function (response) {
      conditionActive = false;

      setTimeout(function () {
        $("#result_div").append(
          '<img id="typing-gif" src="' +
            staticUrl +
            'chatbot/images/typing.svg">',
        );
      }, 1200);

      setTimeout(function () {
        $("#result_div #typing-gif").remove();
        $("#result_div").append("<p id='bot-message'>Hi there!</p><br>");
      }, 2200);

      setTimeout(function () {
        $("#result_div").append(
          '<img id="typing-gif" src="' +
            staticUrl +
            'chatbot/images/typing.svg">',
        );
      }, 2700);

      setTimeout(function () {
        $("#result_div #typing-gif").remove();
        $("#result_div").append(
          '<p id=\'bot-message\'>You can tell me to follow or unfollow portfolios, add or withdraw amounts and ask me things like: "Should I invest 50 in ralph?", "Who should I unfollow?", "Invest another 100 on Aricka" or "withdraw from alois".</p><br>',
        );
      }, 7700);

      setTimeout(function () {
        $("#result_div").append(
          '<img id="typing-gif" src="' +
            staticUrl +
            'chatbot/images/typing.svg">',
        );
      }, 8200);

      setTimeout(function () {
        $("#result_div #typing-gif").remove();
        $("#result_div").append(
          "<p id='bot-message'>Remember, you can switch to Image Tagging by clicking the \"Task\" button in the top right corner.</p><br>",
        );
      }, 11200);

      if (conditionActive) {
        setTimeout(function () {
          $('<div class="row suggestion-row"></div>').appendTo("#result_div");
          $('<p class="sugg-options">Give me some advice</p>').appendTo(
            ".suggestion-row",
          );
          $('<p class="sugg-options">Who should I follow?</p>').appendTo(
            ".suggestion-row",
          );

          suggestionRowHeight = $(".suggestion-row").height();
          resultDivHeight = $(window).height() - (215 + suggestionRowHeight);

          $("#result_div").css("height", resultDivHeight);
          $("#result_div").scrollTop($("#result_div")[0].scrollHeight);
        }, 4500);
      }
    },
  });

  $("#parentheses").hide();

  $("#month-number").html(month);

  var isPaused = false;

  var _seconds_left = 240;

  var newspostTimeout;

  var update_timer = function () {
    if (!isPaused) {
      var seconds, minutes, html;
      _seconds_left -= 1;
      if (_seconds_left < 1) {
        _seconds_left = 240;

        old_invested_amount = parseFloat($("#invested-balance-amount").text());

        isPaused = true;
        clearTimeout(newspostTimeout);

        $(".notification").hide();

        $("#myModal").modal({
          backdrop: "static",
          keyboard: false,
        });

        $.ajax({
          type: "GET",
          url: server_url + "/updateportfolios/",
          success: function (response) {
            console.log(response);

            if (!$("#loading-gif").length) {
              $(".scrollable-newsposts").append(
                '<img id="loading-gif" src="' +
                  staticUrl +
                  'chatbot/images/loading.gif">',
              );
            }

            $("#portfolios").load(
              location.href + " #portfolios>*",
              "",
              function () {
                if ($("#followed-portfolio-wrapper").length) {
                  $("#empty-followed-tag").hide();
                } else {
                  $("#empty-followed-tag").show();
                }

                if ($("#not-followed-portfolio-wrapper").length) {
                  $("#empty-not-followed-tag").hide();
                } else {
                  $("#empty-not-followed-tag").show();
                }
              },
            );

            $("#invested-balance-amount").html(
              (
                Math.round(response.invested_balance_amount * 100) / 100
              ).toFixed(2),
            );

            new_invested_amount = parseFloat(
              $("#invested-balance-amount").text(),
            );
            new_invested_amount = parseFloat(
              Math.round(new_invested_amount * 100) / 100,
            ).toFixed(2);

            span = $("#invested-balance-change");

            string = "";

            invested_balance_change = 0;

            if (old_invested_amount == 0) {
              string = "+0.00%";
              span.removeClass("positive-change");
              span.removeClass("negative-change");
              span.addClass("no-change");
            } else {
              invested_balance_change =
                (100 * (new_invested_amount - old_invested_amount)) /
                old_invested_amount;
              invested_balance_change = parseFloat(
                Math.round(invested_balance_change * 100) / 100,
              ).toFixed(2);

              console.log(
                "invested balance change = " + invested_balance_change,
              );

              if (invested_balance_change > 0) {
                string = "+" + invested_balance_change + "%";
                span.removeClass("negative-change");
                span.removeClass("no-change");
                span.addClass("positive-change");
              } else if (invested_balance_change == 0) {
                string = "+0.00%";
                span.removeClass("positive-change");
                span.removeClass("negative-change");
                span.addClass("no-change");
              } else {
                string = invested_balance_change + "%";
                span.removeClass("positive-change");
                span.removeClass("no-change");
                span.addClass("negative-change");
              }
            }

            available_balance = parseFloat(
              $("#available-balance-amount").text(),
            );
            profit =
              parseFloat(
                parseFloat(available_balance) + parseFloat(new_invested_amount),
              ) -
              parseFloat(
                parseFloat(
                  parseFloat(available_balance) +
                    parseFloat(old_invested_amount),
                ),
              );

            $.ajax({
              type: "POST",
              url: server_url + "/updateresults/",
              data: {
                month: month,
                invested_change: profit,
                profit: parseFloat(profit),
                total:
                  parseFloat(available_balance) +
                  parseFloat(new_invested_amount),
              },
              success: function () {
                $.ajax({
                  type: "GET",
                  url: server_url + "/updatemonth/",
                  success: function (response) {
                    console.log(response);

                    ignoredBotMessage = false;

                    if (response["has_increased"]) {
                      month++;

                      const newIdxVars = window.shuffleArray([ 0, 1, 2, 3, 4, 5 ]);
                      window.peopleVariants = new Map(window.people.map((person, idx) => [person, newIdxVars[idx % 6]]));

                        const monthlyCredJSON = JSON.stringify(Object.fromEntries(window.peopleVariants));
                        console.log(monthlyCredJSON);

                        var post_url = server_url + "/credlevel/";
                        var post_data1 = {
                          month: month,
                          monthlyCredJSON, 
                        }
                        fetch(post_url, {
                          method: 'POST',
                          body: JSON.stringify(post_data1), 
                          credentials: 'include',
                          headers: {'Content-Type': 'application/json'}
                        }).then(res => res.json()).then(response => {
                          console.log('POST response:', response);
                          console.log('POST response.headers:', response.headers);
                      }).catch(err => {
                          console.log('POST error:', err);
                      });
                      


                      $("#month-number").html(month);
                      $("#result_div").append(
                        '<row><p id="month-chat">Month: ' +
                          month +
                          "/5</p></row>",
                      );
                      $("#result_div").scrollTop(
                        $("#result_div")[0].scrollHeight,
                      );
                    } else {
                      window.location.href = server_url + "/results";
                    }
                  },
                });
              },
              error: function () {},
            });

            span.text(string);
            $("#parentheses").show();
          },
        });

        $(".scrollable-newsposts").empty();
        newspostCounter = 0;

        $("#ok-button")
          .unbind()
          .on("click", function () {
            isPaused = false;

            setNewspostTimer();
          });
      }
      minutes = Math.floor(_seconds_left / 60);
      minutes = minutes.toLocaleString("en", { minimumIntegerDigits: 2 });
      seconds = _seconds_left % 60;
      seconds = seconds.toLocaleString("en", { minimumIntegerDigits: 2 });
      text = minutes + ":" + seconds;
      $("#timer").text(text);
    } else {
      console.log("IS PAUSED");
    }
  };

  window.setInterval(update_timer, 1000);
  update_timer();

  $(".scrollable-newsposts").append(
    '<img id="loading-gif" src="' + staticUrl + 'chatbot/images/loading.gif">',
  );

  // newsposts = shuffle(JSON.parse(newsposts_list.replace(/&quot;/g, '"')));
  profiles = window.shuffleArray(JSON.parse(profiles_list.replace(/&quot;/g, '"')));

  newspostCounter = 0;

  window.showModal = (item, clickType) => {
    //$.ajax({
    //  type: "POST",
    //  body: {userId, clickType:'newsfeed'},
    //  url: server_url + '/newclick',
    //  success: () => {console.log("register a new click")}
    //})

    // send new click here – show how many times clicked on button
    // const userId = TO DO
    // need to make AJAX post request to server_url + '/newclick', body should be { userId, clickType:'bot' }
    // in python, make new django end-point 'newclick' which takes in post request of userId and clickType and updates db.sql to be +1 click and source type
    // for DB, create new table which has userId, clickType and Count done
    // how to access django ORM – userId, Clicktype and Count will have (default=0) done
    // set count to count+1.

    // i need to build a function above where its function(xxx+1 to count)
    //var buttonclick = 0;

    let endpoint;
    if (clickType == "news") {
      endpoint = "/newsfeedbuttonclick/";
    } else if (clickType == "bot") {
      endpoint = "/botbuttonclick/";
    } else {
      endpoint = "bad-endpoint";
      console.error(
        "IDK HOW WE GOT HERE, YOU PASSED IN SOMETHING BAD TO SHOWMODAL()",
      );
    }

    $.ajax({
      type: "POST",
      url: server_url + endpoint,
      //data: buttonclick++,
      success: () => {
        console.log(`register a new click of type ${clickType}`);
      },
      error: () => {
        console.log("ERROR registering click");
      },
    });

    document.getElementById(`CredModal-${item}`).style.display = "block";
  };

  window.hideModal = (item) => {
    document.getElementById(`CredModal-${item}`).style.display = "none";
  };

  function updateNewsposts() {
    if (newspostCounter < 10) {
      if (newspostCounter > 8) {
        clearTimeout(newspostTimeout);
      }

      $("#loading-gif").remove();

      // newspost = newsposts[newspostCounter];
      profile = profiles[newspostCounter];
      name = profile.fields.name;

      $.ajax({
        type: "GET",
        url: server_url + "/getnextchanges/",
        success: function (response) {
          // chatbot_change = (Math.round(response[profile.fields.name + '-chatbot-change'] * 100) / 100).toFixed(2)
          newspost_change = response[name + "-newspost-change"];
          text = "";
          // newspost text based on change value and accuracy
          if (newspost_change >= 1) {
            text =
              name +
              "'s portfolio to increase by " +
              Math.abs(Math.round(newspost_change)) +
              "%.";
          } else if (newspost_change <= -1) {
            text =
              name +
              "'s portfolio to decrease by " +
              Math.abs(Math.round(newspost_change)) +
              "%.";
          } else {
            text = name + "'s portfolio to stay the same.";
          }
          
          const btn = `<button class= cred-button onClick="showModal(${window.getIdxForName(name)}, 'news')">verified<i class='fa-regular fa-question-circle' style='font-size:13px;color:#7393b3;padding:4px'></i></button>`;

          var div =
            '<div class="wrapper-newspost"> \
              <div class="container-newspost"> \
                <div class="img-container-newspost"> \
                  <img class="card-img" src= "' +
            staticUrl +
            "chatbot/images/profiles/" +
            name.replace(" ", "-") +
            '.jpg" alt="' +
            name +
            ' image"> \
                </div> \
                <div class="content-newspost"> \
                  <p id="text-newspost"><strong>' +
            text +
            "</strong></p>" +
            btn +
            " \
                </div> \
              </div> \
            </div>";

          $(".scrollable-newsposts").append(div);

          if (newspostCounter < 9) {
            $(".scrollable-newsposts").append(
              '<img id="loading-gif" src="' +
                staticUrl +
                'chatbot/images/loading.gif">',
            );
          }

          $(".scrollable-newsposts").scrollTop(
            $(".scrollable-newsposts")[0].scrollHeight,
          );

          newspostCounter++;

          if (newspostCounter < 10) {
            setNewspostTimer();
          }
        },
      });
    }
  }

  function setNewspostTimer() {
    var min = 16;
    var max = 26;

    var rand = Math.floor(Math.random() * (max - min + 1) + min);

    clearTimeout(newspostTimeout);
    newspostTimeout = setTimeout(updateNewsposts, rand * 1000);

    console.log("NEXT NEWSPOST TIMEOUT SET AS " + rand);
  }

  var mybot =
    '<div class="chatCont" id="chatCont">' +
    '<div id="result_div" class="resultDiv"></div>' +
    '<div class="chatForm input-group" id="chat-div">' +
    '<input type="text" class="col-10 form-control input-sm" id="chat-input" autocomplete="off" placeholder="Type something..."' +
    'class="form-control bot-txt"/>' +
    '<button id="send-button" class="col-2 btn btn-dark btn-sm">Send</button>' +
    "</div>" +
    "</div>";

  $("mybot").html(mybot);

  setNewspostTimer();
  console.log("timout SET!");

  if ($("#followed-portfolio-wrapper").length) {
    $("#empty-followed-tag").hide();
  } else {
    $("#empty-followed-tag").show();
  }

  if ($("#not-followed-portfolio-wrapper").length) {
    $("#empty-not-followed-tag").hide();
  } else {
    $("#empty-not-followed-tag").show();
  }
});

function gauss(stdev) {
  var r = 0;
  for (var i = 10; i > 0; i--) {
    r += Math.random();
  }

  var value = (r / 10) * stdev;

  if (value <= -100) {
    value = -99;
  } else if (value >= 100) {
    value = 99;
  }

  return value;
}
