'use strict';

function initBot() {
  console.log("First ajax!")
  $.ajax({
    type: "GET",
    url: 'https://www.lutionbot.com/api/company/tan%20intensa',
    success: function(data) {
      console.log('Respuesta: ', data);
      initCompany(data);
      $(".chat-window").removeClass("dont-show");
      $(".chat-box").append('<br><span class="chat-line">'+companyFirstGreeting()+'</span>');
    },
    error: function(err) {

      console.log('ERROR EN FIRST AJAX 1234', err);

    }
  });
}

function chooseSearchType() {
  var val = $(".chat-input").val();
  $(".chat-box").append('<br><span class="chat-line">'+val+'</span>');
  $(".chat-input").val("");
  var flow = initSearchFlow(val);
  $(".chat-box").append('<br><span class="chat-line">'+flow.msg+'</span>');
  if (flow.searchType != "query") {
    $(".chat-send-button").attr("onclick",flow.searchType+"Search()");
  }
}
